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

interface IApiRelationSingle<T> {
  data: T
}
interface IApiRelationMultiple<T> {
  data: T[]
}

export interface IApiImageAttributes {
  formats: {
    large?: Omit<IApiImageAttributes, 'formats'>
    medium?: Omit<IApiImageAttributes, 'formats'>
    small?: Omit<IApiImageAttributes, 'formats'>
    thumbnail?: Omit<IApiImageAttributes, 'formats'>
  }
  height: number
  name: string
  size: number
  url: string
  width: number
}

export interface IApiImage {
  data: {
    id: number
    attributes: IApiImageAttributes
  }
}

export interface IApiGallery {
  data?: {
    id: number
    attributes: IApiImageAttributes
  }[]
}

export interface IApiFiles {
  data?: {
    id: number
    attributes: {
      name: string
      size: number
      url: string
    }
  }[]
}

export type TApiLocation = IApiItem<{
  address?: string
  name: string
}>

interface TApiDetailsSectionWhen {
  __component: 'details-block.when'
  from: string
  to: string
  time?: string

  label?: never
  location?: never
}
interface TApiDetailsSectionWhere {
  __component: 'details-block.where'
  location: IApiRelationSingle<TApiLocation>

  from?: never
  label?: never
  time?: never
  to?: never
}
interface TApiDetailsSectionAnchor {
  __component: 'details-block.sign-up-anchor'
  label: string

  from?: never
  location?: never
  time?: never
  to?: never
}

export type TApiDetailsSection = (TApiDetailsSectionWhen | TApiDetailsSectionWhere | TApiDetailsSectionAnchor) & {
  id: number
}

export type TApiEvent = IApiItem<{
  description: string
  from: string
  location: IApiRelationSingle<TApiLocation>
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

export type TApiNews = IApiItem<{
  content: string
  date: string
  detailsSection: TApiDetailsSection[]
  gallery: IApiGallery
  events: IApiRelationMultiple<TApiEvent>
  files: IApiFiles
  slug: string
  teaser: string
  textContent?: {
    id: number
    title: string
    content: BlocksContent
  }[]
  title: string
  poster?: IApiImage
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
