import React, {useEffect, useMemo, useState} from 'react'
import {Box, Button} from '@effortless-ui'
import dayjs from 'dayjs'

import {Datepicker, ISelectProps, Select, Tag} from '@/app/components/ui'
import {IApiFilters, TApiCommonItem, TApiItemKey} from '@/app/features/api'
import {ISelectedFilter} from '@/app/features/dynamic-content'
import {theme} from '@/app/styles'
import {getFormattedDateRange} from '@/app/utils'

interface IDynamicContentFiltersSelect {
  type: 'select'
  options: Omit<ISelectProps, 'onChange' | 'value'>
}
interface IDynamicContentFiltersDateRange<T extends TApiCommonItem> {
  type: 'datepicker'
  options?: {
    endKey?: TApiItemKey<T>
  }
}

export interface IDynamicContentFiltersProps<T extends TApiCommonItem> {
  filters: ((IDynamicContentFiltersSelect | IDynamicContentFiltersDateRange<T>) & {
    key: TApiItemKey<T>
    path?: string[]
  })[]
  onChange(selectedFilters: IApiFilters<T>[]): void
}

export const DynamicContentFilters = <T extends TApiCommonItem>({filters, onChange}: IDynamicContentFiltersProps<T>) => {
  const [selectedFiltersList, setSelectedFiltersList] = useState<ISelectedFilter<T>[]>([])
  const selectedFilters = useMemo(
    () =>
      selectedFiltersList
        .flatMap(({filters: _filters}) => [..._filters])
        .reduce<IApiFilters<T>[]>(
          (total, current) =>
            total.filter((item) => current.key === item.key && current.operator === item.operator).length
              ? total.map((item) =>
                  current.key === item.key && current.operator === item.operator
                    ? {...item, value: [...item.value, ...current.value]}
                    : item,
                )
              : [...total, current],
          [],
        ),
    [selectedFiltersList],
  )

  useEffect(() => onChange(selectedFilters), [selectedFilters])

  return (
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
        {filters.map(({key, options, path = [], type}, i) => {
          switch (type) {
            case 'select': {
              return (
                <Select
                  key={i}
                  {...options}
                  value={selectedFilters.filter(({key: _key}) => key === _key).flatMap(({value}) => value)}
                  onChange={(_, {selectedLabel, selectedValue}) =>
                    setSelectedFiltersList((_selectedFiltersList) =>
                      _selectedFiltersList.map(({label}) => label).includes(selectedLabel)
                        ? _selectedFiltersList.filter(({label}) => label !== selectedLabel)
                        : [
                            ..._selectedFiltersList,
                            {filters: [{key, operator: 'in', path, type: 'and', value: [selectedValue]}], label: selectedLabel},
                          ],
                    )
                  }
                />
              )
            }
            case 'datepicker': {
              const range = selectedFilters
                .filter(({key: _key}) => key === _key || options?.endKey === _key)
                .flatMap(({value}) => value)
                .map((value) => new Date(value))
                .slice(0, 2)

              return (
                <Datepicker
                  key={i}
                  onChange={([from, to]) => {
                    const fromFormatted = dayjs(from).format('YYYY-MM-DDT00:00:00')
                    const toFormatted = dayjs(to).format('YYYY-MM-DDT23:59:59')

                    setSelectedFiltersList((_selectedFiltersList) => [
                      ..._selectedFiltersList.filter(({filters: _filters}) => _filters.every(({key: _key}) => key !== _key)),
                      {
                        filters: options?.endKey
                          ? [
                              {key, operator: 'lte', path, type: 'and', value: [toFormatted]},
                              {key: options.endKey, operator: 'gte', path, type: 'and', value: [fromFormatted]},
                            ]
                          : [{key, operator: 'between', path, type: 'and', value: [fromFormatted, toFormatted]}],
                        label: getFormattedDateRange(dayjs(from), dayjs(to)),
                      },
                    ])
                  }}
                  {...(range.length && {value: (options?.endKey ? range.reverse() : range) as [Date, Date]})}
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
            {selectedFiltersList.map(({label, filters: _filters}, i) => (
              <Box key={_filters.map(({key, type, value}) => `${type}-${key}-${value}`).join('-')} tag="li">
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
  )
}
