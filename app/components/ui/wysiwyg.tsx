import React, {FC} from 'react'
import {Box} from '@effortless-ui'
import {BlocksContent, BlocksRenderer} from '@strapi/blocks-react-renderer'

import {effortlessTheme, theme} from '@/app/styles'

interface ITextContentProps {
  content: BlocksContent
}

export const Wysiwyg: FC<ITextContentProps> = ({content}) => {
  return (
    <Box
      cs={{
        label: 'Wysiwyg',
        display: 'flex',
        flexDirection: 'column',
        rowGap: theme.spacing.ms,
        h1: effortlessTheme.tags?.Text?.h1,
        h2: effortlessTheme.tags?.Text?.h2,
        h3: effortlessTheme.tags?.Text?.h3,
        h4: effortlessTheme.tags?.Text?.h4,
        h5: effortlessTheme.tags?.Text?.h5,
        h6: effortlessTheme.tags?.Text?.h6,
        'ul, ol': {
          m: 0,
          pl: theme.spacing.m,
        },
      }}
    >
      <BlocksRenderer content={content} />
    </Box>
  )
}
