import React, {FC, useEffect, useState} from 'react'
import {Anchor, Box} from '@effortless-ui'
import {IconChevronRight, IconMenu2, IconX} from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'

import {Container} from '@/app/components/ui'
import {navigationLinks, navigationSocials, siteMap, siteName} from '@/app/dictionaries/site.dictionary'
import {useOutsideElementClickHandler} from '@/app/hooks/use-outside-element-click-handler'
import {theme} from '@/app/styles'

export const Header: FC = () => {
  const [scroll, setScroll] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const ref = useOutsideElementClickHandler(() => setIsMenuOpen(false))

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setScroll(window.scrollY > 10)
    })
  }, [])

  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'auto'
  }, [isMenuOpen])

  return (
    <>
      <Box
        tag="header"
        cs={{
          py: [theme.spacing.ml, theme.spacing.s],
          position: scroll ? 'fixed' : 'static',
          top: 0,
          width: '100%',
          zIndex: 5,
          background: scroll ? theme.color.white : 'transparent',
        }}
      >
        <Container>
          <Box
            cs={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Link href={siteMap.homepage} legacyBehavior passHref>
              {scroll ? (
                <Box
                  cs={{
                    label: 'navigaction-image',
                    width: [120, 180],
                    py: [theme.spacing.xxs, theme.spacing.s],
                  }}
                >
                  <Image src="/Logo-color-b.svg" width={180} height={40} alt={siteName} sizes="100%" />
                </Box>
              ) : (
                <Box
                  cs={{
                    label: 'navigaction-image',
                    width: [120, 180],
                    py: [theme.spacing.xxs, theme.spacing.s],
                  }}
                >
                  <Image src="/Logo-monowhite-b.svg" width={180} height={40} alt={siteName} sizes="100%" />
                </Box>
              )}
            </Link>
            <Box
              cs={{display: ['flex', 'none'], justifyContent: 'center', alignItems: 'center', zIndex: 4}}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <IconMenu2 css={{color: scroll ? theme.color.black : theme.color.white}} />
            </Box>
            <Box
              cs={{
                position: ['fixed', 'static'],
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: [isMenuOpen ? 4 : -1, 4],
                '&::before': {
                  content: '""',
                  position: 'fixed',
                  display: [isMenuOpen ? 'block' : 'none', 'none'],
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
                  display: [isMenuOpen ? 'flex' : 'none', 'flex'],
                  position: ['fixed', 'static'],
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: theme.spacing.ml,
                  p: [theme.spacing.ms, 0],
                  zIndex: 5,
                  borderTopLeftRadius: theme.radii.l,
                  borderBottomLeftRadius: theme.radii.l,
                  flexDirection: 'column',
                  height: ['100%', 'auto'],
                  background: [theme.color.white, 'transparent'],
                }}
              >
                <Box
                  cs={{
                    display: ['flex', 'none'],
                    justifyContent: 'end',
                    alignItems: 'center',
                    zIndex: 4,
                    width: '100%',
                    pt: [theme.spacing.ms, 0],
                    mb: [theme.spacing.ml, 0],
                  }}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <IconX css={{color: theme.color.black}} size={22} />
                </Box>
                <Box
                  cs={{
                    display: 'flex',
                    flexDirection: ['column-reverse', 'column'],
                    justifyContent: 'space-between',
                    alignItems: ['start', 'end'],
                    height: ['100%', 'auto'],
                    mt: theme.spacing.xxs,
                  }}
                >
                  <Box
                    tag="ul"
                    composition={['semanticList']}
                    cs={{
                      display: 'flex',
                      width: ['100%', 'auto'],
                      columnGap: [theme.spacing.xl, theme.spacing.l],
                      mt: [0, theme.spacing.xxs],
                      mb: [0, theme.spacing.xs],
                    }}
                  >
                    {navigationSocials.map(({label, link}, i) => (
                      <Box tag="li" key={i}>
                        <Link href={link} legacyBehavior passHref>
                          <Anchor
                            cs={{
                              fontSize: theme.font.size.small,
                              color: [theme.color.black, scroll ? theme.color.black : theme.color.white],
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
                      width: ['100%', 'auto'],
                      paddingBottom: theme.spacing.s,
                      flexDirection: ['column', 'row'],
                    }}
                  >
                    {navigationLinks.map(({label, link}, i) => (
                      <Box
                        tag="li"
                        key={i}
                        cs={{
                          pt: theme.spacing.xs,
                        }}
                      >
                        <Link href={link} legacyBehavior passHref>
                          <Anchor
                            cs={{
                              color: [theme.color.black, scroll ? theme.color.black : theme.color.white],
                              textDecoration: 'none',
                              fontSize: [theme.font.size.big, theme.font.size.base],
                              letterSpacing: [theme.font.spacing.small, theme.font.spacing.xsm],
                              display: ['flex', 'inline'],
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

      {scroll && <Box cs={{height: 106}} />}
    </>
  )
}
