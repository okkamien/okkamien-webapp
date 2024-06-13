import React, {FC, PropsWithChildren, ReactNode, useEffect, useRef, useState} from 'react'
import {Box} from '@effortless-ui'

import {ExpandableArrow} from '@/app/components/ui'
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
        {title}
        <Box cs={{display: ['block', 'none']}}>
          <ExpandableArrow direction={isOpen ? 'up' : 'down'} size={22} />
        </Box>
      </Box>
      <Box
        cs={{
          label: 'accordion-items',
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
