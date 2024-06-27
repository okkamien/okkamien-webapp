import {FC, PropsWithChildren} from 'react'
import {Anchor, Box, Grid, Text} from '@effortless-ui'
import {IconBrandFacebook, IconBrandInstagram} from '@tabler/icons-react'
import Link from 'next/link'

import {Accordion} from '@/app/components/ui'
import {footerAnotherLinks, navigationLinks, siteExternalLinks} from '@/app/dictionaries/site.dictionary'
import {theme} from '@/app/styles'

export const FooterLinksSectionHeading: FC<PropsWithChildren> = ({children}) => {
  return (
    <Text tag="h3" variant="h6" cs={{color: theme.color.primary, mb: theme.spacing.xs, fontSize: theme.font.size.base}}>
      {children}
    </Text>
  )
}

export const LinksSection: FC = () => (
  <Grid
    cs={{
      label: 'Footer-links',
      position: 'relative',
      gridTemplateColumns: ['100%', '100%', '188px 400px 188px', '220px 472px 220px'],
      rowGap: theme.spacing.xl,
      justifyContent: 'space-between',
      mt: [theme.spacing.m, theme.spacing.l],
    }}
  >
    <Box
      cs={{
        position: ['relative', 'relative', 'static'],
        display: 'flex',
        flexDirection: ['column', 'row', 'column'],
        rowGap: [theme.spacing.ms, theme.spacing.xl],
        columnGap: theme.gap,
        '&::after': {
          content: '""',
          position: 'absolute',
          left: [0, 0, 'calc(220px + (100% - 220px - 472px - 220px) / 4)'],
          bottom: [-theme.spacing.m, -theme.spacing.m, 0],
          height: [1, 1, '100%'],
          width: ['100%', '100%', 1],
          bg: theme.color.border,
        },
      }}
    >
      <Box cs={{width: '100%'}}>
        <FooterLinksSectionHeading>Gdzie nas znajdziesz</FooterLinksSectionHeading>
        <Text tag="address" cs={{fontWeight: 300, fontStyle: 'normal'}}>
          Miejsko-Gminny Ośrodek
          <br />
          Kultury w Kamieniu Krajeńskim
          <br />
          ul. Sępoleńska 4<br />
          89-430 Kamień Krajeński
        </Text>
      </Box>
      <Box cs={{width: '100%'}}>
        <FooterLinksSectionHeading>Skontaktuj się z nami</FooterLinksSectionHeading>
        <Text cs={{fontWeight: 300}}>Tel. (0-52) 3 88 60 68</Text>
        <Text cs={{mt: theme.spacing.xxs, fontWeight: 300}}>
          E-mail:{' '}
          <Anchor href="mailto:mgok.kamienkraj@wp.pl" cs={{color: theme.color.text}}>
            mgok.kamienkraj@wp.pl
          </Anchor>
        </Text>
      </Box>
    </Box>
    <Box
      cs={{
        position: ['relative', 'relative', 'static'],
        display: 'flex',
        columnGap: theme.gap,
        rowGap: theme.spacing.s,
        flexDirection: ['column', 'row'],
        '&::after': {
          content: '""',
          position: 'absolute',
          right: [0, 0, 'calc(220px + (100% - 220px - 472px - 220px) / 4)'],
          bottom: [-theme.spacing.m, -theme.spacing.m, 0],
          height: [1, 1, '100%'],
          width: ['100%', '100%', 1],
          bg: theme.color.border,
        },
      }}
    >
      <Box cs={{width: '100%'}}>
        <Accordion title={<FooterLinksSectionHeading>Menu</FooterLinksSectionHeading>}>
          <Box
            tag="ul"
            composition={['semanticList']}
            cs={{display: 'flex', flexDirection: 'column', rowGap: theme.spacing.xs, pl: [theme.spacing.xs, 0]}}
          >
            {navigationLinks.map(({label, link}, i) => (
              <Box tag="li" key={i} cs={{}}>
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
      <Box cs={{width: '100%'}}>
        <Accordion title={<FooterLinksSectionHeading>Inne</FooterLinksSectionHeading>}>
          <Box
            tag="ul"
            composition={['semanticList']}
            cs={{display: 'flex', flexDirection: 'column', rowGap: theme.spacing.xs, pl: [theme.spacing.xs, 0]}}
          >
            {footerAnotherLinks.map(({label, link}, i) => (
              <Box tag="li" key={i} cs={{}}>
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
    <Box>
      <FooterLinksSectionHeading>M-GOK w sieci</FooterLinksSectionHeading>
      <Box tag="ul" composition={['semanticList']} cs={{display: 'flex', columnGap: theme.spacing.xs}}>
        <Box tag="li">
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
  </Grid>
)
