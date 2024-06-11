import React, {Fragment, ReactElement, ReactNode, useEffect, useRef, useState} from 'react'
import {Box, Text} from '@effortless-ui'
import {useQuery} from '@tanstack/react-query'

import {ISelectProps, Pagination, Select} from '@/app/components/ui'
import {DEFAULT_PAGE, DEFAULT_PAGE_SIZE} from '@/app/features/api/constants'
import {IApiItem} from '@/app/features/api/types'
import {getApiCollectionResponse, getQueryKey, IGetApiCollectionResponseParams, TGetApiResponseFilters} from '@/app/features/api/utils'
import {theme} from '@/app/styles'

const DEFAULT_EMPTY_STATE = <Text>Brak elementów kolekcji dla określnych parametrów</Text>

interface IPaginatedContentFiltersSelect {
  type: 'select'
  options: Omit<ISelectProps, 'onChange' | 'value'>
}
interface IPaginatedContentFiltersDateRange {
  type: 'dateRange'
  options: {
    foo: string
  }
}

interface IPaginatedContentProps<T extends IApiItem<unknown>> {
  children(data: T[]): ReactElement
  emptyState?: ReactNode
  filters?: ((IPaginatedContentFiltersSelect | IPaginatedContentFiltersDateRange) & {
    name: keyof T['attributes']
  })[]
  page?: number
  pageSize?: number
  payload: IGetApiCollectionResponseParams<T>
  scrollToElement?: HTMLElement
}

export const PaginatedContent = <T extends IApiItem<unknown>>({
  children,
  emptyState = DEFAULT_EMPTY_STATE,
  filters,
  payload,
  page = payload.pagination?.page ?? DEFAULT_PAGE,
  pageSize = payload.pagination?.pageSize ?? DEFAULT_PAGE_SIZE,
  scrollToElement,
}: IPaginatedContentProps<T>) => {
  const ref = useRef<HTMLElement>()
  const [currentPage, setCurrentPage] = useState<number>(page)

  const [selectedFilters, setSelectedFilters] = useState<TGetApiResponseFilters<T>>({})

  const {data, isFetching, isSuccess} = useQuery({
    queryKey: getQueryKey({payload, currentPage, pageSize, filters: selectedFilters}),
    queryFn: () =>
      getApiCollectionResponse<T>({
        ...payload,
        pagination: {
          page: currentPage,
          pageSize,
        },
        filters: selectedFilters,
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
          {data.data.length ? (
            <>
              {!!filters?.length && (
                <Box cs={{mb: theme.spacing.l}}>
                  <Box
                    tag="ul"
                    composition={['semanticList']}
                    cs={{position: 'relative', display: 'flex', columnGap: theme.spacing.m, zIndex: '2'}}
                  >
                    {filters.map(({name, options, type}, i) => (
                      <Fragment key={i}>
                        {type === 'select' && (
                          <Select
                            {...options}
                            value={selectedFilters[name]?.[0] as string[]}
                            onChange={(value) =>
                              setSelectedFilters((_selectedFilters) => {
                                delete _selectedFilters[name]

                                return {
                                  ..._selectedFilters,
                                  ...(value.length && {[name]: [value, options.multiple ? 'containsi' : 'eq']}),
                                }
                              })
                            }
                          />
                        )}
                        {type === 'dateRange' && 'Implement me'}
                      </Fragment>
                    ))}
                  </Box>
                </Box>
              )}
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
            emptyState
          )}
        </>
      )}
    </>
  )
}
