import React, {forwardRef} from 'react'

import {Boilerplate, TBoilerplateProps} from '@/app/components/@effortless-ui/components/boilerplate'

export const Anchor = forwardRef<unknown, Omit<TBoilerplateProps<'a'>, 'from'>>((props, ref) => {
  const {href} = props

  return <Boilerplate from="Anchor" tag="a" {...(href?.startsWith('http') && {target: '_blank'})} ref={ref} {...props} />
})
