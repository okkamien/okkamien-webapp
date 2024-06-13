import React, {FC} from 'react'
import {Box, Button, Text} from '@effortless-ui'
import Image from 'next/image'

import {siteName} from '@/app/dictionaries/site.dictionary'
import {theme} from '@/app/styles'

export const LogoSection: FC = () => (
  <Box cs={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
    <Box
      cs={{
        label: 'Footer-image',
        width: [120, 168],
        py: [theme.spacing.xxs, theme.spacing.s],
      }}
    >
      <Image src="/logo.svg" width={168} height={40} alt={siteName} sizes="100%" />
    </Box>
    <Text cs={{display: ['none', 'block']}}>
      <Button
        onClick={() => document.body.scrollIntoView({behavior: 'smooth'})}
        cs={{fontSize: theme.font.size.small, color: theme.color.primary, border: 'none', textDecoration: 'underline', cursor: 'pointer'}}
      >
        Wróć do góry
      </Button>
    </Text>
  </Box>
)
