import dayjs from 'dayjs'

import {ITileProps} from '@/app/components/ui'
import {siteMap} from '@/app/dictionaries/site.dictionary'
import {TApiEvent} from '@/app/features/api/types'

export const mapApiEventToTile = ({attributes: {from, location, slug, teaser, thumbnail, title, to}}: TApiEvent): ITileProps => {
  return {
    date: to ? [dayjs(from), dayjs(to)] : dayjs(from),
    link: `${siteMap.events}/${slug}`,
    tags: [location],
    teaser,
    title,
    ...(thumbnail?.data && {
      image: `${process.env.NEXT_PUBLIC_DATABASE_URL}${thumbnail.data.attributes.url}`,
    }),
  }
}
