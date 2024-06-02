import {FC} from 'react'
import {Box, Text} from '@effortless-ui'
import {IconBrandFacebook} from '@tabler/icons-react'
import {SecondSection} from 'app/components/layout/componets/footer/SecondSection'
import Link from 'next/link'

import {theme} from '@/app/styles'

const FirstSection: FC = () => (
  <Box
    cs={{
      mr: [theme.spacing.s, 0],
      pr: [0, 52],
      pb: theme.spacing.m,
      maxWidth: ['unset', 300],
      flexGrow: 1,
      borderBottom: [theme.border.default, 0],
      borderRight: [0, theme.border.default],
      minWidth: [0, '235px'],
    }}
  >
    <Box cs={{label: 'Footer-links-section', width: '200px'}}>
      <Text cs={{color: theme.color.brand400, pb: theme.spacing.xs, fontSize: theme.font.size.base}}>Gdzie nas znajdziesz</Text>
      <Text tag="p" css={{color: theme.color.gray900}}>
        Miejsko-Gminny Ośrodek Kultury w Kamieniu Krajeńskim
      </Text>
      <Text tag="p" css={{color: theme.color.gray900}}>
        ul. Sępoleńska 4
      </Text>
      <Text tag="p" css={{color: theme.color.gray900}}>
        89-430 Kamień Krajeński
      </Text>
    </Box>
    <Box cs={{label: 'Footer-links-section', width: '240px', pt: [theme.spacing.ms, theme.spacing.xxl]}}>
      <Text cs={{color: theme.color.brand400, pb: theme.spacing.xs, fontSize: theme.font.size.base}}>Skontaktuj się z nami</Text>
      <Text
        tag="p"
        css={{paddingBottom: theme.spacing.xxs, color: theme.color.gray900, fontSize: [theme.font.size.small, theme.font.size.base]}}
      >
        Tel. (0-52) 3 88 60 68
      </Text>
      <Text tag="p" css={{color: theme.color.gray900, fontSize: [theme.font.size.small, theme.font.size.base]}}>
        E-mail:{' '}
        <Link
          href="mailto:mgok.kamienkraj@wp.pl"
          legacyBehavior
          passHref
          css={{color: theme.color.gray900, fontSize: [theme.font.size.small, theme.font.size.base]}}
        >
          mgok.kamienkraj@wp.pl
        </Link>
      </Text>
    </Box>
  </Box>
)

const LastSection: FC = () => (
  <Box
    cs={{
      mr: [theme.spacing.s, 0],
      pl: [0, 52],
      pt: [theme.spacing.m, 0],
      pb: theme.spacing.m,
      minWidth: [0, '235px'],
    }}
  >
    <Text cs={{color: theme.color.brand400, pb: theme.spacing.xs, fontSize: theme.font.size.base}}>M-GOK w sieci</Text>
    <Link href="https://www.facebook.com/mgok.kamien.kr">
      <IconBrandFacebook color={theme.color.primary} size={24} />
    </Link>
  </Box>
)

export const LinksSection: FC = () => (
  <Box tag="div" cs={{label: 'Footer-links-section', display: ['block', 'flex'], pt: [0, theme.spacing.l]}}>
    <FirstSection key="first-section" />
    <SecondSection key="second-section" />
    <LastSection key="last-section" />
  </Box>
)
