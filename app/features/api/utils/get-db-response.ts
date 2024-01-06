import axios from 'axios'
import {IncomingMessage} from 'http'

import {IApiItem, TStrapiFilterOperator, TStrapiSearchOperator} from '@/app/features/api/types'

type TGetApiResponseFilter = [string | number | string[] | number[], TStrapiFilterOperator?]

export interface IGetApiResponseParams<T extends IApiItem<unknown>> {
  endpoint: string
  filters?: {[key in keyof T['attributes'] | 'id']?: TGetApiResponseFilter}
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

export interface IPageWithInitialData<T extends IApiItem<unknown>> {
  initialData?: IGetApiResponseSuccessResponse<T>
  payload: IGetApiResponseParams<T>
  slug?: string
}

export const getApiResponse = async <T extends IApiItem<unknown>>({
  endpoint,
  filters = {},
  sort = [],
  req,
}: IGetApiResponseParams<T>): Promise<IGetApiResponseSuccessResponse<T>> => {
  const host = req ? `${req.headers['x-forwarded-proto'] ?? 'http'}://${req.headers.host}` : ''
  const response = await axios.get<IGetApiResponseSuccessResponse<T>>(`${host}/api/${endpoint}`, {
    params: {
      filters: Object.entries(filters).reduce((t, c) => {
        const [key, [value, operator = 'eq']]: [string, TGetApiResponseFilter] = c

        return {...t, [key]: {[`$${operator}`]: value}}
      }, {}),
      sort: sort.map(([key, operator = 'asc']) => `${String(key)}:${operator}`),
    },
  })

  return response.data
}
