const DEFAULT_CONFIG = {
  id: 'id',
  children: 'children',
  pid: 'pid'
}
function getConfig(config = {}) {
  return Object.assign({}, DEFAULT_CONFIG, config)
}
 