import React, {FC, PropsWithChildren} from 'react'
import {Box, Text} from '@effortless-ui'
import Image from 'next/image'

import {SplitTitle} from '@/app/components/ui'
import {theme} from '@/app/styles'

export interface IShallowTileProps {
  image: string
  title: string | [string, string]
}

export const ShallowTile: FC<PropsWithChildren<IShallowTileProps>> = ({children, image, title}) => {
  return (
    <Box
      cs={{
        label: 'Shallow-tile',
        display: 'flex',
        minHeight: [0, 348],
        bg: theme.color.white,
        border: '1px solid',
        borderColor: theme.color.border,
        borderRadius: theme.radii.m,
      }}
    >
      <Box
        cs={{
          position: 'relative',
          display: ['none', 'none', 'block'],
          flexShrink: '0',
          width: 408,
          my: -1,
          ml: -1,
          borderRadius: theme.radii.m,
          overflow: 'hidden',
        }}
      >
        <Image src={image} alt={Array.isArray(title) ? title.join(' ') : title} fill sizes="100%" style={{objectFit: 'cover'}} />
      </Box>
      <Box
        cs={{
          display: 'flex',
          flexDirection: 'column',
          p: theme.spacing.ml,
          rowGap: [theme.spacing.s, theme.spacing.ms],
        }}
      >
        <Text tag="h2">
          <SplitTitle title={title} />
        </Text>
        {children}
      </Box>
    </Box>
  )
}
