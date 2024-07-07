import React, {FC} from 'react'
import {Box, Text} from '@effortless-ui'
import Image from 'next/image'

import {IApiImage} from '@/app/features/api'
import {theme} from '@/app/styles'
import {getStrapiImageUrl} from '@/app/utils'

interface IStaffProps {
  name: string
  photo: IApiImage
  title: string
}

export const Staff: FC<IStaffProps> = ({
  name,
  photo: {
    data: {attributes},
  },
  title,
}) => {
  return (
    <Box cs={{label: 'Staff', width: 144, textAlign: 'center'}}>
      <Box cs={{position: 'relative', height: 144, overflow: 'hidden', borderRadius: '50%'}}>
        <Image src={getStrapiImageUrl(attributes, ['medium'])} alt={title} fill sizes="100%" style={{objectFit: 'cover'}} />
      </Box>
      <Text cs={{mt: theme.spacing.ms, mb: theme.spacing.xs}}>{name}</Text>
      <Text cs={{fontWeight: 300}}>{title}</Text>
    </Box>
  )
}
