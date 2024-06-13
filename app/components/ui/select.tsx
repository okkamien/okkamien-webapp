import React, {FC, PropsWithChildren, useState} from 'react'
import {Box, Button} from '@effortless-ui'
import {IconCheck} from '@tabler/icons-react'

import {ExpandableArrow} from '@/app/components/ui'
import {useOutsideElementClickHandler} from '@/app/hooks'
import {theme} from '@/app/styles'

export interface ISelectOption {
  label: string
  value: string
}

export interface ISelectProps {
  onChange?(
    value: string[],
    selected: {
      selectedLabel: string
      selectedValue: string
    },
  ): void
  options: ISelectOption[]
  title?: string
  value?: string[]
}

export const Select: FC<PropsWithChildren<ISelectProps>> = ({children, onChange, options, title, value}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false)
  const ref = useOutsideElementClickHandler(() => setIsOpen(false))

  return (
    <Box cs={{label: 'Select', position: 'relative'}} ref={ref}>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsMouseOver(true)}
        onMouseLeave={() => setIsMouseOver(false)}
        cs={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          columnGap: theme.spacing.xs,
          px: theme.spacing.s,
          py: theme.spacing.xs,
          color: theme.color.text,
          border: '1px solid',
          borderColor: theme.color.text,
          borderRadius: theme.radii.s,
          backgroundColor: isOpen ? theme.color.white : 'transparent',
          cursor: 'pointer',
          transition: 'color 200ms, background-color 200ms, border-color 200ms',
          '&:hover': {
            color: theme.color.primary,
            borderColor: theme.color.primary,
            backgroundColor: theme.color.white,
          },
        }}
      >
        {title ?? children}
        <ExpandableArrow direction={isOpen ? 'up' : 'down'} color={isMouseOver ? theme.color.primary : theme.color.text} size={22} />
      </Button>
      <Box
        tag="ul"
        composition={['semanticList']}
        cs={{
          position: 'absolute',
          top: '100%',
          left: 0,
          mt: theme.spacing.xxs,
          display: 'flex',
          rowGap: theme.spacing.s,
          flexDirection: 'column',
          p: theme.spacing.s,
          border: '1px solid',
          borderColor: theme.color.text,
          borderRadius: theme.radii.s,
          backgroundColor: theme.color.white,
          opacity: isOpen ? '1' : '0',
          pointerEvents: isOpen ? 'auto' : 'none',
          transform: isOpen ? 'translateY(0)' : `translateY(-${theme.spacing.xxs}px)`,
          zIndex: 3,
          transition: 'opacity 200ms, transform 200ms',
        }}
      >
        {options.map(({label, value: optionValue}, i) => (
          <Box
            key={i}
            tag="li"
            onClick={() =>
              onChange?.(
                value?.includes(optionValue) ? value.filter((item) => item !== optionValue) : [...(value ? [...value] : []), optionValue],
                {selectedLabel: label, selectedValue: optionValue},
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
              <IconCheck size={16} css={{opacity: value?.includes(optionValue) ? '1' : '0', transition: 'opacity 200ms'}} />
            </Box>
            {label}
          </Box>
        ))}
      </Box>
    </Box>
  )
}
