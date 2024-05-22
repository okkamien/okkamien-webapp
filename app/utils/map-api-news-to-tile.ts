import dayjs from 'dayjs'

import {ITileProps} from '@/app/components/ui'
import {siteMap} from '@/app/dictionaries/site.dictionary'
import {TApiNews} from '@/app/features/api/types'

export const mapApiNewsToTile = ({attributes: {publishedAt, slug, teaser, title}}: TApiNews): ITileProps => {
  return {
    date: dayjs(publishedAt),
    link: `${siteMap.news}/${slug}`,
    teaser,
    title,
  }
}
