import React, {FC, Fragment} from 'react'
import {Box, Button, CSObject, Grid, Text} from '@effortless-ui'
import {IconCalendar, IconChevronsDown, IconClock, IconMapPin} from '@tabler/icons-react'
import dayjs from 'dayjs'

import {TApiDetailsSection} from '@/app/features/api'
import {theme} from '@/app/styles'
import {getFormattedDateRange} from '@/app/utils'

interface IDetailsSectionProps {
  blocks: TApiDetailsSection[]
}

const titleMap: {[key in TApiDetailsSection['__component']]: string} = {
  'details-block.sign-up-anchor': 'Zapisy',
  'details-block.where': 'Gdzie',
  'details-block.when': 'Kiedy',
}

const blockListItemStyles: CSObject = {
  display: 'flex',
  columnGap: theme.spacing.xxs,
}
const iconProps = {color: theme.color.contentIcon, size: 14, css: {marginTop: 2}}

export const DetailsSection: FC<IDetailsSectionProps> = ({blocks}) => {
  return (
    <Grid
      cols={[3]}
      cs={{
        label: 'Details-section',
        columnGap: theme.spacing.xxxxxl,
        p: theme.spacing.ml,
        bg: theme.color.white,
        borderRadius: theme.radii.m,
      }}
    >
      {blocks.map((block, i) => (
        <Box key={i}>
          <Text tag="h2" variant="h5" cs={{mb: theme.spacing.ms, fontWeight: 300, fontStyle: 'italic'}}>
            {titleMap[block.__component]}
          </Text>
          <Box tag="ul" composition={['semanticList']} css={{display: 'flex', flexDirection: 'column', rowGap: theme.spacing.xs}}>
            {block.__component === 'details-block.when' && (
              <Box tag="li" cs={blockListItemStyles}>
                <IconCalendar {...iconProps} /> {getFormattedDateRange(dayjs(block.from), dayjs(block.to))}
              </Box>
            )}
            {block.__component === 'details-block.when' && block.time && (
              <Box tag="li" cs={blockListItemStyles}>
                <IconClock {...iconProps} /> {block.time.split(':', 2).join(':')}
              </Box>
            )}
            {block.__component === 'details-block.where' && (
              <Box tag="li" cs={blockListItemStyles}>
                <IconMapPin {...iconProps} />{' '}
                <Box>
                  {block.location.data.attributes.name}
                  {block.location.data.attributes.address && (
                    <Text tag="address" cs={{mt: theme.spacing.xxs, fontStyle: 'normal'}}>
                      {block.location.data.attributes.address.split('\n').map((text, j) => (
                        <Fragment key={j}>
                          {text}
                          <br />
                        </Fragment>
                      ))}
                    </Text>
                  )}
                </Box>
              </Box>
            )}
            {block.__component === 'details-block.sign-up-anchor' && (
              <Box tag="li" cs={blockListItemStyles}>
                <Button
                  variant="text"
                  cs={{display: 'flex', alignItems: 'center', textAlign: 'left'}}
                  onClick={() => document.querySelector('#news-event-section')?.scrollIntoView({behavior: 'smooth'})}
                >
                  {block.label}
                  <IconChevronsDown size={22} stroke={1.5} css={{flexShrink: 0}} />
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      ))}
    </Grid>
  )
}
