import React, {FC, PropsWithChildren} from 'react'
import {Anchor, Box} from '@effortless-ui'
import {Accordion} from 'app/components/layout/componets/footer/Accordion'
import Link from 'next/link'

import {theme} from '@/app/styles'

const SecondSectionAnchor: FC<PropsWithChildren> = ({children}) => (
  <Anchor
    cs={{
      color: theme.color.gray900,
      textDecoration: 'none',
      padding: [`${theme.spacing.xxs} ${theme.spacing.xs}`, `${theme.spacing.xxs} 0`],
      mb: [4, 0],
      '&:hover': {
        textDecoration: 'underline',
      },
    }}
  >
    {children}
  </Anchor>
)

const AccordionMenu: FC = () => (
  <Accordion title="Menu">
    <Box cs={{display: 'flex', flexDirection: 'column', pr: [0, theme.spacing.xxl]}}>
      <Link href="" legacyBehavior passHref>
        <SecondSectionAnchor>Aktualności</SecondSectionAnchor>
      </Link>
      <Link href="" legacyBehavior passHref>
        <SecondSectionAnchor>Wydarzenia</SecondSectionAnchor>
      </Link>
      <Link href="" legacyBehavior passHref>
        <SecondSectionAnchor>Pracownie</SecondSectionAnchor>
      </Link>
      <Link href="" legacyBehavior passHref>
        <SecondSectionAnchor>Placówki</SecondSectionAnchor>
      </Link>
      <Link href="" legacyBehavior passHref>
        <SecondSectionAnchor>O nas</SecondSectionAnchor>
      </Link>
      <Link href="" legacyBehavior passHref>
        <SecondSectionAnchor>Kontakt</SecondSectionAnchor>
      </Link>
    </Box>
  </Accordion>
)

const AccordionDiff: FC = () => (
  <Accordion title="Inne">
    <Box cs={{display: 'flex', flexDirection: 'column'}}>
      <Link href="" legacyBehavior passHref>
        <SecondSectionAnchor>Nazwa kategorii</SecondSectionAnchor>
      </Link>
      <Link href="" legacyBehavior passHref>
        <SecondSectionAnchor>Nazwa kategorii</SecondSectionAnchor>
      </Link>
      <Link href="" legacyBehavior passHref>
        <SecondSectionAnchor>Nazwa kategorii</SecondSectionAnchor>
      </Link>
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
      pb: [theme.spacing.s, theme.spacing.m],
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
