import React, {FC, ReactNode, useCallback, useEffect, useState} from 'react'
import {Box, Button, PropsWithCS, Text} from '@effortless-ui'
import {IconChevronLeft, IconChevronRight} from '@tabler/icons-react'
import AutoHeight from 'embla-carousel-auto-height'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'

import {IApiGallery} from '@/app/features/api'
import {useScreenSize} from '@/app/hooks'
import {theme} from '@/app/styles'
import {getStrapiMediaUrl} from '@/app/utils'

interface IGalleryProps {
  images: IApiGallery['data']
}

export const Gallery: FC<IGalleryProps> = ({images}) => {
  const {screenWidth} = useScreenSize()
  const isMobile = screenWidth <= theme.breakpoints[0]
  const mainSlidesToScroll = 1
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(
    {
      align: 'start',
      containScroll: false,
      slidesToScroll: mainSlidesToScroll,
    },
    // eslint-disable-next-line new-cap
    [AutoHeight()],
  )
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  })

  const [canScrollPrev, setCanScrollPrev] = useState<boolean>(false)
  const [canScrollNext, setCanScrollNext] = useState<boolean>(true)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const onThumbClick = useCallback(
    (i: number) => {
      if (emblaMainApi && emblaThumbsApi) emblaMainApi.scrollTo(i)
    },
    [emblaMainApi, emblaThumbsApi],
  )
  const onSelect = useCallback(() => {
    if (emblaMainApi && emblaThumbsApi) {
      setSelectedIndex(emblaMainApi.selectedScrollSnap())
      emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
    }
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])

  const updateSliderUI = () => {
    if (emblaMainApi) {
      setCanScrollPrev(emblaMainApi.canScrollPrev())
      setCanScrollNext(emblaMainApi.canScrollNext() && !!images && images.length > mainSlidesToScroll)
      onSelect()
    }
  }

  emblaMainApi?.on('select', () => updateSliderUI())
  useEffect(() => updateSliderUI(), [isMobile])

  return (
    <Box cs={{position: 'relative'}}>
      <Box ref={emblaMainRef} cs={{overflow: 'hidden'}}>
        <Box
          tag="ul"
          composition={['semanticList']}
          cs={{
            display: 'flex',
            alignItems: 'flex-start',
            backfaceVisibility: 'hidden',
            touchAction: 'pan-y',
            transition: 'height 200ms',
          }}
        >
          {images?.map(({attributes: {height, name, url, width}}, i) => (
            <Box
              key={i}
              tag="li"
              cs={{
                flex: `0 0 ${100 / mainSlidesToScroll}%`,
                borderRadius: theme.radii.m,
                overflow: 'hidden',
                img: {
                  width: '100%',
                },
              }}
            >
              <Image src={getStrapiMediaUrl(url)} alt={name} width={width} height={height} sizes="100%" />
            </Box>
          ))}
        </Box>
      </Box>
      <Box ref={emblaThumbsRef} cs={{mt: theme.spacing.m, overflow: 'hidden'}}>
        <Box
          tag="ul"
          composition={['semanticList']}
          cs={{
            display: 'flex',
            gap: theme.spacing.s,
            backfaceVisibility: 'hidden',
            touchAction: 'pan-y',
          }}
        >
          {images?.map(({attributes: {name, url}}, i) => (
            <Box
              key={i}
              tag="li"
              cs={{
                position: 'relative',
                flexShrink: 0,
                width: 88,
                height: 110,
                cursor: 'pointer',
                opacity: selectedIndex === i ? 1 : 0.65,
                overflow: 'hidden',
                transition: 'opacity 200ms',
                '&:hover': {
                  opacity: 1,
                },
              }}
              onClick={() => onThumbClick(i)}
            >
              <Image
                src={getStrapiMediaUrl(url)}
                alt={name}
                fill
                sizes="100%"
                css={{
                  borderRadius: theme.radii.s,
                  outline: '1px solid',
                  outlineColor: selectedIndex === i ? theme.color.contentIcon : 'transparent',
                  outlineOffset: -1,
                  objectFit: 'cover',
                  transition: 'outline-color 200ms',
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
