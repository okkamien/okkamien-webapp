import React, {FC, PropsWithChildren} from 'react'
import {Text} from '@effortless-ui'

export const DynamicContentEmptyState: FC<PropsWithChildren> = ({children}) => {
  return <Text>{children}</Text>
}
