import {QueryKey} from '@tanstack/react-query'

import {DEFAULT_PAGE, DEFAULT_PAGE_SIZE, IApiFilters, IGetApiCollectionResponseParams, TApiCommonItem} from '@/app/features/api'

interface IGetQueryKeyParams<T extends TApiCommonItem> {
  currentPage?: number
  filters?: IApiFilters<T>[]
  pageSize?: number
  payload: IGetApiCollectionResponseParams<T>
}

export const getQueryKey = <T extends TApiCommonItem>({
  filters,
  currentPage = DEFAULT_PAGE,
  pageSize = DEFAULT_PAGE_SIZE,
  payload,
}: IGetQueryKeyParams<T>): QueryKey => {
  return [payload, pageSize, currentPage, filters ?? []]
}
