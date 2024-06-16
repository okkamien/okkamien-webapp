import axios from 'axios'
import {IncomingMessage} from 'http'

import {DEFAULT_PAGE_SIZE, IApiFilters, TApiCommonItem, TApiItemKey, TApiParsedFilters, TStrapiSearchOperator} from '@/app/features/api'

interface INestedRecord<T> {
  [key: string]: T | INestedRecord<T>
}

export interface IGetApiCollectionResponseParams<T extends TApiCommonItem> {
  endpoint: string
  filters?: IApiFilters<T>[]
  pagination?: {
    limit?: number
    page?: number
    pageSize?: number
  }
  populate?: (keyof T['attributes'])[]
  req?: IncomingMessage
  sort?: [TApiItemKey<T>, TStrapiSearchOperator?][]
}

export interface IGetApiSingleResponseParams<T extends TApiCommonItem> {
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

export interface IPageWithPayload<T extends TApiCommonItem[]> {
  payloads: {[P in keyof T]: IGetApiCollectionResponseParams<T[P]>}
}

export const getApiCollectionResponse = async <T extends TApiCommonItem>({
  endpoint,
  filters = [],
  pagination = {pageSize: DEFAULT_PAGE_SIZE},
  populate = [],
  req,
  sort = [],
}: IGetApiCollectionResponseParams<T>): Promise<IGetApiCollectionResponseSuccessResponse<T>> => {
  const host = req ? process.env.NEXT_PUBLIC_DATABASE_URL : ''
  const response = await axios.get<IGetApiCollectionResponseSuccessResponse<T>>(`${host}/api/${endpoint}`, {
    params: {
      filters: filters.reduce<TApiParsedFilters<T>>(
        (total, {key, operator = 'eq', path = [], type = 'and', value}) => ({
          ...total,
          [`$${type}`]: [
            ...(total[`$${type}`] ?? []),
            {
              [key]: path.reverse().reduce<INestedRecord<typeof value>>((_total, _key) => ({[_key]: _total}), {
                [`$${operator}`]: value,
              }),
            },
          ],
        }),
        {},
      ),
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

export const getApiSingleResponse = async <T extends TApiCommonItem>({
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
