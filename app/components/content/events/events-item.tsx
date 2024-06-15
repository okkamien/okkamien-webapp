import React, {FC} from 'react'
import {Anchor, Text} from '@effortless-ui'
import dayjs from 'dayjs'
import Link from 'next/link'

import {siteMap} from '@/app/dictionaries/site.dictionary'
import {TApiEvent} from '@/app/features/api'
import {getFormattedDateRange} from '@/app/utils'

type TEventsItemProps = TApiEvent

export const EventsItem: FC<TEventsItemProps> = ({attributes: {description, from, location, title, to}}) => {
  return (
    <>
      <Text tag="h1">{title}</Text>
      <Text>
        <strong>
          {location.data.attributes.name}, {to ? getFormattedDateRange(dayjs(from), dayjs(to)) : dayjs(from).format('DD/MM/YYYY')}
        </strong>
      </Text>
      <Text>{description}</Text>
      <Link href={siteMap.events} legacyBehavior passHref>
        <Anchor>Wróć do listy</Anchor>
      </Link>
    </>
  )
}
