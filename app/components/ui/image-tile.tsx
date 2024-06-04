import React, {FC} from 'react'
import {Anchor, Box} from '@effortless-ui'
import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'

import {arrowHoverParent, Btn, btnHoverParent, Title} from '@/app/components/ui'
import {theme} from '@/app/styles'
import {rgba} from '@/app/utils'

export interface IImageTileProps {
  button: string
  image: string
  link: string
  title: string
}

export const ImageTile: FC<IImageTileProps> = ({button, image, link, title}) => {
  return (
    <Link href={link} legacyBehavior passHref>
      <Anchor
        className={cn(arrowHoverParent, btnHoverParent)}
        cs={{
          label: 'Image-tile',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          aspectRatio: ['0.8541', '1.6354'],
          color: theme.color.white,
          borderRadius: theme.radii.m,
          overflow: 'hidden',
          '&:hover': {
            color: theme.color.white,
          },
        }}
      >
        <Image src={image} alt={title} fill sizes="100%" style={{objectFit: 'cover'}} />
        <Box
          cs={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: theme.spacing.ml,
            textAlign: 'center',
            rowGap: theme.spacing.l,
            bg: rgba(theme.color.overlay, 0.7),
          }}
        >
          <Title breakOnMobile>{title}</Title>
          <Btn light>{button}</Btn>
        </Box>
      </Anchor>
    </Link>
  )
}
