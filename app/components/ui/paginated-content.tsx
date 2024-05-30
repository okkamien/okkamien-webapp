import React, {ReactElement, ReactNode, useEffect, useRef, useState} from 'react'
import {Box, Text} from '@effortless-ui'
import {useQuery} from '@tanstack/react-query'

import {Pagination} from '@/app/components/ui'
import {DEFAULT_PAGE, DEFAULT_PAGE_SIZE} from '@/app/features/api/constants'
import {IApiItem} from '@/app/features/api/types'
import {getApiCollectionResponse, getQueryKey, IGetApiCollectionResponseParams} from '@/app/features/api/utils'
import {theme} from '@/app/styles'

const DEFAULT_EMPTY_STATE = <Text>Brak elementów kolekcji dla określnych parametrów</Text>

interface IPaginatedContentProps<T extends IApiItem<unknown>> {
  children(data: T[]): ReactElement
  emptyState?: ReactNode
  page?: number
  pageSize?: number
  payload: IGetApiCollectionResponseParams<T>
  scrollToElement?: HTMLElement
}

export const PaginatedContent = <T extends IApiItem<unknown>>({
  children,
  emptyState = DEFAULT_EMPTY_STATE,
  payload,
  page = payload.pagination?.page ?? DEFAULT_PAGE,
  pageSize = payload.pagination?.pageSize ?? DEFAULT_PAGE_SIZE,
  scrollToElement,
}: IPaginatedContentProps<T>) => {
  const ref = useRef<HTMLElement>()
  const [currentPage, setCurrentPage] = useState<number>(page)
  const {data, isFetching, isSuccess} = useQuery({
    queryKey: getQueryKey({payload, currentPage, pageSize}),
    queryFn: () =>
      getApiCollectionResponse<T>({
        ...payload,
        pagination: {
          page: currentPage,
          pageSize,
        },
      }),
  })

  useEffect(() => {
    const resolvedScrollToElement = scrollToElement ?? ref.current

    if (resolvedScrollToElement && resolvedScrollToElement.getBoundingClientRect().top < 0)
      resolvedScrollToElement.scrollIntoView({behavior: 'smooth'})
  }, [currentPage])

  return (
    <>
      {isSuccess && (
        <>
          {data.data.length > 0 ? (
            <>
              <Box
                ref={ref}
                className="t"
                cs={{
                  scrollMarginTop: theme.gap,
                  opacity: isFetching ? 0.5 : 1,
                  pointerEvents: isFetching ? 'none' : 'auto',
                }}
              >
                {children(data.data)}
              </Box>
              <Pagination
                currentPage={currentPage}
                pageCount={data.meta.pagination.pageCount}
                onChange={setCurrentPage}
                cs={{mt: theme.spacing.l}}
              />
            </>
          ) : (
            emptyState
          )}
        </>
      )}
    </>
  )
}
