import React, {Fragment, ReactElement, ReactNode, useEffect, useMemo, useRef, useState} from 'react'
import {Box, Button, Text} from '@effortless-ui'
import {useQuery} from '@tanstack/react-query'
import dayjs from 'dayjs'

import {Datepicker, ISelectProps, Pagination, Select, Tag} from '@/app/components/ui'
import {DEFAULT_PAGE, DEFAULT_PAGE_SIZE} from '@/app/features/api/constants'
import {IApiItem, TStrapiFilterOperator} from '@/app/features/api/types'
import {getApiCollectionResponse, getQueryKey, IGetApiCollectionResponseParams, TGetApiResponseFilters} from '@/app/features/api/utils'
import {theme} from '@/app/styles'
import {getFormattedDateRange} from '@/app/utils'

const DEFAULT_EMPTY_STATE = <Text>Brak elementów kolekcji dla określnych parametrów</Text>

type TFilterPath<T extends IApiItem<unknown>> = [keyof T['attributes'], ...string[]]

interface ISelectedFilter<T extends IApiItem<unknown>> {
  label: string
  operator: TStrapiFilterOperator
  path: TFilterPath<T>
  value: string | string[]
}

interface IPaginatedContentFiltersSelect {
  type: 'select'
  options: Omit<ISelectProps, 'onChange' | 'value'>
}
interface IPaginatedContentFiltersDateRange<T extends IApiItem<unknown>> {
  type: 'datepicker'
  options: {
    endRangePath: TFilterPath<T>
  }
}

interface IPaginatedContentProps<T extends IApiItem<unknown>> {
  children(data: T[]): ReactElement
  emptyState?: ReactNode
  filters?: ((IPaginatedContentFiltersSelect | IPaginatedContentFiltersDateRange<T>) & {
    path: TFilterPath<T>
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

  const [selectedFiltersList, setSelectedFiltersList] = useState<ISelectedFilter<T>[]>([])
  const selectedFilters = useMemo(
    () =>
      selectedFiltersList.reduce<TGetApiResponseFilters<T>>(
        (total, {operator, path: [name, ...nested], value}) => ({
          ...total,
          ...(total[name]
            ? {[name]: [[...(total[name]?.[0] ?? []), ...(Array.isArray(value) ? value : [value])], operator, nested]}
            : {[name]: [Array.isArray(value) ? value : [value], operator, nested]}),
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
        filters: {
          ...payload.filters,
          ...selectedFilters,
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
          {filters?.length && (
            <Box cs={{mb: theme.spacing.l}}>
              <Box
                tag="ul"
                composition={['semanticList']}
                cs={{
                  position: 'relative',
                  display: 'flex',
                  flexWrap: 'wrap',
                  rowGap: theme.spacing.xs,
                  columnGap: theme.spacing.m,
                  zIndex: '2',
                }}
              >
                {filters.map(({options, path: [name, ...nested], type}, i) => {
                  switch (type) {
                    case 'select': {
                      return (
                        <Select
                          key={i}
                          {...options}
                          value={selectedFilters[name]?.[0].map((item) => String(item))}
                          onChange={(_, {selectedLabel, selectedValue}) =>
                            setSelectedFiltersList((_selectedFiltersList) =>
                              _selectedFiltersList.find(({path: [_name], value}) => name === _name && value === selectedValue)
                                ? _selectedFiltersList.filter(
                                    ({path: [_name], value}) => name !== _name || (name === _name && value !== selectedValue),
                                  )
                                : [
                                    ..._selectedFiltersList,
                                    {path: [name, ...nested], operator: 'eq', label: selectedLabel, value: selectedValue},
                                  ],
                            )
                          }
                        />
                      )
                    }
                    case 'datepicker': {
                      const range = selectedFilters[name]?.[0].map((item) => new Date(item)).slice(0, 2)

                      return (
                        // @ts-expect-error
                        <Datepicker
                          key={i}
                          onChange={([from, to]) => {
                            setSelectedFiltersList((_selectedFiltersList) => [
                              ..._selectedFiltersList.filter(({path: [_name]}) => _name !== name),
                              {
                                path: [name, ...nested],
                                operator: 'between',
                                label: getFormattedDateRange(dayjs(from), dayjs(to)),
                                value: [from.toISOString(), to.toISOString()],
                              },
                            ])
                          }}
                          {...(range && {value: range})}
                        />
                      )
                    }
                    default:
                      return null
                  }
                })}
              </Box>
              {selectedFiltersList.length > 0 && (
                <Box
                  cs={{
                    display: 'inline-flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    rowGap: theme.spacing.s,
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
                  <Box
                    tag="ul"
                    composition={['semanticList']}
                    cs={{display: 'flex', flexWrap: 'wrap', rowGap: theme.spacing.xs, columnGap: theme.spacing.s}}
                  >
                    {selectedFiltersList.map(({label, path: [name], value}, i) => (
                      <Box key={`${String(name)}-${value}`} tag="li">
                        <Tag
                          close
                          icon={false}
                          onClick={() => setSelectedFiltersList((_selectedFiltersList) => _selectedFiltersList.filter((_, j) => i !== j))}
                        >
                          {label}
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
