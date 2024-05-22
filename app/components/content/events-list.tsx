import React, {FC} from 'react'
import {Anchor, Box, Text} from '@effortless-ui'
import Link from 'next/link'

import {siteMap} from '@/app/dictionaries/site.dictionary'
import {TApiEvent} from '@/app/features/api/types'

interface IEventsListProps {
  list: TApiEvent[]
}

export const EventsList: FC<IEventsListProps> = ({list}) => {
  return (
    <Box tag="ul">
      {list.map(({attributes: {date, location, slug, title}, id}) => (
        <Box key={id} tag="li">
          <Link href={`${siteMap.events}/${slug}`} legacyBehavior passHref>
            <Anchor>{title}</Anchor>
          </Link>
          <Text>
            {location}, {new Date(date).toLocaleString()}
          </Text>
        </Box>
      ))}
    </Box>
  )
}
