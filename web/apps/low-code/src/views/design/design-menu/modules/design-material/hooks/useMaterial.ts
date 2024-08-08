import { materialList } from '@/material'
import { MaterialPackageEnum, MaterialPackageNameEnum } from '@/enums'
import { MaterialItem } from '@/typings/design'
import { groupByConfig } from '@hl/utils'

type IKey = `${MaterialPackageEnum}`

type MaterialPackageObj = {
  [key in IKey]: {
    label: string
    icon?: string
  }
}
const materialListObj: MaterialPackageObj = {
  [MaterialPackageEnum.CHARTS]: {
    icon: 'mdi:chart-line',
    label: MaterialPackageNameEnum.CHARTS
  },
  [MaterialPackageEnum.INFORMATIONS]: {
    icon: 'mdi:information-outline',
    label: MaterialPackageNameEnum.INFORMATIONS
  },
  [MaterialPackageEnum.TABLES]: {
    icon: 'mdi:table',
    label: MaterialPackageNameEnum.TABLES
  },
  [MaterialPackageEnum.DECORATES]: {
    icon: 'uiw:component',
    label: MaterialPackageNameEnum.DECORATES
  },
  [MaterialPackageEnum.PHOTOS]: {
    icon: 'mdi:image-outline',
    label: MaterialPackageNameEnum.PHOTOS
  },
  [MaterialPackageEnum.ICONS]: {
    icon: 'mdi:emoticon-outline',
    label: MaterialPackageNameEnum.ICONS
  }
}
export interface MaterialCategoryItem {
  key: string
  label: string
  list: MaterialItem[]
}
export interface MaterialPackageType {
  key: string
  icon?: string
  label: string
  category: MaterialCategoryItem[]
}

export const useMaterial = () => {
  const materialPackage: MaterialPackageType[] = []

  const handleMaterialList = () => {
    for (const val in materialList) {
      const flatList = materialList[val as IKey]
      const category = groupByConfig<MaterialItem>(flatList as MaterialItem[], {
        key: 'category',
        label: 'categoryName'
      })
      materialPackage.push({
        key: val,
        icon: materialListObj[val as IKey].icon,
        label: materialListObj[val as IKey].label,
        category: category
      } as MaterialPackageType)
    }
  }
  handleMaterialList()
  const selectMaterialPackage = ref(materialPackage[0])

  const selectMaterialPackageKey = ref<string>(materialPackage[0]['key'])
  // 点击 item
  const materialPackageItemHandle = (pk: MaterialPackageType) => {
    selectMaterialPackage.value = pk
  }
  return { materialPackage, selectMaterialPackageKey, materialPackageItemHandle, selectMaterialPackage }
}
