import React, {FC} from 'react'
import {Anchor, Box, Text} from '@effortless-ui'
import Link from 'next/link'

import {siteMap} from '@/app/dictionaries/site.dictionary'
import {TApiNews} from '@/app/features/api/types'

interface INewsListProps {
  list: TApiNews[]
}

export const NewsList: FC<INewsListProps> = ({list}) => {
  return (
    <Box tag="ul">
      {list.map(({attributes: {publishedAt, slug, title}, id}) => (
        <Box key={id} tag="li">
          <Link href={`${siteMap.news}/${slug}`} legacyBehavior passHref>
            <Anchor>{title}</Anchor>
          </Link>
          <Text>{new Date(publishedAt).toLocaleString()}</Text>
        </Box>
      ))}
    </Box>
  )
}
