import { packagesList } from '@/material'
import { PackagesCategoryEnum, PackagesCategoryNameEnum } from '@/enums'
import { ConfigType } from '@/typings/design'

console.log('packagesList', packagesList)
const packagesListObj = {
  [PackagesCategoryEnum.CHARTS]: {
    // icon: renderIcon(RoadmapIcon),
    label: PackagesCategoryNameEnum.CHARTS,
  },
  [PackagesCategoryEnum.INFORMATIONS]: {
    // icon: renderIcon(SpellCheckIcon),
    label: PackagesCategoryNameEnum.INFORMATIONS,
  },
  [PackagesCategoryEnum.TABLES]: {
    // icon: renderIcon(TableSplitIcon),
    label: PackagesCategoryNameEnum.TABLES,
  },
  [PackagesCategoryEnum.DECORATES]: {
    // icon: renderIcon(GraphicalDataFlowIcon),
    label: PackagesCategoryNameEnum.DECORATES,
  },
  [PackagesCategoryEnum.PHOTOS]: {
    // icon: renderIcon(ImageIcon),
    label: PackagesCategoryNameEnum.PHOTOS,
  },
  [PackagesCategoryEnum.ICONS]: {
    // icon: renderIcon(AirPlaneOutlineIcon),
    label: PackagesCategoryNameEnum.ICONS,
  },
}
export interface MenuOptionsType {
  key: string
  //   icon: ReturnType<typeof renderIcon>
  //   label: ReturnType<typeof renderLang>
  list: ConfigType[]
}
export const useComponents = () => {
  const menuOptions: MenuOptionsType[] = []

  // 处理列表
  const handlePackagesList = () => {
    for (const val in packagesList) {
      menuOptions.push({
        key: val,
        // @ts-ignore
        icon: packagesListObj[val].icon,
        // @ts-ignore
        label: packagesListObj[val].label,
        // @ts-ignore
        list: packagesList[val],
      })
    }
  }
  handlePackagesList()
  const selectOptions = ref(menuOptions[0])

  let beforeSelect: string = menuOptions[0]['key']

  const selectValue = ref<string>(menuOptions[0]['key'])
  // 点击 item
  const clickItemHandle = (key: string, item: any) => {
    beforeSelect = key
  }
  return { menuOptions, selectValue, clickItemHandle, selectOptions }
}
