import React, {FC} from 'react'
import {Anchor, Box, Text} from '@effortless-ui'
import Link from 'next/link'

import Logo from '@/app/assets/logo.svg'
import {theme} from '@/app/styles'

export const LogoSection: FC = () => (
  <Box tag="div" cs={{height: '64px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
    <Box
      cs={{
        label: 'Tile-image',
        position: 'relative',
        width: [128, 168],
        height: [32, 63],
        mx: -1,
        mt: -1,
        overflow: 'hidden',
      }}
    >
      <Logo />
    </Box>
    <Text cs={{display: ['none', 'block']}}>
      <Link href="/" legacyBehavior passHref>
        <Anchor cs={{color: '#1B1B1B', fontSize: theme.font.size.small}}>Wróć do góry</Anchor>
      </Link>
    </Text>
  </Box>
)
