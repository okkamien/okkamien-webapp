import React, {Dispatch, FC, ReactNode, SetStateAction, useState} from 'react'
import {Box, Button} from '@effortless-ui'

import {ExpandableArrow} from '@/app/components/ui'
import {useOutsideElementClickHandler} from '@/app/hooks'
import {theme} from '@/app/styles'

export interface IDropdownProps {
  children(isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>>): ReactNode
  label: string
}

export const Dropdown: FC<IDropdownProps> = ({children, label}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false)
  const ref = useOutsideElementClickHandler(() => setIsOpen(false))

  return (
    <Box cs={{label: 'Dropdown', position: 'relative'}} ref={ref}>
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
        {label}
        <ExpandableArrow direction={isOpen ? 'up' : 'down'} color={isMouseOver ? theme.color.primary : theme.color.text} size={22} />
      </Button>
      <Box
        cs={{
          position: 'absolute',
          top: '100%',
          left: 0,
          mt: theme.spacing.xxs,
          p: theme.spacing.s,
          border: '1px solid',
          borderColor: theme.color.text,
          borderRadius: theme.radii.s,
          backgroundColor: theme.color.white,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transform: isOpen ? 'translateY(0)' : `translateY(-${theme.spacing.xxs}px)`,
          zIndex: 3,
          transition: 'opacity 200ms, transform 200ms',
        }}
      >
        {children(isOpen, setIsOpen)}
      </Box>
    </Box>
  )
}
