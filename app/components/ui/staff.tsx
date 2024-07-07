import React, {FC} from 'react'
import {Anchor, Box, Text} from '@effortless-ui'
import {IconMail, IconPhone} from '@tabler/icons-react'
import Image from 'next/image'

import {IApiImage} from '@/app/features/api'
import {theme} from '@/app/styles'
import {getStrapiImageUrl} from '@/app/utils'

interface IStaffProps {
  email?: string
  name: string
  phone?: string
  photo: IApiImage
  title: string
  withContact: boolean
}

const iconProps = {color: theme.color.contentIcon, size: 14}

export const Staff: FC<IStaffProps> = ({
  email,
  name,
  phone,
  photo: {
    data: {attributes},
  },
  title,
  withContact,
}) => {
  return (
    <Box cs={{label: 'Staff', width: 144, textAlign: 'center'}}>
      <Box cs={{position: 'relative', height: 144, overflow: 'hidden', borderRadius: '50%'}}>
        <Image src={getStrapiImageUrl(attributes, ['medium'])} alt={title} fill sizes="100%" style={{objectFit: 'cover'}} />
      </Box>
      <Text cs={{mt: theme.spacing.ms, mb: theme.spacing.xs}}>{name}</Text>
      <Text cs={{fontWeight: 300}}>{title}</Text>
      {withContact && (
        <>
          {phone && (
            <Text cs={{mt: theme.spacing.xxs, fontWeight: 300}}>
              <IconPhone {...iconProps} /> {phone}
            </Text>
          )}
          {email && (
            <Text cs={{mt: theme.spacing.xxs, fontWeight: 300}}>
              <IconMail {...iconProps} /> <Anchor href={`mailto:${email}`}>{email}</Anchor>
            </Text>
          )}
        </>
      )}
    </Box>
  )
}
