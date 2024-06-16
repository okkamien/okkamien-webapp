import {BlocksContent} from '@strapi/blocks-react-renderer'

import {ExtractKeys} from '@/app/utils'

export type TStrapiFilterType = 'and' | 'or'

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

export type TStrapiSearchOperator = 'asc' | 'desc'

export interface IApiItem<T> {
  id: number
  attributes: {
    createdAt: string
    publishedAt: string
    updatedAt: string
  } & T
}

interface IApiRelation<T> {
  data: T
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

export type TApiLocation = IApiItem<{
  name: string
}>

export type TApiNews = IApiItem<{
  content: string
  slug: string
  teaser: string
  title: string
  poster?: IApiImage
  textContent?: {
    id: number
    title: string
    content: BlocksContent
  }[]
}>

export type TApiEvent = IApiItem<{
  description: string
  from: string
  location: IApiRelation<TApiLocation>
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

export type TApiHomePage = IApiItem<{
  events?: {
    data: {
      id: number
    }[]
  }
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

export type TApiCommonItem = IApiItem<unknown>

export type TApiItemKey<T extends TApiCommonItem> = ExtractKeys<T['attributes']> | 'id'

export interface IApiFilters<T extends TApiCommonItem> {
  key: TApiItemKey<T>
  operator?: TStrapiFilterOperator
  path?: string[]
  type?: TStrapiFilterType
  value: string[]
}

export type TApiParsedFilters<T extends TApiCommonItem> = {
  [type in `$${TStrapiFilterType}`]?: {
    [key in TApiItemKey<T>]?: {
      [operator in `$${TStrapiFilterOperator}`]?: string[] | number[]
    }
  }[]
}
