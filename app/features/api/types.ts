export type TStrapiFilterOperator =
  | 'eq'
  | 'eqi'
  | 'ne'
  | 'nei'
  | 'lt'
  | 'lte'
  | 'gt'
  | 'gte'
  | 'in'
  | 'notIn'
  | 'contains'
  | 'containsi'
  | 'notContainsi'
  | 'notContainsi'
  | 'null'
  | 'notNull'
  | 'between'
  | 'startsWith'
  | 'startsWithi'
  | 'endsWith'
  | 'endsWithi'
  | 'or'
  | 'and'
  | 'not'

export type TStrapiSearchOperator = 'asc' | 'desc'

export interface IApiItem<T> {
  id: number
  attributes: {
    createdAt: string
    publishedAt: string
    updatedAt: string
  } & T
}

interface IApiImage {
  data: {
    id: number
    attributes: {
      height: number
      name: string
      size: number
      url: string
      width: number
    }
  }
}

export type TApiNews = IApiItem<{
  content: string
  slug: string
  title: string
}>

export type TApiManagement = IApiItem<{
  email: string
  name: string
  title: string
  photo: IApiImage
}>
