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
  | 'containsi'
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
  thumbnail?: IApiImage
  title: string
  to?: string
}>

export type TApiWorkshop = IApiItem<{
  name: string
  splitNameLeft?: string
  splitNameRight?: string
  slug: string
  teaser: string
  thumbnail?: IApiImage
}>

export type TApiFacility = IApiItem<{
  address: string
  description: string
  email?: string
  facebook?: string
  name: string
  splitNameLeft?: string
  splitNameRight?: string
  phone?: string
  thumbnail: IApiImage
}>

export type TApiWorkshopsLandingPage = IApiItem<{
  intro: string
  workshops?: {
    data: {
      id: number
    }[]
  }
}>

export type TApiFacilitiesLandingPage = IApiItem<{
  intro: string
  facilities?: {
    data: {
      id: number
    }[]
  }
}>
