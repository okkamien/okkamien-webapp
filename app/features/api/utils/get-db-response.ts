import axios from 'axios'
import {IncomingMessage} from 'http'

import {DEFAULT_PAGE_SIZE} from '@/app/features/api/constants'
import {IApiItem, TStrapiFilterOperator, TStrapiSearchOperator} from '@/app/features/api/types'

type TGetApiResponseFilter = [string | number | string[] | number[], TStrapiFilterOperator?]

export interface IGetApiCollectionResponseParams<T extends IApiItem<unknown>> {
  endpoint: string
  filters?: {[key in keyof T['attributes'] | 'id']?: TGetApiResponseFilter}
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
      filters: Object.entries(filters).reduce((t, c) => {
        const [key, [value, operator = 'eq']]: [string, TGetApiResponseFilter] = c

        return {...t, [key]: {[`$${operator}`]: value}}
      }, {}),
      pagination,
      populate,
      sort: sort.map(([key, operator = 'asc']) => `${String(key)}:${operator}`),
    },
  })

  return response.data
}

export const getApiSingleResponse = async <T extends IApiItem<unknown>>({
  endpoint,
  populate = [],
  req,
}: IGetApiSingleResponseParams<T>): Promise<IGetApiSingleResponseSuccessResponse<T>> => {
  const host = req ? `${req.headers['x-forwarded-proto'] ?? 'http'}://${req.headers.host}` : ''
  const response = await axios.get<IGetApiSingleResponseSuccessResponse<T>>(`${host}/api/${endpoint}`, {
    params: {populate},
  })

  return response.data
}
