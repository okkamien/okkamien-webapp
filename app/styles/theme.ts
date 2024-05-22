import facepaint from 'facepaint'
import {Roboto} from 'next/font/google'

/*
  Colors naming convetion:

  Every color (except default black and white) variable name should consist of two parts:
  1. approximate main color name, try keeping main names to minimum
    and base them on e.g. basic color wheel: yellow, orange, red, violet, blue and green
  2. detailed color name based on https://chir.ag/projects/name-that-color or similar service.

  Examples:
  #af4d43 => colors.redAppleBlossom
  #f1e788 => colors.yellowSaharaSand

  If detailed name already includes main color name, drop it.

  Examples:
  #ffa000 => orange peel => colors.orangePeel, not colors.orangeOrangePeel
  #1c39bb => persian blue => colors.bluePersian, not colors.bluePersianBlue

  Do not to use color variables directly in css in js code, instead assign them to theme in more descriptive variables.

  Examples:
  theme.colors.primary: colors.greenPistachio
  theme.colors.border: colors.greyPaleOyster
*/

const colors = {
  black: '#000',
  white: '#fff',
  greyShark: '#1a1b1c',
  blueAllports: '#00739d',
  blueCerulean: '#00a2dd',
  redAlizarinCrimson: '#dc2626',
  greenSalem: '#16a34a',
}

// eslint-disable-next-line new-cap
const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
})

export const theme = {
  breakpoints: [376, 768, 1366],
  color: {
    black: colors.black,
    white: colors.white,
    primary: colors.blueAllports,
    secondary: colors.blueCerulean,
    text: colors.greyShark,
    success: colors.greenSalem,
    error: colors.redAlizarinCrimson,
  },
  gradient: {
    linearLight: 'linear-gradient(0deg, #e8ebef 0%, #f2f2f2 50%, #e8ebef 100%)',
  },
  font: {
    size: {
      base: 16,
      small: 13,
    },
    family: {
      sansSerif: `${roboto.style.fontFamily}, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"`,
    },
    spacing: {
      base: 1.2,
    },
  },
  size: {
    container: 1288,
  },
  spacing: {
    xxs: 4,
    xs: 8,
    s: 12,
    ms: 16,
    m: 20,
    ml: 24,
    l: 32,
    xl: 40,
    xxl: 44,
    xxxl: 64,
    xxxxl: 72,
  },
  radii: {
    s: 4,
    m: 8,
    l: 16,
  },
}

export const mediaQuery = facepaint(theme.breakpoints.map((breakpoint) => `@media (min-width: ${breakpoint}px)`))
