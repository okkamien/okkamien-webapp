import React, {forwardRef} from 'react'

import {Boilerplate, TBoilerplateProps} from '@/app/components/@effortless-ui/components/boilerplate'
import {useEffortlessTheme} from '@/app/components/@effortless-ui/hooks'
import {CSObject} from '@/app/components/@effortless-ui/types'
import {toMediaQueryArray} from '@/app/components/@effortless-ui/utils/to-media-query-array'

export type GridCols = number | (number | null)[]
export type GridTemplate = (number | string)[] | ((number | string)[] | null)[]

interface GridProps {
  cols?: GridCols
  template?: GridTemplate
}

const getColsTemplate = (cols: GridCols) => {
  return {
    gridTemplateColumns: toMediaQueryArray<GridCols>(cols, (item) => `repeat(${item}, minmax(0, 1fr))`),
  }
}

const getGridTemplate = (template: GridTemplate) => {
  const templatesArray = Array.isArray(template[0]) ? template : [template]

  return {
    gridTemplateColumns: toMediaQueryArray<GridTemplate>(templatesArray, (item) =>
      item.map((single) => (typeof single === 'number' ? `minmax(0, ${(single as number) / 12}fr)` : single)).join(' '),
    ),
  }
}

export const Grid = forwardRef<unknown, Omit<TBoilerplateProps<'div'> & GridProps, 'from'>>(({cols, cs, template, ...props}, ref) => {
  const {mediaQuery, theme} = useEffortlessTheme()

  const styles: CSObject[] = [
    {
      display: 'grid',
      gap: `${theme?.gutter?.x}px ${theme?.gutter?.y}px`,
    },
    ...(template ? mediaQuery(getGridTemplate(template)) : []),
    ...(cols ? mediaQuery(getColsTemplate(cols)) : []),
    ...(cs ? [cs] : []),
  ]

  return <Boilerplate cs={styles} from="Box" ref={ref} {...props} />
})
