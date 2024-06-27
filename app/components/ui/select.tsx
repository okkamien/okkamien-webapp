import React, {FC} from 'react'
import {Box} from '@effortless-ui'
import {IconCheck} from '@tabler/icons-react'

import {Dropdown} from '@/app/components/ui'
import {theme} from '@/app/styles'

export interface ISelectOption {
  label: string
  value: string
}

export interface ISelectProps {
  label: string
  onChange?(
    value: string[],
    selected: {
      selectedLabel: string
      selectedValue: string
    },
  ): void
  options: ISelectOption[]
  value?: string[]
}

export const Select: FC<ISelectProps> = ({onChange, options, label, value}) => {
  return (
    <Dropdown label={label}>
      {() => (
        <Box tag="ul" composition={['semanticList']} cs={{display: 'flex', rowGap: theme.spacing.s, flexDirection: 'column'}}>
          {options.map(({label: _label, value: optionValue}, i) => (
            <Box
              key={i}
              tag="li"
              onClick={() =>
                onChange?.(
                  value?.includes(optionValue) ? value.filter((item) => item !== optionValue) : [...(value ? [...value] : []), optionValue],
                  {selectedLabel: _label, selectedValue: optionValue},
                )
              }
              cs={{
                display: 'flex',
                alignItems: 'center',
                columnGap: theme.spacing.xs,
                mr: 'auto',
                fontSize: theme.font.size.small,
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                userSelect: 'none',
                transition: 'color 200ms',
                '&:hover': {
                  color: theme.color.primary,
                  '.checkbox': {
                    borderColor: theme.color.primary,
                  },
                },
              }}
            >
              <Box
                className="checkbox"
                cs={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 16,
                  height: 16,
                  color: theme.color.text,
                  border: '1px solid',
                  borderColor: theme.color.faded,
                  borderRadius: theme.radii.s,
                  transition: 'border-color 200ms',
                }}
              >
                <IconCheck size={16} css={{opacity: value?.includes(optionValue) ? 1 : 0, transition: 'opacity 200ms'}} />
              </Box>
              {_label}
            </Box>
          ))}
        </Box>
      )}
    </Dropdown>
  )
}
