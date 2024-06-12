import React, {FC} from 'react'
import {Anchor, Box, Button, Text} from '@effortless-ui'
import Link from 'next/link'

import Logo from '@/app/assets/logo.svg'
import {theme} from '@/app/styles'

export const LogoSection: FC = () => (
  <Box tag="div" cs={{height: '64px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
    <Box
      cs={{
        label: 'Footer-image',
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
      <Button
        onClick={() => document.body.scrollIntoView({behavior: 'smooth'})}
        cs={{fontSize: theme.font.size.small, color: theme.color.primary, border: 'none', textDecoration: 'underline', cursor: 'pointer'}}
      >
        Wróć do góry
      </Button>
      {/* <Link href="/" legacyBehavior passHref>
        <Anchor cs={{color: theme.color.primary, fontSize: theme.font.size.small}}>Wróć do góry</Anchor>
      </Link> */}
    </Text>
  </Box>
)
