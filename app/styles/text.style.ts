import {CSSObject} from '@emotion/react'

// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import {theme} from './theme'

export const text: CSSObject = {
  body: {
    color: theme.color.text,
    fontSize: theme.font.size.base,
    fontFamily: theme.font.family.sansSerif,
    lineHeight: theme.font.spacing.base,
  },
  a: {
    color: theme.color.primary,
    textDecoration: 'underline',
    cursor: 'pointer',
    '&:hover, &:active': {
      textDecoration: 'none',
    },
  },
  'h1, h2, h3, h4, h5, h6, p': {
    margin: 0,
    fontSize: theme.font.size.base,
    lineHeight: theme.font.spacing.base,
  },
}
