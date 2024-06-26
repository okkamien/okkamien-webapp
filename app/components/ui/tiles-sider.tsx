import React, {FC, ReactNode, useEffect, useState} from 'react'
import {Box, Button, PropsWithCS} from '@effortless-ui'
import {IconChevronLeft, IconChevronRight} from '@tabler/icons-react'
import useEmblaCarousel from 'embla-carousel-react'

import {useScreenSize} from '@/app/hooks'
import {theme} from '@/app/styles'

interface ITilesSliderProps extends PropsWithCS {
  tiles: ReactNode[]
}

export const TilesSlider: FC<ITilesSliderProps> = ({cs, tiles}) => {
  const {screenWidth} = useScreenSize()

  const isMobile = screenWidth <= theme.breakpoints[0]
  const slidesToScroll = isMobile ? 1 : 2

  const [canScrollPrev, setCanScrollPrev] = useState<boolean>(false)
  const [canScrollNext, setCanScrollNext] = useState<boolean>(true)
  const [emblaRef, emblaApi] = useEmblaCarousel({align: 'start', containScroll: false, slidesToScroll})

  const updateSliderUI = () => {
    if (emblaApi) {
      setCanScrollPrev(emblaApi.canScrollPrev())
      setCanScrollNext(emblaApi.canScrollNext() && tiles.length > slidesToScroll)
    }
  }

  emblaApi?.on('select', () => updateSliderUI())
  useEffect(() => updateSliderUI(), [isMobile])

  return (
    <Box cs={{position: 'relative'}}>
      <Box ref={emblaRef} cs={{overflow: ['visible', 'hidden'], ...cs}}>
        <Box
          tag="ul"
          composition={['semanticList']}
          cs={{
            display: 'flex',
            ml: theme.gap.map((item) => -item),
            backfaceVisibility: 'hidden',
            touchAction: 'pan-y',
          }}
        >
          {tiles.map((tile, i) => (
            <Box key={i} tag="li" cs={{flex: `0 0 ${100 / slidesToScroll}%`, pl: theme.gap}}>
              {tile}
            </Box>
          ))}
        </Box>
      </Box>
      <Button
        variant="solid"
        cs={{
          position: 'absolute',
          top: '42%',
          left: [-theme.spacing.xs, -theme.spacing.ms],
          bg: theme.color.white,
          opacity: canScrollPrev ? 1 : 0,
          transition: 'opacity 200ms',
        }}
        onClick={() => emblaApi?.scrollPrev()}
      >
        <IconChevronLeft size={20} stroke={1.5} />
      </Button>
      <Button
        variant="solid"
        cs={{
          position: 'absolute',
          top: '42%',
          right: [-theme.spacing.xs, -theme.spacing.ms],
          bg: theme.color.white,
          opacity: canScrollNext ? 1 : 0,
          transition: 'opacity 200ms',
        }}
        onClick={() => emblaApi?.scrollNext()}
      >
        <IconChevronRight size={20} stroke={1.5} />
      </Button>
    </Box>
  )
}
