import React, {FC, PropsWithChildren} from 'react'
import {Box, Text} from '@effortless-ui'
import Image from 'next/image'

import {TApiDynamicZone} from '@/app/components/content'
import {DetailsSection, FilesToDownload, Gallery, Tile, TilesSlider, Wysiwyg} from '@/app/components/ui'
import {theme} from '@/app/styles'
import {getStrapiImageUrl, mapApiEventToTile} from '@/app/utils'

interface IDynamicZoneProps {
  title: string
  zones: TApiDynamicZone[]
}

const DynamicZoneHeading: FC<PropsWithChildren> = ({children}) => {
  return (
    <Text tag="h2" className="content-page-heading" cs={{mb: theme.spacing.l, fontWeight: 300, fontStyle: 'italic'}}>
      {children}
    </Text>
  )
}

export const DynamicZone: FC<IDynamicZoneProps> = ({title, zones}) => {
  return zones.map((zone, i) => {
    switch (zone.__component) {
      case 'two-columns.details-section': {
        return <DetailsSection {...zone} />
      }
      case 'two-columns.files': {
        const {
          files: {data},
          title: zoneTitle,
        } = zone

        return (
          <Box key={i}>
            <DynamicZoneHeading>{zoneTitle}</DynamicZoneHeading>
            <FilesToDownload files={data} />
          </Box>
        )
      }
      case 'two-columns.gallery': {
        const {
          images: {data},
          title: zoneTitle,
        } = zone

        return (
          <Box key={i}>
            <DynamicZoneHeading>{zoneTitle}</DynamicZoneHeading>
            <Gallery images={data} />
          </Box>
        )
      }
      case 'two-columns.poster': {
        const {
          description,
          image: {
            data: {attributes},
          },
        } = zone
        const {height, width} = attributes

        return (
          <Box key={i} cs={{position: 'relative', borderRadius: theme.radii.m, overflow: 'hidden'}}>
            <Image src={getStrapiImageUrl(attributes, ['large'])} alt={title} width={width} height={height} sizes="100%" />
            {description && <Text cs={{mt: theme.spacing.xxl}}>{description}</Text>}
          </Box>
        )
      }
      case 'two-columns.related-events': {
        const {events, title: zoneTitle} = zone

        return (
          <Box key={i} id="news-event-section" cs={{scrollMarginTop: theme.spacing.l + theme.size.nav}}>
            <DynamicZoneHeading>{zoneTitle}</DynamicZoneHeading>
            <TilesSlider
              tiles={events.data.map((item, j) => (
                <Tile key={j} {...mapApiEventToTile(item)} />
              ))}
            />
          </Box>
        )
      }
      case 'two-columns.text-content': {
        const {content, title: zoneTitle} = zone

        return (
          <Box key={i}>
            {zoneTitle && <DynamicZoneHeading>{zoneTitle}</DynamicZoneHeading>}
            {content && <Wysiwyg content={content} />}
          </Box>
        )
      }
      default:
        return 'defaul'
    }
  })
}
