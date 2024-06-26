import React, {FC} from 'react'
import {Box, Text} from '@effortless-ui'
import Image from 'next/image'

import {DetailsSection, FilesToDownload, TextContent, Tile, TilesSlider, TwoColumns} from '@/app/components/ui'
import {TApiNews} from '@/app/features/api'
import {theme} from '@/app/styles'
import {getStrapiMediaUrl, mapApiEventToTile} from '@/app/utils'

type TNewsItemProps = TApiNews

export const NewsItem: FC<TNewsItemProps> = ({attributes: {detailsSection, events, files, poster, textContent, title}}) => {
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
      {detailsSection.length > 0 && <DetailsSection blocks={detailsSection} />}
      {textContent?.map((item, i) => <TextContent key={i} {...item} />)}
      {events.data.length > 0 && (
        <Box id="news-event-section" cs={{scrollMarginTop: theme.spacing.l}}>
          <Text tag="h2" cs={{mb: theme.spacing.l, fontWeight: 300, fontStyle: 'italic'}}>
            Planowane wydarzenia
          </Text>
          <TilesSlider
            tiles={events.data.map((item, i) => (
              <Tile key={i} {...mapApiEventToTile(item)} />
            ))}
          />
        </Box>
      )}
      {files.data && (
        <Box>
          <Text tag="h2" cs={{mb: theme.spacing.l, fontWeight: 300, fontStyle: 'italic'}}>
            Dokumenty do pobrania
          </Text>
          <FilesToDownload files={files.data} />
        </Box>
      )}
    </TwoColumns>
  )
}
