import {CSObject, EffortlessTheme} from '@effortless-ui'

// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import {theme} from './theme'

const headerStyles: CSObject = {
  m: 0,
  fontWeight: 700,
}

export const effortlessTheme: EffortlessTheme = {
  breakpoints: theme.breakpoints,
  gutter: {
    x: theme.spacing.l,
    y: theme.spacing.l,
  },
  tags: {
    Text: {
      h1: [{fontSize: [theme.font.size.base * 1.6, theme.font.size.base * 2.2]}, headerStyles],
      h2: [{fontSize: [theme.font.size.base * 1.45, theme.font.size.base * 1.9]}, headerStyles],
      h3: [{fontSize: [theme.font.size.base * 1.3, theme.font.size.base * 1.6]}, headerStyles],
      h4: [{fontSize: [theme.font.size.base * 1.15, theme.font.size.base * 1.3]}, headerStyles],
      h5: [headerStyles],
      h6: [headerStyles],
      p: {m: 0},
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
  variants: {},
}
