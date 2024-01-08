import React, {FC} from 'react'
import {Anchor, Text} from '@effortless-ui'
import Link from 'next/link'

import {siteMap} from '@/app/dictionaries/site.dictionary'
import {TApiEvent} from '@/app/features/api/types'

type TEventsItemProps = TApiEvent

export const EventsItem: FC<TEventsItemProps> = ({attributes: {description, date, location, title}}) => {
  return (
    <>
      <Text tag="h1">{title}</Text>
      <Text>
        <strong>
          {location}, {new Date(date).toLocaleString()}
        </strong>
      </Text>
      <Text>{description}</Text>
      <Link href={siteMap.events} legacyBehavior passHref>
        <Anchor>Wróć do listy</Anchor>
      </Link>
    </>
  )
}
