import {ITileProps} from '@/app/components/ui'
import {siteMap} from '@/app/dictionaries/site.dictionary'
import {TApiWorkshop} from '@/app/features/api/types'

export const mapApiWorkshopToTile = ({attributes: {name, nameCont, slug, teaser, thumbnail}}: TApiWorkshop): ITileProps => {
  return {
    link: `${siteMap.workshops}/${slug}`,
    teaser,
    title: nameCont ? [name, nameCont] : name,
    ...(thumbnail?.data && {
      image: `${process.env.NEXT_PUBLIC_DATABASE_URL}${thumbnail.data.attributes.url}`,
    }),
  }
}
