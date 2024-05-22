import {EffortlessTheme} from '@effortless-ui'

// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import {theme} from './theme'

const headers = {
  h1: {
    fontSize: [49, 41],
    fontWeight: 400,
  },
  h2: {
    fontSize: [39, 31],
    fontWeight: 400,
  },
  h3: {
    fontSize: [31, 25],
    fontWeight: 400,
  },
  h4: {
    fontSize: [25, 20],
    fontWeight: 400,
  },
  h5: {
    fontSize: [20, 16],
    fontWeight: 400,
  },
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
    Text: {
      ...headers,
    },
  },
}
