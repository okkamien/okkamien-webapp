import axios from 'axios'
import {IncomingMessage} from 'http'

import {DEFAULT_PAGE_SIZE} from '@/app/features/api/constants'
import {IApiItem, TStrapiFilterOperator, TStrapiSearchOperator} from '@/app/features/api/types'

interface INestedRecord<T> {
  [key: string]: T | INestedRecord<T>
}

type TGetApiResponseFilter = [string[] | number[], TStrapiFilterOperator, string[]?]

export type TGetApiResponseFilters<T extends IApiItem<unknown>> = {[key in keyof T['attributes'] | 'id']?: TGetApiResponseFilter}

export interface IGetApiCollectionResponseParams<T extends IApiItem<unknown>> {
  endpoint: string
  filters?: TGetApiResponseFilters<T>
  pagination?: {
    limit?: number
    page?: number
    pageSize?: number
  }
  populate?: (keyof T['attributes'])[]
  req?: IncomingMessage
  sort?: [keyof T['attributes'] | 'id', TStrapiSearchOperator?][]
}

export interface IGetApiSingleResponseParams<T extends IApiItem<unknown>> {
  endpoint: string
  populate?: (keyof T['attributes'])[]
  req?: IncomingMessage
}

export interface IGetApiResponseSuccessResponse {
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
  success: true
}
export interface IGetApiCollectionResponseSuccessResponse<T> extends IGetApiResponseSuccessResponse {
  data: T[]
}
export interface IGetApiSingleResponseSuccessResponse<T> extends IGetApiResponseSuccessResponse {
  data: T
}

export interface IPageWithPayload<T extends IApiItem<unknown>[]> {
  payloads: {[P in keyof T]: IGetApiCollectionResponseParams<T[P]>}
}

export const getApiCollectionResponse = async <T extends IApiItem<unknown>>({
  endpoint,
  filters = {},
  pagination = {pageSize: DEFAULT_PAGE_SIZE},
  populate = [],
  req,
  sort = [],
}: IGetApiCollectionResponseParams<T>): Promise<IGetApiCollectionResponseSuccessResponse<T>> => {
  const host = req ? process.env.NEXT_PUBLIC_DATABASE_URL : ''
  const response = await axios.get<IGetApiCollectionResponseSuccessResponse<T>>(`${host}/api/${endpoint}`, {
    params: {
      filters: Object.entries(filters).reduce((total, [key, [value, operator, nested = []]]: [string, TGetApiResponseFilter]) => {
        return {
          ...total,
          [key]: nested.reduce<INestedRecord<typeof value>>((nestedRecord, nestedKey) => ({[nestedKey]: nestedRecord}), {
            [`$${operator}`]: value,
          }),
        }
      }, {}),
      pagination,
      populate,
      sort: sort.map(([key, operator = 'asc']) => `${String(key)}:${operator}`),
    },
    ...(req && {
      headers: {
        Authorization: `bearer ${process.env.DATABASE_API_TOKEN}`,
      },
    }),
  })

  return response.data
}

export const getApiSingleResponse = async <T extends IApiItem<unknown>>({
  endpoint,
  populate = [],
  req,
}: IGetApiSingleResponseParams<T>): Promise<IGetApiSingleResponseSuccessResponse<T>> => {
  const host = req ? process.env.NEXT_PUBLIC_DATABASE_URL : ''
  const response = await axios.get<IGetApiSingleResponseSuccessResponse<T>>(`${host}/api/${endpoint}`, {
    params: {populate},
    ...(req && {
      headers: {
        Authorization: `bearer ${process.env.DATABASE_API_TOKEN}`,
      },
    }),
  })

  return response.data
}
