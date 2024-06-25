import React, {FC, ReactNode, useState} from 'react'
import {Box, Button, PropsWithCS} from '@effortless-ui'
import {IconChevronLeft, IconChevronRight} from '@tabler/icons-react'
import useEmblaCarousel from 'embla-carousel-react'

import {theme} from '@/app/styles'

interface ITilesSliderProps extends PropsWithCS {
  tiles: ReactNode[]
}

export const TilesSlider: FC<ITilesSliderProps> = ({cs, tiles}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: false,
    slidesToScroll: 2,
  })

  const [canScrollPrev, setCanScrollPrev] = useState<boolean>(false)
  const [canScrollNext, setCanScrollNext] = useState<boolean>(true)

  const updateSliderUI = () => {
    if (emblaApi) {
      setCanScrollPrev(emblaApi.canScrollPrev())
      setCanScrollNext(emblaApi.canScrollNext() && tiles.length > 2)
    }
  }

  emblaApi?.on('select', () => updateSliderUI())

  return (
    <Box cs={{position: 'relative'}}>
      <Box ref={emblaRef} cs={{overflow: 'hidden', ...cs}}>
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
            <Box key={i} tag="li" cs={{flex: `0 0 ${100 / 2}%`, pl: theme.gap}}>
              {tile}
            </Box>
          ))}
        </Box>
      </Box>
      <Button
        variant="paginationArrow"
        cs={{
          position: 'absolute',
          top: '42%',
          left: -theme.spacing.ms,
          bg: theme.color.white,
          opacity: canScrollPrev ? 1 : 0,
          transition: 'opacity 200ms',
        }}
        onClick={() => emblaApi?.scrollPrev()}
      >
        <IconChevronLeft size={20} stroke={1.5} />
      </Button>
      <Button
        variant="paginationArrow"
        cs={{
          position: 'absolute',
          top: '42%',
          right: -theme.spacing.ms,
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
