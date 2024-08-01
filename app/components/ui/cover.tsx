import React, {FC, useEffect, useState} from 'react'
import {Box, Button, PropsWithCS} from '@effortless-ui'
import {IconChevronLeft, IconChevronRight} from '@tabler/icons-react'
import {Container} from 'app/components/ui/container'
import {CoverImage} from 'app/components/ui/cover-image'
import {CoverItem} from 'app/components/ui/cover-item'
import Fade from 'embla-carousel-fade'
import useEmblaCarousel from 'embla-carousel-react'

import {IApiSlide} from '@/app/features/api'
import {theme} from '@/app/styles'
import {mapApiEventToTile} from '@/app/utils'

export interface ICoverProps extends PropsWithCS {
  coverData: IApiSlide[]
}

export const Cover: FC<ICoverProps> = ({coverData}) => {
  const [canScrollPrev, setCanScrollPrev] = useState<boolean>(false)
  const [canScrollNext, setCanScrollNext] = useState<boolean>(true)

  // eslint-disable-next-line new-cap
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({align: 'start', containScroll: false}, [Fade()])

  // console.log('coverData', coverData)

  const updateSliderUI = () => {
    if (emblaMainApi) {
      setCanScrollPrev(emblaMainApi.canScrollPrev())
      setCanScrollNext(emblaMainApi.canScrollNext())
    }
  }

  emblaMainApi?.on('select', () => updateSliderUI())
  useEffect(() => updateSliderUI(), [])

  return (
    <Box cs={{position: 'relative'}}>
      <Box ref={emblaMainRef} cs={{overflow: 'hidden', height: '80vh'}}>
        <Box
          tag="ul"
          composition={['semanticList']}
          cs={{
            display: 'flex',
            position: 'relative',
            alignItems: 'flex-start',
          }}
        >
          {coverData.map((item, i) => (
            <Box key={i} tag="li" cs={{position: 'relative', height: '100%'}}>
              <CoverImage image={item.cover.data.attributes.url}>
                <Container cs={{position: 'relative', height: '80vh', justifyContent: 'space-between'}}>
                  <Box />
                  <CoverItem key={i} {...mapApiEventToTile(item.event.data)} />
                </Container>
              </CoverImage>
            </Box>
          ))}
        </Box>
      </Box>
      <Box cs={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 0}}>
        <Container cs={{position: 'relative'}}>
          <Box cs={{position: 'absolute', right: theme.spacing.xs, bottom: 0, width: 134, height: 150}}>
            <Button
              variant="solid"
              cs={{
                position: 'absolute',
                bottom: theme.spacing.ml,
                left: theme.spacing.ml,
                bg: 'transparent',
                border: '1px solid',
                borderColor: theme.color.white,
                opacity: canScrollPrev ? 1 : 0,
                zIndex: 2,
                transition: 'opacity 200ms',
              }}
              onClick={() => {
                emblaMainApi?.scrollPrev()
              }}
            >
              <IconChevronLeft css={{color: theme.color.white}} />
            </Button>
            <Button
              variant="solid"
              cs={{
                position: 'absolute',
                bottom: theme.spacing.ml,
                right: theme.spacing.ml,
                bg: 'transparent',
                border: '1px solid',
                borderColor: theme.color.white,
                opacity: canScrollNext ? 1 : 0,
                zIndex: 2,
                transition: 'opacity 200ms',
              }}
              onClick={() => {
                emblaMainApi?.scrollNext()
              }}
            >
              <IconChevronRight css={{color: theme.color.white}} />
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}
