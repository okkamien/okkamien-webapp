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
  teaser: string
  title: string
}>

export type TApiEvent = IApiItem<{
  description: string
  from: string
  location: string
  slug: string
  teaser: string
  thumbnail: IApiImage
  title: string
  to?: string
}>

export type TApiWorkshop = IApiItem<{
  name: string
  slug: string
  teaser: string
  thumbnail?: IApiImage
}>

export type TApiWorkshopsLandingPage = IApiItem<{
  intro: string
  workshops?: {
    data: {
      id: number
    }[]
  }
}>
