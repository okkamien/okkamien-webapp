import React, {FC, PropsWithChildren, useState} from 'react'
import {Box, Text} from '@effortless-ui'

import {theme} from '@/app/styles'

interface IAccordionProps {
  title: string
}

export const Accordion: FC<PropsWithChildren<IAccordionProps>> = ({title, children}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Box cs={{pl: [0, theme.spacing.xs]}}>
      <Box
        onClick={() => setIsOpen(!isOpen)}
        cs={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer'}}
      >
        <Text
          cs={{
            color: theme.color.brand400,
            pb: theme.spacing.xxs,
            pt: [theme.spacing.xxs, 0],
            zIndex: 2,
            fontSize: theme.font.size.base,
          }}
        >
          {title}
        </Text>
      </Box>
      <Box
        cs={{
          transition: 'opacity 300ms ease-out, max-height 300ms ease-out',
          pt: theme.spacing.xxs,
          opacity: [isOpen ? 1 : 0, 1],
          maxHeight: [isOpen ? '500px' : '0', '500px'],
          zIndex: [isOpen ? 1 : -1, 1],
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
