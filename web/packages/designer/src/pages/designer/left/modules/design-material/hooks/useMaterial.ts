import { ref } from 'vue'
import { materialList } from '@/material'
import { MaterialPackageEnum, MaterialPackageNameEnum } from '@/enums'
import { MaterialItem } from '@/typings/design'
import { groupByConfig, groupByPackageAndCategory } from '@hl/utils'
import { useDesigner } from '@hl/core'

const designerState = useDesigner()
type IKey = `${MaterialPackageEnum}`

type MaterialPackageObj = {
  [key in IKey]: {
    label: string
    icon?: string
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
  // const materialPackage: MaterialPackageType[] = []
  const materialMetaMap = designerState.materialMetaMap
  const materials = designerState.materials
  const flatList = materialMetaMap.values()
  const materialPackage = groupByPackageAndCategory<MaterialItem>(flatList, {
    parent: 'package',
    pTitle: 'packageTitle',
    children: 'category',
    cTitle: 'categoryTitle',
    icon: 'icon',
    cIcon: 'image'
  })

  // handleMaterialList()
  const selectMaterialPackage = ref(materialPackage[0])

  const selectMaterialPackageKey = ref<string>(materialPackage?.[0]?.['key'])
  // 点击 item
  const materialPackageItemHandle = (pk: MaterialPackageType) => {
    selectMaterialPackage.value=pk
    selectMaterialPackageKey.value = pk.key
  }
  return { materialPackage, selectMaterialPackageKey, materialPackageItemHandle, selectMaterialPackage }
}
