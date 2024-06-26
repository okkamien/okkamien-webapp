import React, {FC, useEffect, useState} from 'react'
import {Box, Button} from '@effortless-ui'
import {Global} from '@emotion/react'
import {IconArrowsDiagonal2, IconChevronLeft, IconChevronRight, IconX} from '@tabler/icons-react'
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

  const [isFullScreen, setIsFullScreen] = useState<boolean>()
  const [canScrollPrev, setCanScrollPrev] = useState<boolean>(false)
  const [canScrollNext, setCanScrollNext] = useState<boolean>(true)
  const [selectedIndex, setSelectedIndex] = useState(0)

  // eslint-disable-next-line new-cap
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({align: 'start', containScroll: false}, [AutoHeight()])
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({axis: isFullScreen ? 'y' : 'x', containScroll: 'keepSnaps', dragFree: true})

  const updateSliderUI = () => {
    if (emblaMainApi) {
      setCanScrollPrev(emblaMainApi.canScrollPrev())
      setCanScrollNext(emblaMainApi.canScrollNext())
      setSelectedIndex(emblaMainApi.selectedScrollSnap())
      emblaThumbsApi?.scrollTo(emblaMainApi.selectedScrollSnap())
    }
  }

  emblaMainApi?.on('select', () => updateSliderUI())
  useEffect(() => updateSliderUI(), [isMobile, isFullScreen])
  useEffect(() => {
    if (isFullScreen === false) document.querySelector('#gallery')?.scrollIntoView({behavior: 'instant'})
  }, [isFullScreen])

  return (
    <>
      <Global
        styles={{
          ...(isFullScreen && {
            '#__next': {
              overflow: 'hidden',
              height: '100vh',
            },
          }),
        }}
      />
      <Box
        id="gallery"
        cs={{
          position: isFullScreen ? 'fixed' : 'relative',
          scrollMarginTop: theme.spacing.xxxxxl,
          ...(isFullScreen && {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            display: 'flex',
            flexDirection: 'row-reverse',
            borderWidth: [0, 0, theme.spacing.xl],
            borderStyle: 'solid',
            borderColor: theme.color.text,
            bg: theme.color.text,
            zIndex: 9,
          }),
        }}
      >
        <Box cs={{position: 'relative'}}>
          <Button
            variant="solid"
            cs={{position: 'absolute', top: theme.spacing.ml, right: theme.spacing.ml, bg: theme.color.white, zIndex: 2}}
            onClick={() => setIsFullScreen(!isFullScreen)}
          >
            {isFullScreen ? <IconX /> : <IconArrowsDiagonal2 />}
          </Button>
          {isFullScreen && (
            <>
              <Button
                variant="solid"
                cs={{
                  position: 'absolute',
                  bottom: theme.spacing.ml,
                  left: theme.spacing.ml,
                  bg: theme.color.white,
                  opacity: canScrollPrev ? 1 : 0,
                  zIndex: 2,
                  transition: 'opacity 200ms',
                }}
                onClick={() => emblaMainApi?.scrollPrev()}
              >
                <IconChevronLeft />
              </Button>
              <Button
                variant="solid"
                cs={{
                  position: 'absolute',
                  bottom: theme.spacing.ml,
                  right: theme.spacing.ml,
                  bg: theme.color.white,
                  opacity: canScrollNext ? 1 : 0,
                  zIndex: 2,
                  transition: 'opacity 200ms',
                }}
                onClick={() => emblaMainApi?.scrollNext()}
              >
                <IconChevronRight />
              </Button>
            </>
          )}
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
                    position: 'relative',
                    flex: '0 0 100%',
                    borderRadius: isFullScreen ? 0 : theme.radii.m,
                    overflow: 'hidden',
                    ...(isFullScreen && {
                      height: ['100vh', '100vh', `calc(100vh - ${theme.spacing.xl * 2}px)`],
                    }),
                    img: {
                      width: '100%',
                      ...(isFullScreen && {
                        height: '100%',
                        objectFit: 'contain',
                      }),
                    },
                  }}
                >
                  <Image src={getStrapiMediaUrl(url)} alt={name} width={width} height={height} sizes="100%" />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
        <Box
          ref={emblaThumbsRef}
          cs={{
            flexShrink: 0,
            mt: isFullScreen ? 0 : theme.spacing.m,
            overflow: 'hidden',
            ...(isFullScreen && {
              display: ['none', 'none', 'block'],
              p: theme.spacing.ml,
              bg: theme.gradient.radialBackground,
            }),
          }}
        >
          <Box
            tag="ul"
            composition={['semanticList']}
            cs={{
              display: 'flex',
              flexDirection: isFullScreen ? 'column' : 'row',
              gap: theme.spacing.s,
              backfaceVisibility: 'hidden',
              touchAction: 'pan-y',
              ...(isFullScreen && {
                height: '100%',
              }),
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
                onClick={() => emblaMainApi?.scrollTo(i)}
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
    </>
  )
}
