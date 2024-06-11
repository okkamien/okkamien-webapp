import {FC} from 'react'
import {Anchor, Box, Text} from '@effortless-ui'
import {IconBrandFacebook, IconBrandInstagram} from '@tabler/icons-react'
import {SecondSection} from 'app/components/layout/componets/footer/SecondSection'
import Link from 'next/link'

import {siteExternalLinks} from '@/app/dictionaries/site.dictionary'
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
      <Text tag="p" cs={{color: theme.color.inactive, fontWeight: 300}}>
        Miejsko-Gminny Ośrodek Kultury w Kamieniu Krajeńskim
      </Text>
      <Text tag="p" cs={{color: theme.color.inactive, fontWeight: 300}}>
        ul. Sępoleńska 4
      </Text>
      <Text tag="p" cs={{color: theme.color.inactive, fontWeight: 300}}>
        89-430 Kamień Krajeński
      </Text>
    </Box>
    <Box cs={{label: 'Footer-links-section', width: '240px', pt: [theme.spacing.ms, theme.spacing.xxl]}}>
      <Text cs={{color: theme.color.brand400, pb: theme.spacing.xs, fontSize: theme.font.size.base}}>Skontaktuj się z nami</Text>
      <Text
        tag="p"
        cs={{
          paddingBottom: theme.spacing.xxs,
          color: theme.color.gray900,
          fontSize: [theme.font.size.small, theme.font.size.base],
          fontWeight: 300,
        }}
      >
        Tel. (0-52) 3 88 60 68
      </Text>
      <Text tag="p" cs={{color: theme.color.gray900, fontSize: [theme.font.size.small, theme.font.size.base], fontWeight: 300}}>
        E-mail:{' '}
        <Link href="mailto:mgok.kamienkraj@wp.pl" legacyBehavior passHref>
          <Anchor cs={{color: theme.color.gray900, fontSize: [theme.font.size.small, theme.font.size.base]}}>mgok.kamienkraj@wp.pl</Anchor>
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
    <Box tag="ul" composition={['semanticList']} cs={{display: 'flex'}}>
      <Box tag="li" cs={{pr: theme.spacing.xs}}>
        <Link href={siteExternalLinks.instagram}>
          <IconBrandInstagram color={theme.color.primary} size={24} />
        </Link>
      </Box>
      <Box tag="li">
        <Link href={siteExternalLinks.facebook}>
          <IconBrandFacebook color={theme.color.primary} size={24} />
        </Link>
      </Box>
    </Box>
  </Box>
)

export const LinksSection: FC = () => (
  <Box tag="div" cs={{label: 'Footer-links-section', display: ['block', 'flex'], pt: [0, theme.spacing.l]}}>
    <FirstSection key="first-section" />
    <SecondSection key="second-section" />
    <LastSection key="last-section" />
  </Box>
)
