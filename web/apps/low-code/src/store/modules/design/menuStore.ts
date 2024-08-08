import { computed, ref, shallowRef } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { defineStore } from 'pinia'
import { IMenuItem } from './type'
import { loadingFinish } from '@/utils/common'
import { menuList } from '@/constants'
import { sortBy } from 'lodash-es'

export const useDesignMenuStore = defineStore({
  id: 'useDesignMenuStore',
  state: (): { selectedMenus: IMenuItem[] } => ({
    selectedMenus: [menuList[0]]
  }),
  getters: {
    getSelectedMenus(): IMenuItem[] {
      return this.selectedMenus
    }
  },
  actions: {
    setSelectedMenus(menus: IMenuItem[]) {
      this.selectedMenus = sortBy(menus, 'order').reverse()
    }
  }
})
