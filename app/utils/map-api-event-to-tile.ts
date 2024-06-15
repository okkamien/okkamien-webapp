import dayjs from 'dayjs'

import {ITileProps} from '@/app/components/ui'
import {siteMap} from '@/app/dictionaries/site.dictionary'
import {TApiEvent} from '@/app/features/api'
import {getStrapiMediaUrl} from '@/app/utils'

export const mapApiEventToTile = ({attributes: {from, location, slug, teaser, thumbnail, title, to}}: TApiEvent): ITileProps => {
  return {
    date: to ? [dayjs(from), dayjs(to)] : dayjs(from),
    link: `${siteMap.events}/${slug}`,
    tags: [location.data.attributes.name],
    teaser,
    title,
    ...(thumbnail?.data && {
      image: getStrapiMediaUrl(thumbnail.data.attributes.url),
    }),
  }
}
