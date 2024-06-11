import React, {FC} from 'react'
import {Anchor, Box} from '@effortless-ui'
import {Accordion} from 'app/components/layout/componets/footer/Accordion'
import Link from 'next/link'

import {navigationAnotherLinks, navigationLinks} from '@/app/dictionaries/site.dictionary'
import {theme} from '@/app/styles'

const AccordionMenu: FC = () => (
  <Accordion title="Menu">
    <Box tag="ul" composition={['semanticList']} cs={{display: 'flex', flexDirection: 'column', pr: [0, theme.spacing.xxl]}}>
      {navigationLinks.map(({label, link}, i) => (
        <Box tag="li" key={i} cs={{padding: [`${theme.spacing.xxs}px ${theme.spacing.xs}px`, `${theme.spacing.xxs}px 0`], mb: [4, 0]}}>
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
)

const AccordionDiff: FC = () => (
  <Accordion title="Inne">
    <Box tag="ul" composition={['semanticList']} cs={{display: 'flex', flexDirection: 'column'}}>
      {navigationAnotherLinks.map(({label, link}, i) => (
        <Box tag="li" key={i} cs={{padding: [`${theme.spacing.xxs}px ${theme.spacing.xs}px`, `${theme.spacing.xxs}px 0`], mb: [4, 0]}}>
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
)

export const SecondSection: FC = () => (
  <Box
    tag="div"
    cs={{
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
    <Box cs={{pb: [theme.spacing.s, theme.spacing.m]}}>
      <AccordionMenu />
    </Box>
    <Box cs={{pl: [0, theme.spacing.xl]}}>
      <AccordionDiff />
    </Box>
  </Box>
)
