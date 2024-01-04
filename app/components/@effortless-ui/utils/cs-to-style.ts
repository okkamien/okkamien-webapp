import {CSSProperties} from 'react'

import {CSObject} from '@/app/components/@effortless-ui/types'
import {transformCSProperty} from '@/app/components/@effortless-ui/utils/transform-cs-property'

export const csToStyle = (cs: CSObject): {style: CSSProperties} => {
  return {style: transformCSProperty(cs) as CSSProperties}
}
