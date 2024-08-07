import React, {FC} from 'react'
import {Box, Text} from '@effortless-ui'
import {Dayjs} from 'dayjs'

import {Btn, SplitTitle, Tag} from '@/app/components/ui'
import {theme} from '@/app/styles'
import {getFormattedDateRange} from '@/app/utils'

export interface ICoverItemProps {
  button?: string
  date?: Dayjs | [Dayjs, Dayjs]
  image?: string
  link: string
  tags?: string[]
  teaser?: string
  title: string | [string, string]
}

export const CoverItem: FC<ICoverItemProps> = ({date, link, tags, teaser, title}) => {
  return (
    <Box
      cs={{
        label: 'cover-event-detail',
        display: 'flex',
        flexDirection: 'column',
        height: 'auto',
        py: theme.spacing.ml,
        pl: -theme.spacing.ml,
        zIndex: 10,
      }}
    >
      {tags?.length && (
        <Box tag="ul" composition={['semanticList']} cs={{display: 'flex', flexWrap: 'wrap', gap: theme.spacing.s, mb: theme.spacing.m}}>
          {tags.map((tag, i) => (
            <Box key={i} tag="li">
              <Tag>{tag}</Tag>
            </Box>
          ))}
        </Box>
      )}
      <Box tag="ul" composition={['semanticList']} cs={{display: 'flex', flexWrap: 'wrap', gap: theme.spacing.s, mb: theme.spacing.m}}>
        <Box key={123} tag="li">
          <Tag>Tag</Tag>
        </Box>
      </Box>
      {date && (
        <Text tag="span" cs={{mb: theme.spacing.xxs, color: theme.color.white}}>
          {Array.isArray(date) ? getFormattedDateRange(...date) : date.format('DD/MM/YYYY')}
        </Text>
      )}
      <Text tag="h2" cs={{color: theme.color.white}}>
        <SplitTitle title={title} />
      </Text>
      {teaser && (
        <Text
          cs={{
            mt: theme.spacing.s,
            fontWeight: 300,
            color: theme.color.white,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: 450,
            pr: theme.gap,
          }}
        >
          {teaser}
        </Text>
      )}
      {link && (
        <Btn link={link} light cs={{width: 190, mt: [theme.spacing.l, theme.spacing.ms]}}>
          Dowiedz się więcej
        </Btn>
      )}
    </Box>
  )
}
