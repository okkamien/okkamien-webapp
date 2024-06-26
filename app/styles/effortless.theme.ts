import {EffortlessTheme} from '@effortless-ui'

// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import {theme} from './theme'

const headers = {
  h1: {
    fontSize: [41, 49],
    fontWeight: 400,
  },
  h2: {
    fontSize: [31, 39],
    fontWeight: 400,
  },
  h3: {
    fontSize: [25, 31],
    fontWeight: 400,
  },
  h4: {
    fontSize: [20, 25],
    fontWeight: 400,
  },
  h5: {
    fontSize: [16, 20],
    fontWeight: 400,
  },
  h6: {
    fontSize: [16, 16],
    fontWeight: 400,
  },
}

const pagination = {
  width: 36,
  height: 36,
  p: 0,
  borderRadius: theme.radii.s,
  transition: 'color 200ms, background-color 200ms, border-color 200ms',
}

export const effortlessTheme: EffortlessTheme = {
  breakpoints: theme.breakpoints,
  gutter: {
    x: theme.spacing.l,
    y: theme.spacing.l,
  },
  tags: {
    Text: {
      ...headers,
    },
    Button: {
      button: {},
    },
  },
  compositions: {
    Box: {
      semanticList: {
        listStyle: 'none',
        p: 0,
        m: 0,
      },
    },
  },
  variants: {
    Box: {
      paginationDots: {
        lineHeight: '36px',
      },
    },
    Text: {
      ...headers,
    },
    Button: {
      solid: {
        ...pagination,
        '&:enabled': {
          cursor: 'pointer',
          '&:hover': {
            color: theme.color.primary,
            borderColor: theme.color.primary,
          },
        },
      },
      paginationDigit: {
        ...pagination,
        border: 'none',
        '&:enabled': {
          cursor: 'pointer',
          '&:hover': {
            color: theme.color.primary,
          },
        },
      },
      paginationActive: {
        ...pagination,
        color: theme.color.white,
        border: 'none',
        bg: theme.color.text,
      },
      text: {
        p: 0,
        color: theme.color.primary,
        textDecoration: 'underline',
        border: 'none',
        cursor: 'pointer',
        '&:hover': {
          textDecoration: 'none',
        },
      },
    },
  },
}
