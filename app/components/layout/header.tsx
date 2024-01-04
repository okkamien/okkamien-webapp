import React, {FC} from 'react'
import {Box, Text} from '@effortless-ui'

import {theme} from '@/app/styles'

export const Header: FC = () => (
  <Box tag="header" cs={{py: theme.spacing.base}}>
    <Text tag="h1">Miejsko-Gminny Ośrodek Kultury w Kamieniu Krajeńskim </Text>
  </Box>
)
