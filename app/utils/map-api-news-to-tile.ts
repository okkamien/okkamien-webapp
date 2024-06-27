import dayjs from 'dayjs'

import {ITileProps} from '@/app/components/ui'
import {siteMap} from '@/app/dictionaries/site.dictionary'
import {TApiNews} from '@/app/features/api'

export const mapApiNewsToTile = ({attributes: {date, slug, teaser, title}}: TApiNews): ITileProps => {
  return {
    date: dayjs(date),
    link: `${siteMap.news}/${slug}`,
    teaser,
    title,
  }
}
