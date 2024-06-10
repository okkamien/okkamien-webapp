import React, {FC, useEffect, useState} from 'react'
import {Anchor, Box} from '@effortless-ui'
import Link from 'next/link'

import LogoNavIcon from '@/app/assets/Logo-nav.svg'
import LogoNavFixedIcon from '@/app/assets/Logo-nav-fixed.svg'
import {Container} from '@/app/components/ui'
import {navigationLinks, navigationSocials, siteMap} from '@/app/dictionaries/site.dictionary'
import {theme} from '@/app/styles'

export const Header: FC = () => {
  const [scroll, setScroll] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setScroll(window.scrollY > 10)
    })
  })

  return (
    <>
      <Box
        tag="header"
        cs={{
          py: theme.spacing.m,
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
              {scroll ? <LogoNavFixedIcon /> : <LogoNavIcon />}
            </Link>
            <Box cs={{display: 'flex', flexDirection: 'column', alignItems: 'end', justifyContent: 'end'}}>
              <Box tag="ul" composition={['semanticList']} cs={{display: 'flex', columnGap: theme.spacing.l, pb: theme.spacing.s}}>
                {navigationSocials.map(({label, link}, i) => (
                  <Box tag="li" key={i}>
                    <Link href={link} legacyBehavior passHref>
                      <Anchor
                        cs={{
                          fontSize: theme.font.size.small,
                          color: scroll ? theme.color.black : theme.color.white,
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
                cs={{display: 'flex', columnGap: theme.spacing.xxl, paddingBottom: theme.spacing.s}}
              >
                {navigationLinks.map(({label, link}, i) => (
                  <Box tag="li" key={i}>
                    <Link href={link} legacyBehavior passHref>
                      <Anchor cs={{color: scroll ? theme.color.black : theme.color.white, textDecoration: 'none'}}>{label}</Anchor>
                    </Link>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {scroll && <Box cs={{height: 106}} />}
    </>
  )
}
