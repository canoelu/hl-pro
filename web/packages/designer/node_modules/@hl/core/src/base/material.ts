import { getUUID } from '@hl/utils'
import { IMaterialConfig } from '../../types'

/**
 * 物料
 */
class Material {
  id: string
  name: string
  component: string
  icon: string = ''
  selected = false
  locked = false
  show = true
  active = false
  display = true
  private _style = []
  private _prop = []
  constructor(config: IMaterialConfig) {
    this.id = config.id || getUUID()
    this.name = config.name
    this.component = config.component
    this.icon = config.icon || ''
  }
  get styleFormValue() {
    return []
  }
  toJson() {
    return {}
  }
  changeProps() {}
  changeStyle() {}
  addMaterial() {}
  setVisible() {}
}
export default Material
