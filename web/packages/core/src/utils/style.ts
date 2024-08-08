export const backgroundToCss = (value: any) => {
    if ('angle' in value) {
      return {
        backgroundImage: `linear-gradient(${value.angle}deg, ${value.color1}, ${value.color2})`
      }
    } else if ('backgroundImage' in value && value['backgroundImage'] && !value['backgroundImage'].startsWith('url')) {
      value['backgroundImage'] = `url(${value['backgroundImage']})`
    }
    return value
  }
  export const stylePropToCss = (key: string, value: any): Record<string, any> => {
    switch (key) {
      case 'gwidth':
      case 'gheight':
      case 'gtop':
      case 'gleft':
        return { [key.slice(1)]: `${value}%` }
      case 'width':
      case 'height':
      case 'top':
      case 'left':
      case 'bottom':
      case 'right':
        return { [key]: `${value}px` }
      case 'fontSize':
      case 'borderWidth':
      case 'letterSpacing':
      case 'borderRadius':
        return { [key]: `${value}px` }
      case 'rotate':
      case 'scaleX':
      case 'scaleY':
        return { transform: `${key}(${value}deg)` }
  
      case 'grotate':
        return { transform: `${key.slice(1)}(${value}deg)` }
  
      case 'scale':
        return { transform: `${key}(${(value[0], value[1])}deg)` }
      case 'image':
        return { backgroundImage: value ? `url(${value})` : null }
      case 'linearGradient':
        return value.color1 && value.color2 && isNumber(value.angle)
          ? {
              backgroundImage: `linear-gradient(${value.angle}deg, ${value.color1}, ${value.color2})`
            }
          : {}
      case 'background': {
        return backgroundToCss(value)
      }
      default:
        return { [key]: value }
    }
  }
  /**
   * 保留指定样式，并转化为css
   * @param style 原始样式
   * @param filters 过滤条件
   * @returns css
   */
  export function filterStyle(style: Record<string, any>, filters: Array<string> = []) {
    let result: Record<string, any> = {}
    Object.keys(style).forEach(key => {
      if (filters.includes(key)) {
        const css = stylePropToCss(key, style[key])
        result = { ...result, ...css }
      }
    })
    return result
  }
  