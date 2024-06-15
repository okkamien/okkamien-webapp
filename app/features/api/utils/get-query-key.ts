import {QueryKey} from '@tanstack/react-query'

import {DEFAULT_PAGE, DEFAULT_PAGE_SIZE} from '@/app/features/api/constants'
import {IApiFilters, IApiItem} from '@/app/features/api/types'
import {IGetApiCollectionResponseParams} from '@/app/features/api/utils'

interface IGetQueryKeyParams<T extends IApiItem<unknown>> {
  currentPage?: number
  filters?: IApiFilters<T>[]
  pageSize?: number
  payload: IGetApiCollectionResponseParams<T>
}

export const getQueryKey = <T extends IApiItem<unknown>>({
  filters,
  currentPage = DEFAULT_PAGE,
  pageSize = DEFAULT_PAGE_SIZE,
  payload,
}: IGetQueryKeyParams<T>): QueryKey => {
  return [payload, pageSize, currentPage, filters ?? []]
}
