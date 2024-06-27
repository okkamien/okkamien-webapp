import React, {FC} from 'react'
import {Box, Text} from '@effortless-ui'
import {BlocksContent, BlocksRenderer} from '@strapi/blocks-react-renderer'

import {effortlessTheme, theme} from '@/app/styles'

interface ITextContentProps {
  content: BlocksContent
  title: string
}

export const TextContent: FC<ITextContentProps> = ({content, title}) => {
  return (
    <Box cs={{label: 'Text-content'}}>
      <Text tag="h2" cs={{mb: theme.spacing.l, fontWeight: 300, fontStyle: 'italic'}}>
        {title}
      </Text>
      <Box
        cs={{
          label: 'Text-content',
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
    </Box>
  )
}
