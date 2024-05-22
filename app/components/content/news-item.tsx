import React, {FC} from 'react'
import {Anchor, Text} from '@effortless-ui'
import Link from 'next/link'

import {siteMap} from '@/app/dictionaries/site.dictionary'
import {TApiNews} from '@/app/features/api/types'

type TNewsItemProps = TApiNews

export const NewsItem: FC<TNewsItemProps> = ({attributes: {content, publishedAt, title}}) => {
  return (
    <>
      <Text tag="h1">{title}</Text>
      <Text>
        <strong>Opublikowano {new Date(publishedAt).toLocaleString()}</strong>
      </Text>
      <Text>{content}</Text>
      <Link href={siteMap.news} legacyBehavior passHref>
        <Anchor>Wróć do listy</Anchor>
      </Link>
    </>
  )
}
