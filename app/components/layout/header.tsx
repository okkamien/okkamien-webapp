import React, {FC, useEffect, useState} from 'react'
import {Anchor, Box} from '@effortless-ui'
import {IconChevronRight, IconMenu2, IconX} from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'

import {Container} from '@/app/components/ui'
import {navigationLinks, navigationSocials, siteMap, siteName} from '@/app/dictionaries/site.dictionary'
import {useOutsideElementClickHandler} from '@/app/hooks/use-outside-element-click-handler'
import {theme} from '@/app/styles'
import {rgba} from '@/app/utils'

export const Header: FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const ref = useOutsideElementClickHandler(() => setIsMenuOpen(false))

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Box
      tag="header"
      cs={{
        position: 'fixed',
        top: 0,
        width: '100%',
        py: [theme.spacing.ml, theme.spacing.s],
        bg: isScrolled ? theme.color.white : 'transparent',
        boxShadow: isScrolled ? `0 2px 25px ${rgba(theme.color.text, 0.15)}` : 'none',
        zIndex: 5,
        transition: 'background-color 200ms, box-shadow 200ms',
      }}
    >
      <Container>
        <Box cs={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <Link href={siteMap.homepage} legacyBehavior passHref>
            <Anchor cs={{width: [120, 180]}}>
              <Image src={isScrolled ? '/Logo-color-b.svg' : '/Logo-monowhite-b.svg'} width={180} height={40} alt={siteName} sizes="100%" />
            </Anchor>
          </Link>
          <Box
            cs={{display: ['flex', 'flex', 'none'], justifyContent: 'center', alignItems: 'center', zIndex: 4}}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <IconMenu2 css={{color: isScrolled ? theme.color.black : theme.color.white}} />
          </Box>
          <Box
            cs={{
              position: ['fixed', 'fixed', 'static'],
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: [isMenuOpen ? 4 : -1, isMenuOpen ? 4 : -1, 4],
              pointerEvents: [isMenuOpen ? 'auto' : 'none', isMenuOpen ? 'auto' : 'none', 'auto'],
              '&::before': {
                content: '""',
                position: 'fixed',
                display: [isMenuOpen ? 'block' : 'none', isMenuOpen ? 'block' : 'none', 'none'],
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: isMenuOpen ? 1 : -1,
                background: theme.color.overlay,
                opacity: 0.5,
              },
            }}
          >
            <Box
              ref={ref}
              cs={{
                position: ['fixed', 'fixed', 'static'],
                display: [isMenuOpen ? 'flex' : 'none', isMenuOpen ? 'flex' : 'none', 'flex'],
                flexDirection: 'column',
                top: 0,
                right: 0,
                bottom: 0,
                left: [theme.spacing.ml, theme.spacing.l, 0],
                p: [theme.spacing.ms, theme.spacing.ml, 0],
                borderTopLeftRadius: theme.radii.l,
                borderBottomLeftRadius: theme.radii.l,
                height: ['100%', '100%', 'auto'],
                background: [theme.color.white, theme.color.white, 'transparent'],
                zIndex: 5,
              }}
            >
              <Box
                cs={{
                  display: ['flex', 'flex', 'none'],
                  justifyContent: 'end',
                  alignItems: 'center',
                  zIndex: 4,
                  width: '100%',
                  pt: [theme.spacing.ms, theme.spacing.xs, theme.spacing.ms, 0],
                  mb: [theme.spacing.ml, theme.spacing.ml, theme.spacing.ml, 0],
                }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <IconX css={{color: theme.color.black}} size={22} />
              </Box>
              <Box
                cs={{
                  display: 'flex',
                  flexDirection: ['column-reverse', 'column-reverse', 'column'],
                  justifyContent: 'space-between',
                  alignItems: ['start', 'start', 'end'],
                  height: ['100%', '100%', 'auto'],
                  mt: theme.spacing.xxs,
                }}
              >
                <Box
                  tag="ul"
                  composition={['semanticList']}
                  cs={{
                    display: 'flex',
                    width: ['100%', '100%', 'auto'],
                    columnGap: [theme.spacing.xl, theme.spacing.xl, theme.spacing.l],
                    mt: 0,
                    mb: [0, 0, theme.spacing.xs],
                  }}
                >
                  {navigationSocials.map(({label, link}, i) => (
                    <Box tag="li" key={i}>
                      <Link href={link} legacyBehavior passHref>
                        <Anchor
                          cs={{
                            fontSize: theme.font.size.small,
                            color: [theme.color.black, isScrolled ? theme.color.black : theme.color.white],
                            textDecoration: 'none',
                          }}
                        >
                          {label}
                        </Anchor>
                      </Link>
                    </Box>
                  ))}
                </Box>
                <Box
                  tag="ul"
                  composition={['semanticList']}
                  cs={{
                    display: 'flex',
                    columnGap: theme.spacing.xxl,
                    rowGap: theme.spacing.ml,
                    width: ['100%', '100%', 'auto'],
                    paddingBottom: theme.spacing.s,
                    flexDirection: ['column', 'column', 'row'],
                  }}
                >
                  {navigationLinks.map(({label, link}, i) => (
                    <Box tag="li" key={i} cs={{pt: theme.spacing.xs}}>
                      <Link href={link} legacyBehavior passHref>
                        <Anchor
                          cs={{
                            color: [theme.color.black, theme.color.black, isScrolled ? theme.color.black : theme.color.white],
                            textDecoration: 'none',
                            fontSize: [theme.font.size.big, theme.font.size.big, theme.font.size.base],
                            letterSpacing: [theme.font.spacing.small, theme.font.spacing.small, theme.font.spacing.xsm],
                            display: ['flex', 'flex', 'inline'],
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          {label}
                          <Box cs={{display: ['block', 'none']}}>
                            <IconChevronRight css={{color: theme.color.black}} size={18} />
                          </Box>
                        </Anchor>
                      </Link>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
