import React, {Fragment, ReactElement, ReactNode, useEffect, useRef, useState} from 'react'
import {Box} from '@effortless-ui'
import {useQuery} from '@tanstack/react-query'

import {Pagination} from '@/app/components/ui'
import {DEFAULT_PAGE, DEFAULT_PAGE_SIZE} from '@/app/features/api/constants'
import {IApiFilters, TApiCommonItem} from '@/app/features/api/types'
import {getApiCollectionResponse, getQueryKey, IGetApiCollectionResponseParams} from '@/app/features/api/utils'
import {DynamicContentEmptyState, DynamicContentFilters, IDynamicContentFiltersProps} from '@/app/features/dynamic-content'
import {theme} from '@/app/styles'

interface IDynamicContentProps<T extends TApiCommonItem> {
  children(data: T[]): ReactElement
  emptyState?: ReactNode
  filters?: IDynamicContentFiltersProps<T>['filters']
  page?: number
  pageSize?: number
  payload: IGetApiCollectionResponseParams<T>
  scrollToElement?: HTMLElement
}

export const DynamicContent = <T extends TApiCommonItem>({
  children,
  emptyState = 'Brak elementów kolekcji dla określnych parametrów',
  filters,
  payload,
  page = payload.pagination?.page ?? DEFAULT_PAGE,
  pageSize = payload.pagination?.pageSize ?? DEFAULT_PAGE_SIZE,
  scrollToElement,
}: IDynamicContentProps<T>) => {
  const ref = useRef<HTMLElement>()
  const [currentPage, setCurrentPage] = useState<number>(page)
  const [selectedFilters, setSelectedFilters] = useState<IApiFilters<T>[]>([])

  const {data, isFetching, isSuccess} = useQuery({
    queryKey: getQueryKey({payload, currentPage, pageSize, filters: selectedFilters}),
    queryFn: () =>
      getApiCollectionResponse<T>({
        ...payload,
        pagination: {
          page: currentPage,
          pageSize,
        },
        filters: [...(payload.filters ?? []), ...selectedFilters],
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
          {filters?.length && <DynamicContentFilters filters={filters} onChange={setSelectedFilters} />}
          {data.data.length ? (
            <>
              <Box
                ref={ref}
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
            <DynamicContentEmptyState>{emptyState}</DynamicContentEmptyState>
          )}
        </>
      )}
    </>
  )
}
