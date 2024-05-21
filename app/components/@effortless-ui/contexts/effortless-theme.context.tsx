import React, {createContext, FC, ReactNode} from 'react'
import {Global} from '@emotion/react'
import facepaint, {DynamicStyleFunction} from 'facepaint'

import {CSObject, EffortlessTheme} from '@/app/components/@effortless-ui/types'
import {transformCSProperty} from '@/app/components/@effortless-ui/utils'

interface EffortlessThemeContextProps {
  children?: ReactNode
  defaultStyles?: CSObject
  mediaQuery: DynamicStyleFunction
  theme?: EffortlessTheme
}

export const effortlessThemeDefaultContextProps: EffortlessThemeContextProps = {
  mediaQuery: facepaint([]),
}

export const EffortlessThemeContext = createContext<EffortlessThemeContextProps>(effortlessThemeDefaultContextProps)

export const EffortlessThemeProvider: FC<EffortlessThemeContextProps> = ({children, defaultStyles, theme}) => {
  const state = {
    mediaQuery: facepaint(theme?.breakpoints?.map((breakpoint) => `@media (min-width: ${breakpoint}px)`) ?? []),
    theme: theme ?? {},
  }

  return (
    <>
      <Global styles={[transformCSProperty(defaultStyles)]} />
      <EffortlessThemeContext.Provider value={state}>{children}</EffortlessThemeContext.Provider>
    </>
  )
}
