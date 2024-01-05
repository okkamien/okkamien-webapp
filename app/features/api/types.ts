interface IApiItem<T> {
  id: number
  attributes: {
    createdAt: string
    publishedAt: string
    updatedAt: string
  } & T
}

export type TApiNews = IApiItem<{
  content: string
  slug: string
  title: string
}>
