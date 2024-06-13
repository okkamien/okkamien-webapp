import React from 'react'
import {Box} from '@effortless-ui'

import {theme} from '@/app/styles'

export interface IExpandableArrowProps {
  color?: string
  direction: 'up' | 'down'
  size?: number
}

export const ExpandableArrow = ({color = theme.color.text, direction, size = 10}: IExpandableArrowProps) => {
  return (
    <Box
      tag="span"
      cs={{
        position: 'relative',
        display: 'inline-block',
        width: '0.6363636363636364em',
        height: '0.4090909090909091em',
        fontSize: size,
        transform: direction === 'down' ? 'translate(0, 0.0545454545454545em)' : 'translate(0, -0.1818181818181818em)',
        transition: 'transform 200ms',
        '&::before, &::after': {
          content: '""',
          position: 'absolute',
          top: '-0.0909090909090909em',
          left: '0.2727272727272727em',
          width: '0.0909090909090909em',
          height: '0.8272727272727273em',
          borderBottom: '0.4545454545454545em solid',
          borderBottomColor: color,
          borderRadius: '1px',
          transition: 'transform 200ms, border-color 200ms',
        },
        '&::before': {
          transform: direction === 'down' ? 'rotate(-135deg)' : 'rotate(-45deg)',
        },
        '&::after': {
          transform: direction === 'down' ? 'rotate(135deg)' : 'rotate(45deg)',
        },
      }}
    />
  )
}
