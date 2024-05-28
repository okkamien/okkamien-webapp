import {ITileProps} from '@/app/components/ui'
import {siteMap} from '@/app/dictionaries/site.dictionary'
import {TApiWorkshop} from '@/app/features/api/types'

export const mapApiWorkshopToTile = ({attributes: {name, slug, teaser, thumbnail}}: TApiWorkshop): ITileProps => {
  return {
    link: `${siteMap.workshops}/${slug}`,
    teaser,
    title: name
      .split(' ')
      .reduce<[string, string]>((total, current, i) => (i === 0 ? [current, ''] : [total[0], `${total[1]} ${current}`]), ['', '']),
    ...(thumbnail?.data && {
      image: `${process.env.NEXT_PUBLIC_DATABASE_URL}${thumbnail.data.attributes.url}`,
    }),
  }
}
