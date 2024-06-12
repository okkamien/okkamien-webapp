import React, {FC, PropsWithChildren, ReactNode, useEffect, useRef, useState} from 'react'
import {Box, Text} from '@effortless-ui'
import {IconChevronDown} from '@tabler/icons-react'

import {theme} from '@/app/styles'

interface IAccordionProps {
  title: ReactNode
}

export const Accordion: FC<PropsWithChildren<IAccordionProps>> = ({title, children}) => {
  const [isOpen, setIsOpen] = useState(false)

  const expandableItemsRef = useRef<HTMLInputElement>()
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (expandableItemsRef.current) setHeight(expandableItemsRef.current.offsetHeight)
  }, [])

  return (
    <Box cs={{label: 'Accordion', pl: [0, theme.spacing.xs]}}>
      <Box
        onClick={() => setIsOpen(!isOpen)}
        cs={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: ['pointer', 'auto']}}
      >
        <Text
          tag="h3"
          variant="h6"
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
            display: ['block', 'none'],
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
        <Box ref={expandableItemsRef}>{children}</Box>
      </Box>
    </Box>
  )
}
