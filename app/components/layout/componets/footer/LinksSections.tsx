import {FC} from 'react'
import {Anchor, Box, Text} from '@effortless-ui'
import {IconBrandFacebook, IconBrandInstagram} from '@tabler/icons-react'
import Link from 'next/link'

import {Accordion} from '@/app/components/ui'
import {navigationAnotherLinks, navigationLinks, siteExternalLinks} from '@/app/dictionaries/site.dictionary'
import {theme} from '@/app/styles'

export const LinksSection: FC = () => (
  <Box tag="div" cs={{label: 'Footer-links-section', display: ['block', 'flex'], pt: [0, theme.spacing.l]}}>
    <Box
      cs={{
        label: 'footer-about-as-section',
        mr: [theme.spacing.s, 0],
        pr: [0, 52],
        pb: theme.spacing.m,
        maxWidth: ['none', 300],
        flexGrow: 1,
        borderBottom: [theme.border.default, 0],
        borderRight: [0, theme.border.default],
        minWidth: [0, '235px'],
      }}
    >
      <Box cs={{label: 'Footer-links-section', width: '200px'}}>
        <Text tag="h3" variant="h6" cs={{color: theme.color.brand400, pb: theme.spacing.xs, fontSize: theme.font.size.base}}>
          Gdzie nas znajdziesz
        </Text>
        <Text tag="address" cs={{color: theme.color.inactive, fontWeight: 300, fontStyle: 'normal'}}>
          Miejsko-Gminny Ośrodek Kultury w Kamieniu Krajeńskim
          <br />
          ul. Sępoleńska 4<br />
          89-430 Kamień Krajeński
        </Text>
      </Box>
      <Box cs={{label: 'Footer-links-section', width: '240px', pt: [theme.spacing.ms, theme.spacing.xxl]}}>
        <Text tag="h3" variant="h6" cs={{color: theme.color.brand400, pb: theme.spacing.xs, fontSize: theme.font.size.base}}>
          Skontaktuj się z nami
        </Text>
        <Text
          cs={{
            pb: theme.spacing.xxs,
            color: theme.color.gray900,
            fontSize: [theme.font.size.small, theme.font.size.base],
            fontWeight: 300,
          }}
        >
          Tel. (0-52) 3 88 60 68
        </Text>
        <Text cs={{color: theme.color.gray900, fontSize: [theme.font.size.small, theme.font.size.base], fontWeight: 300}}>
          E-mail:{' '}
          <Link href="mailto:mgok.kamienkraj@wp.pl" legacyBehavior passHref>
            <Anchor cs={{color: theme.color.gray900, fontSize: [theme.font.size.small, theme.font.size.base]}}>
              mgok.kamienkraj@wp.pl
            </Anchor>
          </Link>
        </Text>
      </Box>
    </Box>
    <Box
      tag="div"
      cs={{
        label: 'footer-accordions',
        display: 'flex',
        flexDirection: ['column', 'row'],
        flexGrow: 1,
        pt: [theme.spacing.m, 0],
        maxWidth: 430,
        pr: [0, 52],
        pl: [0, 52],
        pb: [theme.spacing.ms, theme.spacing.m],
        borderBottom: [theme.border.default, 0],
        borderRight: [0, theme.border.default],
        minWidth: [0, '350px'],
      }}
    >
      <Box cs={{label: 'footer-accordion-menu', pb: [theme.spacing.s, theme.spacing.m]}}>
        <Accordion title="Menu">
          <Box tag="ul" composition={['semanticList']} cs={{display: 'flex', flexDirection: 'column', pr: [0, theme.spacing.xxl]}}>
            {navigationLinks.map(({label, link}, i) => (
              <Box tag="li" key={i} cs={{px: theme.spacing.xxs, py: [theme.spacing.xs, 0], mb: [4, 0]}}>
                <Link href={link} legacyBehavior passHref>
                  <Anchor
                    cs={{
                      color: theme.color.text,
                      textDecoration: 'none',
                      fontWeight: 300,
                      '&:hover': {
                        textDecoration: 'underline',
                        color: theme.color.text,
                      },
                    }}
                  >
                    {label}
                  </Anchor>
                </Link>
              </Box>
            ))}
          </Box>
        </Accordion>
      </Box>
      <Box cs={{label: 'footer-acordion-diff', pl: [0, theme.spacing.xl]}}>
        <Accordion title="Inne">
          <Box tag="ul" composition={['semanticList']} cs={{display: 'flex', flexDirection: 'column'}}>
            {navigationAnotherLinks.map(({label, link}, i) => (
              <Box
                tag="li"
                key={i}
                cs={{padding: [`${theme.spacing.xxs}px ${theme.spacing.xs}px`, `${theme.spacing.xxs}px 0`], mb: [4, 0]}}
              >
                <Link href={link} legacyBehavior passHref>
                  <Anchor
                    cs={{
                      color: theme.color.text,
                      textDecoration: 'none',
                      fontWeight: 300,
                      '&:hover': {
                        textDecoration: 'underline',
                        color: theme.color.text,
                      },
                    }}
                  >
                    {label}
                  </Anchor>
                </Link>
              </Box>
            ))}
          </Box>
        </Accordion>
      </Box>
    </Box>
    <Box
      cs={{
        label: 'footer-socials-section',
        mr: [theme.spacing.s, 0],
        pl: [0, 52],
        pt: [theme.spacing.m, 0],
        pb: theme.spacing.m,
        minWidth: [0, '235px'],
      }}
    >
      <Text tag="h3" variant="h6" cs={{color: theme.color.brand400, pb: theme.spacing.xs, fontSize: theme.font.size.base}}>
        M-GOK w sieci
      </Text>
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
  </Box>
)
