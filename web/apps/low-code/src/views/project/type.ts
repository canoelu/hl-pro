export type ProjectItem = {
  id: number | string
  projectName: string // 标题
  label?: string // 标签
  createTime: string // 时间
  remarks?: string | null
  indexImage?: string
  createUserId: string // 创建者
  state?: number
  isDelete?: number
}

export type ProjectList = ProjectItem[]
