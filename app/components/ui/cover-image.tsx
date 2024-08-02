import React, {FC, ReactNode} from 'react'
import {Box} from 'app/components/@effortless-ui/components'
import Image from 'next/image'

import {theme} from '@/app/styles'

export interface ICoverImageProps {
  children?: ReactNode
  image: string
}

export const CoverImage: FC<ICoverImageProps> = ({image, children}) => {
  return (
    <Box
      cs={{
        label: 'Cover-image',
        display: 'flex',
        position: 'relative',
        background: theme.color.overlay,
        flex: '0 0 100%',
        width: '100vw',
        height: children ? '80vh' : '20vh',
        '&::after': {
          content: '""',
          position: 'absolute',
          backgroundColor: theme.color.overlay,
          opacity: 0.8,
          height: children ? '80vh' : '20vh',
          width: '100vw',
        },
      }}
    >
      <Image src={image} alt="title" fill sizes="100%" style={{objectFit: 'cover'}} />
      {children}
    </Box>
  )
}
