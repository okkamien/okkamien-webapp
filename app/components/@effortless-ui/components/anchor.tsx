import React, {forwardRef} from 'react'

import {Boilerplate, TBoilerplateProps} from '@/app/components/@effortless-ui/components/boilerplate'

export const Anchor = forwardRef<unknown, Omit<TBoilerplateProps<'a'>, 'from'>>((props, ref) => {
  return <Boilerplate from="Anchor" tag="a" ref={ref} {...props} />
})
