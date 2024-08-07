import React, {FC} from 'react'
import {Anchor, Box, Text} from '@effortless-ui'
import cn from 'classnames'
import {Dayjs} from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'

import {Arrow, arrowHoverParent, Btn, btnHoverParent, SplitTitle, Tag, tagHoverParent} from '@/app/components/ui'
import {theme} from '@/app/styles'
import {getFormattedDateRange} from '@/app/utils'

export interface ITileProps {
  button?: string
  date?: Dayjs | [Dayjs, Dayjs]
  image?: string
  link: string
  tags?: string[]
  teaser?: string
  title: string | [string, string]
}

export const Tile: FC<ITileProps> = ({button, date, image, link, tags, teaser, title}) => {
  return (
    <Link href={link} legacyBehavior passHref>
      <Anchor
        className={cn(arrowHoverParent, btnHoverParent, tagHoverParent)}
        cs={{
          label: 'Tile',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          color: theme.color.text,
          textDecoration: 'none',
          bg: theme.color.white,
          border: '1px solid',
          borderColor: theme.color.border,
          borderRadius: theme.radii.m,
          transition: 'color 200ms, background-color 200ms, border-color 200ms',
          '&:hover': {
            color: theme.color.white,
            bg: theme.color.text,
            borderColor: theme.color.text,
          },
        }}
      >
        {image && (
          <Box
            cs={{
              label: 'Tile-image',
              position: 'relative',
              height: 330,
              mx: -1,
              mt: -1,
              borderRadius: theme.radii.m,
              overflow: 'hidden',
            }}
          >
            <Image src={image} alt={Array.isArray(title) ? title.join(' ') : title} fill sizes="100%" style={{objectFit: 'cover'}} />
          </Box>
        )}
        <Box cs={{label: 'Tile-content', display: 'flex', flexDirection: 'column', flexGrow: 1, p: theme.spacing.ml}}>
          {tags?.length && (
            <Box
              tag="ul"
              composition={['semanticList']}
              cs={{display: 'flex', flexWrap: 'wrap', gap: theme.spacing.s, mb: theme.spacing.m}}
            >
              {tags.map((tag, i) => (
                <Box key={i} tag="li">
                  <Tag>{tag}</Tag>
                </Box>
              ))}
            </Box>
          )}
          {date && (
            <Text tag="span" cs={{mb: theme.spacing.xs}}>
              {Array.isArray(date) ? getFormattedDateRange(...date) : date.format('DD/MM/YYYY')}
            </Text>
          )}
          <Text tag="h2">
            <SplitTitle title={title} />
          </Text>
          {teaser && <Text cs={{mt: theme.spacing.ml, fontWeight: 300}}>{teaser}</Text>}
          {button ? (
            <Btn dark cs={{alignSelf: 'flex-end', mt: theme.spacing.ms}}>
              {button}
            </Btn>
          ) : (
            <Arrow cs={{alignSelf: 'flex-end', mt: 'auto', pt: theme.spacing.ms, color: theme.color.text}} />
          )}
        </Box>
      </Anchor>
    </Link>
  )
}
