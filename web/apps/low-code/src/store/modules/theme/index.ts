import { computed, effectScope, onScopeDispose, ref, toRefs, watch } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import { useEventListener, usePreferredColorScheme } from '@vueuse/core'
import { getPaletteColorByNumber } from '@hl/color'
import { SetupStoreId } from '@/enums'
import { localStg } from '@/utils/storage'
import {
  addThemeVarsToHtml,
  createThemeToken,
  getNaiveTheme,
  initThemeSettings,
  toggleCssDarkMode,
  toggleGrayscaleMode,
} from './shared'

export const useThemeStore = defineStore(SetupStoreId.Theme, () => {
  const scope = effectScope()
  const osTheme = usePreferredColorScheme()

  const settings: Ref<App.Theme.ThemeSetting> = ref(initThemeSettings())

  const darkMode = computed(() => {
    if (settings.value.themeScheme === 'auto') {
      return osTheme.value === 'dark'
    }
    return settings.value.themeScheme === 'dark'
  })

  const grayscaleMode = computed(() => settings.value.grayscale)

  const themeColors = computed(() => {
    const { themeColor, otherColor, isInfoFollowPrimary } = settings.value
    const colors: App.Theme.ThemeColor = {
      primary: themeColor,
      ...otherColor,
      info: isInfoFollowPrimary ? themeColor : otherColor.info,
    }
    return colors
  })

  /** Naive theme */
  const naiveTheme = computed(() => getNaiveTheme(themeColors.value, settings.value.recommendColor))

  /**
   * Settings json
   *
   * It is for copy settings
   */
  const settingsJson = computed(() => JSON.stringify(settings.value))

  /** Reset store */
  function resetStore() {
    const themeStore = useThemeStore()

    themeStore.$reset()
  }

  /**
   * Set theme scheme
   *
   * @param themeScheme
   */
  function setThemeScheme(themeScheme: UnionKey.ThemeScheme) {
    settings.value.themeScheme = themeScheme
  }

  /**
   * Set grayscale value
   *
   * @param isGrayscale
   */
  function setGrayscale(isGrayscale: boolean) {
    settings.value.grayscale = isGrayscale
  }

  /** Toggle theme scheme */
  function toggleThemeScheme() {
    const themeSchemes: UnionKey.ThemeScheme[] = ['light', 'dark', 'auto']

    const index = themeSchemes.findIndex((item) => item === settings.value.themeScheme)

    const nextIndex = index === themeSchemes.length - 1 ? 0 : index + 1

    const nextThemeScheme = themeSchemes[nextIndex]

    setThemeScheme(nextThemeScheme)
  }

  /**
   * Update theme colors
   *
   * @param key Theme color key
   * @param color Theme color
   */
  function updateThemeColors(key: App.Theme.ThemeColorKey, color: string) {
    let colorValue = color

    if (settings.value.recommendColor) {
      colorValue = getPaletteColorByNumber(color, 500, true)
    }

    if (key === 'primary') {
      settings.value.themeColor = colorValue
    } else {
      settings.value.otherColor[key] = colorValue
    }
  }

  /**
   * Set theme layout
   *
   * @param mode Theme layout mode
   */
  function setThemeLayout(mode: UnionKey.ThemeLayoutMode) {
    settings.value.layout.mode = mode
  }

  /** Setup theme vars to html */
  function setupThemeVarsToHtml() {
    const { themeTokens, darkThemeTokens } = createThemeToken(themeColors.value, settings.value.recommendColor)
    addThemeVarsToHtml(themeTokens, darkThemeTokens)
  }

  /** Cache theme settings */
  function cacheThemeSettings() {
    const isProd = import.meta.env.PROD

    if (!isProd) return

    localStg.set('themeSettings', settings.value)
  }

  // cache theme settings when page is closed or refreshed
  useEventListener(window, 'beforeunload', () => {
    cacheThemeSettings()
  })

  // watch store
  scope.run(() => {
    // watch dark mode
    watch(
      darkMode,
      (val) => {
        toggleCssDarkMode(val)
      },
      { immediate: true },
    )

    watch(
      grayscaleMode,
      (val) => {
        toggleGrayscaleMode(val)
      },
      { immediate: true },
    )

    // themeColors change, update css vars and storage theme color
    watch(
      themeColors,
      (val) => {
        setupThemeVarsToHtml()
        localStg.set('themeColor', val.primary)
      },
      { immediate: true },
    )
  })

  /** On scope dispose */
  onScopeDispose(() => {
    scope.stop()
  })

  return {
    ...toRefs(settings.value),
    darkMode,
    themeColors,
    naiveTheme,
    settingsJson,
    setGrayscale,
    resetStore,
    setThemeScheme,
    toggleThemeScheme,
    updateThemeColors,
    setThemeLayout,
  }
})
