import React, {FC, PropsWithChildren, useEffect, useRef, useState} from 'react'
import {Box, Text} from '@effortless-ui'
import {IconChevronDown} from '@tabler/icons-react'

import {theme} from '@/app/styles'

interface IAccordionProps {
  title: string
}

export const Accordion: FC<PropsWithChildren<IAccordionProps>> = ({title, children}) => {
  const [isOpen, setIsOpen] = useState(false)

  const expandableItems = useRef<HTMLInputElement>()
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (expandableItems.current) setHeight(expandableItems.current.offsetHeight)
  })

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
            fontSize: theme.font.size.base,
          }}
        >
          {title}
        </Text>
        <Box
          cs={{
            transform: isOpen ? 'rotate(180deg)' : 'none',
            transition: 'transform 200ms',
          }}
        >
          <IconChevronDown size={20} />
        </Box>
      </Box>
      <Box
        cs={{
          transition: 'opacity 200ms, height 200ms',
          pt: theme.spacing.xxs,
          opacity: [isOpen ? 1 : 0, 1],
          height: [isOpen ? height : 0, height],
          overflow: 'hidden',
        }}
      >
        <Box ref={expandableItems}>{children}</Box>
      </Box>
    </Box>
  )
}
