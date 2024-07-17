import { ElementCssVars } from '@/typings/common'
export interface DesignCssVarProps {
  headerHeight: number
  menuWidth: number
}
export interface IUseDesignStyle {
  style: DesignCssVarProps
}
function createDesignssVarsByCssVarsProps(props: DesignCssVarProps) {
  const cssVars: ElementCssVars = {
    '--hl-design-header-height': `${props.headerHeight}px`,
    '--hl-design-menu-width': `${props.menuWidth}px`,
  }
  return cssVars
}
export const useDesginStyle = (props?: IUseDesignStyle) => {
  const opt = Object.assign(
    {
      headerHeight: 60,
      menuWidth: 60,
    },
    props?.style,
  )
  const designStyle = createDesignssVarsByCssVarsProps(opt)
  return { designStyle }
}
