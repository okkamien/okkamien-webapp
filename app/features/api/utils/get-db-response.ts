import axios from 'axios'
import {IncomingMessage} from 'http'

import {DEFAULT_PAGE_SIZE} from '@/app/features/api/constants'
import {IApiItem, TStrapiFilterOperator, TStrapiSearchOperator} from '@/app/features/api/types'

type TGetApiResponseFilter = [string | number | string[] | number[], TStrapiFilterOperator?]

export interface IGetApiResponseParams<T extends IApiItem<unknown>> {
  endpoint: string
  filters?: {[key in keyof T['attributes'] | 'id']?: TGetApiResponseFilter}
  pagination?: {
    page?: number
    pageSize?: number
  }
  populate?: (keyof T['attributes'] | 'id')[]
  req?: IncomingMessage
  sort?: [keyof T['attributes'] | 'id', TStrapiSearchOperator?][]
}

export interface IGetApiResponseSuccessResponse<T> {
  data: T[]
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

export interface IPageWithPayload<T extends IApiItem<unknown>> {
  payloads: IGetApiResponseParams<T>[]
}

export const getApiResponse = async <T extends IApiItem<unknown>>({
  endpoint,
  filters = {},
  pagination = {pageSize: DEFAULT_PAGE_SIZE},
  populate = [],
  req,
  sort = [],
}: IGetApiResponseParams<T>): Promise<IGetApiResponseSuccessResponse<T>> => {
  const host = req ? `${req.headers['x-forwarded-proto'] ?? 'http'}://${req.headers.host}` : ''
  const response = await axios.get<IGetApiResponseSuccessResponse<T>>(`${host}/api/${endpoint}`, {
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
