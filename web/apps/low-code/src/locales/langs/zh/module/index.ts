const allPages: Record<string, { default: unknown }> = import.meta.glob('@/locales/langs/zh/module/*.ts', {
  eager: true,
})

type ModuleType<T> = {
  [key: string]: T
}
const moduleObj: ModuleType<unknown> = {}

Object.entries(allPages).forEach(([path, moduleFn]: [string, { default: unknown }]) => {
  const match = path.match(/\/module\/([^.\/]+)\.ts/)
  const name = match?.[1] as string
  moduleObj[name] = moduleFn?.default
})

export default moduleObj
