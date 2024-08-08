export interface DesignerCssVarProps {
  headerHeight: number
  menuWidth: number
  materialPkWidth: number
  configWidth: number
}
export interface IUseDesignStyle {
  style: DesignerCssVarProps
}
export type ElementCssVars = {
  [K: string]: string | number
}

function createDesignerVarsByCssVarsProps(props: DesignerCssVarProps) {
  const cssVars: ElementCssVars = {
    '--designer-header-height': `${props.headerHeight}px`,
    '--designer-menu-width': `${props.menuWidth}px`,
    '--designer-material-pk-width': `${props.materialPkWidth}px`,
    '--designer-config-width': `${props.configWidth}px`
  }
  return cssVars
}
export const useDesginStyle = (props?: IUseDesignStyle) => {
  const opt = Object.assign(
    {
      headerHeight: 60,
      menuWidth: 65,
      materialPkWidth: 40,
      configWidth: 320
    },
    props?.style
  )
  const designStyle = createDesignerVarsByCssVarsProps(opt)
  return { designStyle }
}
