import {EffortlessTheme} from '@effortless-ui'

// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import {theme} from './theme'

export const effortlessTheme: EffortlessTheme = {
  breakpoints: theme.breakpoints,
  gutter: {
    x: theme.spacing.l,
    y: theme.spacing.l,
  },
  tags: {
    Text: {},
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
  variants: {},
}
