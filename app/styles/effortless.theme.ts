import {EffortlessTheme} from '@effortless-ui'

// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import {theme} from './theme'

const headers = {
  h1: {
    fontSize: [49, 41],
  },
  h2: {
    fontSize: [39, 31],
  },
  h3: {
    fontSize: [31, 25],
  },
  h4: {
    fontSize: [25, 20],
  },
  h5: {
    fontSize: [20, 16],
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
