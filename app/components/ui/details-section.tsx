import React, {FC, Fragment} from 'react'
import {Anchor, Box, Button, CSObject, Grid, Text} from '@effortless-ui'
import {IconCalendar, IconChevronsDown, IconClock, IconMail, IconMapPin, IconPhone} from '@tabler/icons-react'
import dayjs from 'dayjs'

import {TApiDetailsSection} from '@/app/features/api'
import {theme} from '@/app/styles'
import {getFormattedDateRange} from '@/app/utils'

interface IDetailsSectionProps {
  blocks: TApiDetailsSection[]
}

const titleMap: {[key in TApiDetailsSection['__component']]: string} = {
  'details-block.sign-up-anchor': 'Zapisy',
  'details-block.sign-up-contact': 'Zapisy',
  'details-block.when': 'Kiedy',
  'details-block.where': 'Gdzie',
}

const blockListItemStyles: CSObject = {
  display: 'flex',
  columnGap: theme.spacing.xxs,
}
const iconProps = {color: theme.color.contentIcon, size: 14, css: {flexShrink: 0, marginTop: 2}}

export const DetailsSection: FC<IDetailsSectionProps> = ({blocks}) => {
  return (
    <Grid
      cols={[1, 3]}
      cs={{
        label: 'Details-section',
        columnGap: [theme.spacing.l, theme.spacing.l, theme.spacing.xxxl, theme.spacing.xxxxxl],
        rowGap: theme.spacing.l,
        px: [theme.spacing.ml, theme.spacing.l],
        py: theme.spacing.ml,
        bg: theme.color.white,
        borderRadius: theme.radii.m,
      }}
    >
      {blocks.map((block, i) => (
        <Box
          key={i}
          cs={{
            position: 'relative',
            '&:not(:first-of-type)::before': {
              content: '""',
              position: 'absolute',
              width: ['100%', 1],
              height: [1, '100%'],
              top: [-theme.spacing.l / 2, 0],
              left: [0, -theme.spacing.l / 2, -theme.spacing.xxxl / 2, -theme.spacing.xxxxxl / 2],
              bg: theme.color.border,
            },
          }}
        >
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
            {block.__component === 'details-block.sign-up-contact' && block.phone && (
              <Box tag="li" cs={blockListItemStyles}>
                <IconPhone {...iconProps} /> {block.phone}
              </Box>
            )}
            {block.__component === 'details-block.sign-up-contact' && block.email && (
              <Box tag="li" cs={blockListItemStyles}>
                <IconMail {...iconProps} /> <Anchor href={`mailto:${block.email}`}>{block.email}</Anchor>
              </Box>
            )}
          </Box>
        </Box>
      ))}
    </Grid>
  )
}
