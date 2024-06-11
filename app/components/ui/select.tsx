import React, {FC, PropsWithChildren, ReactNode, useState} from 'react'
import {Box, Button} from '@effortless-ui'
import {IconCheck, IconChevronDown, IconChevronUp} from '@tabler/icons-react'

import {useOutsideElementClickHandler} from '@/app/hooks'
import {theme} from '@/app/styles'

export interface ISelectProps {
  multiple?: boolean
  onChange?(value: string[]): void
  options: {
    label: ReactNode
    value: string
  }[]
  title?: string
  value?: string[]
}

export const Select: FC<PropsWithChildren<ISelectProps>> = ({children, multiple, onChange, options, title, value}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const ref = useOutsideElementClickHandler(() => setIsOpen(false))

  return (
    <Box cs={{label: 'Select', position: 'relative'}} ref={ref}>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        cs={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          columnGap: theme.spacing.xxs,
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
        {isOpen ? <IconChevronUp size={20} /> : <IconChevronDown size={20} />}
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
          transition: 'opacity 200ms, transform 200ms',
        }}
      >
        {options.map(({label, value: optionValue}, i) => (
          <Box
            key={i}
            tag="li"
            onClick={() => {
              if (multiple && value) {
                if (value.includes(optionValue)) onChange?.(value.filter((item) => item !== optionValue))
                else onChange?.([...value, optionValue])
              } else onChange?.([optionValue])
              if (!multiple) setIsOpen(false)
            }}
            cs={{
              display: 'flex',
              alignItems: 'center',
              columnGap: theme.spacing.xs,
              mr: 'auto',
              fontSize: theme.font.size.small,
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              transition: 'color 200ms',
              '&:hover': {
                color: theme.color.primary,
                '.checkbox': {
                  borderColor: theme.color.primary,
                },
              },
            }}
          >
            {multiple && (
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
            )}
            {label}
          </Box>
        ))}
      </Box>
    </Box>
  )
}
