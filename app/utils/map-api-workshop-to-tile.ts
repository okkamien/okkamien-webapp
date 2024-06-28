import {ITileProps} from '@/app/components/ui'
import {siteMap} from '@/app/dictionaries/site.dictionary'
import {TApiWorkshop} from '@/app/features/api'
import {getStrapiImageUrl} from '@/app/utils'

export const mapApiWorkshopToTile = ({
  attributes: {name, splitNameLeft, splitNameRight, slug, teaser, thumbnail},
}: TApiWorkshop): ITileProps => {
  return {
    link: `${siteMap.workshops}/${slug}`,
    teaser,
    title: splitNameLeft && splitNameRight ? [splitNameLeft, splitNameRight] : name,
    ...(thumbnail?.data && {
      image: getStrapiImageUrl(thumbnail.data.attributes, ['large']),
    }),
  }
}
