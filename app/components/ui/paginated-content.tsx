import React, {ReactElement, ReactNode, useState} from 'react'
import {Box, Text} from '@effortless-ui'
import {useQuery} from '@tanstack/react-query'

import {Pagination} from '@/app/components/ui'
import {DEFAULT_PAGE, DEFAULT_PAGE_SIZE} from '@/app/features/api/constants'
import {IApiItem} from '@/app/features/api/types'
import {getApiResponse, getQueryKey, IGetApiResponseParams} from '@/app/features/api/utils'

const DEFAULT_EMPTY_STATE = <Text>Brak elementów kolekcji dla określnych parametrów</Text>

interface IPaginatedContentProps<T extends IApiItem<unknown>> {
  children(data: T[]): ReactElement
  emptyState?: ReactNode
  page?: number
  pageSize?: number
  payload: IGetApiResponseParams<T>
}

export const PaginatedContent = <T extends IApiItem<unknown>>({
  children,
  emptyState = DEFAULT_EMPTY_STATE,
  payload,
  page = payload.pagination?.page ?? DEFAULT_PAGE,
  pageSize = payload.pagination?.pageSize ?? DEFAULT_PAGE_SIZE,
}: IPaginatedContentProps<T>) => {
  const [currentPage, setCurrentPage] = useState<number>(page)
  const {data, isFetching, isSuccess} = useQuery({
    queryKey: getQueryKey({payload, currentPage, pageSize}),
    queryFn: () =>
      getApiResponse<T>({
        ...payload,
        pagination: {
          page: currentPage,
          pageSize,
        },
      }),
  })

  return (
    <>
      {isSuccess && (
        <>
          {data.data.length > 0 ? (
            <>
              <Box cs={{opacity: isFetching ? 0.5 : 1}}>{children(data.data)}</Box>
              <Pagination currentPage={currentPage} pageCount={data.meta.pagination.pageCount} onChange={setCurrentPage} />
            </>
          ) : (
            emptyState
          )}
        </>
      )}
    </>
  )
}
