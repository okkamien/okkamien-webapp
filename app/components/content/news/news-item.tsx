import React, {FC} from 'react'
import {Box} from '@effortless-ui'
import Image from 'next/image'

import {DetailsSection, TextContent, TwoColumns} from '@/app/components/ui'
import {TApiNews} from '@/app/features/api'
import {theme} from '@/app/styles'
import {getStrapiMediaUrl} from '@/app/utils'

type TNewsItemProps = TApiNews

export const NewsItem: FC<TNewsItemProps> = ({attributes: {detailsSection, poster, textContent, title}}) => {
  return (
    <TwoColumns title={title}>
      {poster?.data && (
        <Box cs={{position: 'relative', borderRadius: theme.radii.m, overflow: 'hidden'}}>
          <Image
            src={getStrapiMediaUrl(poster.data.attributes.url)}
            alt={title}
            width={poster.data.attributes.width}
            height={poster.data.attributes.height}
            sizes="100%"
          />
        </Box>
      )}
      {detailsSection && <DetailsSection blocks={detailsSection} />}
      {textContent?.map((item, i) => <TextContent key={i} {...item} />)}
    </TwoColumns>
  )
}
