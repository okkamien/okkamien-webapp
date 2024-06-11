import React, {Fragment, ReactElement, ReactNode, useEffect, useMemo, useRef, useState} from 'react'
import {Box, Button, Text} from '@effortless-ui'
import {useQuery} from '@tanstack/react-query'

import {ISelectProps, Pagination, Select, Tag} from '@/app/components/ui'
import {DEFAULT_PAGE, DEFAULT_PAGE_SIZE} from '@/app/features/api/constants'
import {IApiItem, TStrapiFilterOperator} from '@/app/features/api/types'
import {getApiCollectionResponse, getQueryKey, IGetApiCollectionResponseParams, TGetApiResponseFilters} from '@/app/features/api/utils'
import {theme} from '@/app/styles'

const DEFAULT_EMPTY_STATE = <Text>Brak elementów kolekcji dla określnych parametrów</Text>

interface SelectedFilter<T extends IApiItem<unknown>> {
  name: keyof T['attributes']
  value: string
  operator: TStrapiFilterOperator
}

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

  const [selectedFiltersList, setSelectedFiltersList] = useState<SelectedFilter<T>[]>([])
  const selectedFilters = useMemo(
    () =>
      selectedFiltersList.reduce<TGetApiResponseFilters<T>>(
        (total, current) => ({
          ...total,
          ...(total[current.name]
            ? {[current.name]: [[...(total[current.name]?.[0] ?? []), current.value], 'eq']}
            : {[current.name]: [[current.value], 'eq']}),
        }),
        {},
      ),
    [selectedFiltersList],
  )

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
          {filters?.length && (
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
                        value={selectedFilters[name]?.[0].map((item) => String(item))}
                        onChange={(_, current) =>
                          setSelectedFiltersList((_selectedFiltersList) =>
                            _selectedFiltersList.find((item) => name === item.name && item.value === current.value)
                              ? _selectedFiltersList.filter(
                                  (item) => name !== item.name || (name === item.name && item.value !== current.value),
                                )
                              : [..._selectedFiltersList, {name, operator: 'eq', value: current.value}],
                          )
                        }
                      />
                    )}
                    {type === 'dateRange' && 'Implement me'}
                  </Fragment>
                ))}
              </Box>
              {selectedFiltersList.length > 0 && (
                <Box
                  cs={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    columnGap: theme.spacing.ms,
                    mt: theme.spacing.s,
                    px: theme.spacing.s,
                    py: theme.spacing.xs,
                    border: '1px solid',
                    borderColor: theme.color.border,
                    borderRadius: theme.radii.s,
                  }}
                >
                  Wybrane filtry:
                  <Box tag="ul" composition={['semanticList']} cs={{display: 'flex', columnGap: theme.spacing.s}}>
                    {selectedFiltersList.map(({name, value}) => (
                      <Box key={`${String(name)}-${value}`} tag="li">
                        <Tag
                          close
                          icon={false}
                          onClick={() =>
                            setSelectedFiltersList((_selectedFiltersList) =>
                              _selectedFiltersList.filter((item) => !(name === item.name && value === item.value)),
                            )
                          }
                        >
                          {value}
                        </Tag>
                      </Box>
                    ))}
                  </Box>
                  <Button variant="text" onClick={() => setSelectedFiltersList([])}>
                    Wyczyść wszystkie filtry
                  </Button>
                </Box>
              )}
            </Box>
          )}
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
            emptyState
          )}
        </>
      )}
    </>
  )
}
