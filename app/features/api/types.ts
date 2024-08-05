import {BlocksContent} from '@strapi/blocks-react-renderer'

import {TApiDynamicZone} from '@/app/components/content'
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

export interface IApiRelation<T> {
  data: T
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

export interface IApiTextContent {
  id: number
  title: string
  content: BlocksContent
}

export type TApiLocation = IApiItem<{
  address?: string
  name: string
}>

export type TApiStaff = IApiItem<{
  email: string
  name: string
  phone: string
  photo: IApiImage
  title: string
}>

export type TApiNews = IApiItem<{
  content: TApiDynamicZone[]
  date: string
  slug: string
  teaser: string
  title: string
}>

export type TApiEvent = IApiItem<{
  content: TApiDynamicZone[]
  from: string
  location?: IApiRelation<TApiLocation>
  slug: string
  teaser: string
  thumbnail?: IApiImage
  title: string
  to: string
}>

export type TApiWorkshop = IApiItem<{
  content: TApiDynamicZone[]
  name: string
  slug: string
  splitNameLeft?: string
  splitNameRight?: string
  teaser: string
  thumbnail?: IApiImage
}>

export type TApiFacility = IApiItem<{
  address: string
  description: string
  email?: string
  facebook?: string
  name: string
  phone?: string
  splitNameLeft?: string
  splitNameRight?: string
  thumbnail: IApiImage
}>

export interface IApiSlide {
  cover: IApiImage
  id: number
  title?: BlocksContent
  content?: BlocksContent
  event: IApiRelation<TApiEvent>
}

export type TApiHomePage = IApiItem<{
  events?: {
    data: {
      id: number
    }[]
  }
  slider: IApiSlide[]
}>

export type TApiNewsLandingPage = IApiItem<{
  cover: IApiImage
  coverMobile?: IApiImage
}>

export type TApiEventsLandingPage = IApiItem<{
  cover: IApiImage
  coverMobile?: IApiImage
}>

export type TApiWorkshopsLandingPage = IApiItem<{
  cover: IApiImage
  coverMobile?: IApiImage
  intro: string
  workshops?: {
    data: {
      id: number
    }[]
  }
}>

export type TApiFacilitiesLandingPage = IApiItem<{
  cover: IApiImage
  coverMobile?: IApiImage
  intro: string
  facilities?: {
    data: {
      id: number
    }[]
  }
}>

export type TApiAboutUsPage = IApiItem<{
  content: TApiDynamicZone[]
  cover: IApiImage
  coverMobile?: IApiImage
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
