import React, {FC, ReactNode} from 'react'
import {Box} from 'app/components/@effortless-ui/components'
import Image from 'next/image'

import {theme} from '@/app/styles'

export interface ICoverImageProps {
  children?: ReactNode
  image: string
  imageMobile?: string
}

export const CoverImage: FC<ICoverImageProps> = ({image, children, imageMobile}) => {
  return (
    <Box
      cs={{
        label: 'Cover-image',
        display: 'flex',
        position: 'relative',
        background: theme.color.overlay,
        flex: '0 0 100%',
        width: '100vw',
        height: children ? ['90vh', '80vh'] : '25vh',
        mb: -theme.spacing.s,
        '&::after': {
          content: '""',
          position: 'absolute',
          backgroundColor: theme.color.overlay,
          opacity: 0.8,
          height: children ? ['90vh', '80vh'] : '25vh',
          width: '100vw',
        },
      }}
    >
      {imageMobile ? (
        <>
          <Box cs={{width: '100vw', display: ['none', 'block', 'block']}}>
            <Image src={image} alt="title" fill sizes="100%" style={{objectFit: 'cover'}} />
          </Box>
          <Box cs={{width: '100vw', display: ['block', 'none', 'none']}}>
            <Image src={imageMobile} alt="title" fill sizes="100%" style={{objectFit: 'cover'}} />
          </Box>
        </>
      ) : (
        <Image src={image} alt="title" fill sizes="100%" style={{objectFit: 'cover'}} />
      )}
      {children}
    </Box>
  )
}
