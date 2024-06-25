import React, {FC} from 'react'
import {Anchor, Box} from '@effortless-ui'
import {IconPaperclip} from '@tabler/icons-react'

import {IApiFiles} from '@/app/features/api'
import {theme} from '@/app/styles'
import {getStrapiMediaUrl} from '@/app/utils'

interface IDetailsSectionProps {
  files: IApiFiles['data']
}

export const FilesToDownload: FC<IDetailsSectionProps> = ({files}) => {
  return (
    <Box tag="ul" composition={['semanticList']} css={{display: 'flex', flexDirection: 'column', rowGap: theme.spacing.xs}}>
      {files.map(({attributes: {name, url}}, i) => (
        <Box key={i} tag="li" cs={{display: 'flex', alignItems: 'center', columnGap: theme.spacing.xxs}}>
          <IconPaperclip color={theme.color.contentIcon} size={14} />
          <Anchor href={getStrapiMediaUrl(url)} target="_blank" cs={{color: theme.color.text}}>
            {name}
          </Anchor>
        </Box>
      ))}
    </Box>
  )
}
