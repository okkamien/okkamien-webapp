import React, {FC, Fragment, ReactNode} from 'react'
import {Anchor, Box, Button, Grid, Text} from '@effortless-ui'
import {IconCalendar, IconChevronsDown, IconClock, IconMail, IconMapPin, IconPhone} from '@tabler/icons-react'
import dayjs from 'dayjs'

import {TApiDynamicZoneDetailsSection} from '@/app/components/content'
import {theme} from '@/app/styles'
import {getFormattedDateRange} from '@/app/utils'

type IDetailsSectionProps = TApiDynamicZoneDetailsSection

interface IDetailsSectionBlockProps {
  title: string
  list: ReactNode[]
}

const iconProps = {color: theme.color.contentIcon, size: 14, css: {flexShrink: 0, marginTop: 2}}

export const DetailsSectionBlock: FC<IDetailsSectionBlockProps> = ({list, title}) => {
  return (
    <Box
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
        {title}
      </Text>
      <Box tag="ul" composition={['semanticList']} css={{display: 'flex', flexDirection: 'column', rowGap: theme.spacing.xs}}>
        {list.map((item, i) => (
          <Box key={i} tag="li" cs={{display: 'flex', columnGap: theme.spacing.xxs}}>
            {item}
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export const DetailsSection: FC<IDetailsSectionProps> = ({anchor, contact, when, where}) => {
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
      {anchor && (
        <DetailsSectionBlock
          title="Zapisy"
          list={[
            <Button
              key={1}
              variant="text"
              cs={{display: 'flex', alignItems: 'center', textAlign: 'left'}}
              onClick={() => document.querySelector('#news-event-section')?.scrollIntoView({behavior: 'smooth'})}
            >
              {anchor.label}
              <IconChevronsDown size={22} stroke={1.5} css={{flexShrink: 0}} />
            </Button>,
          ]}
        />
      )}
      {contact && (
        <DetailsSectionBlock
          title="Zapisy"
          list={[
            <Fragment key={1}>
              <IconPhone {...iconProps} /> {contact.phone}
            </Fragment>,
            <Fragment key={2}>
              <IconMail {...iconProps} /> <Anchor href={`mailto:${contact.email}`}>{contact.email}</Anchor>
            </Fragment>,
          ]}
        />
      )}
      {when && (
        <DetailsSectionBlock
          title="Kiedy"
          list={[
            <Fragment key={1}>
              <IconCalendar {...iconProps} /> {getFormattedDateRange(dayjs(when.from), dayjs(when.to))}
            </Fragment>,
            <Fragment key={2}>
              <IconClock {...iconProps} /> {when.time.split(':', 2).join(':')}
            </Fragment>,
          ]}
        />
      )}
      {where && (
        <DetailsSectionBlock
          title="Gdzie"
          list={[
            <Fragment key={1}>
              <IconMapPin {...iconProps} />{' '}
              <Box>
                {where.location.data.attributes.name}
                {where.location.data.attributes.address && (
                  <Text tag="address" cs={{mt: theme.spacing.xxs, fontStyle: 'normal'}}>
                    {where.location.data.attributes.address.split('\n').map((text, j) => (
                      <Fragment key={j}>
                        {text}
                        <br />
                      </Fragment>
                    ))}
                  </Text>
                )}
              </Box>
            </Fragment>,
          ]}
        />
      )}
    </Grid>
  )
}
