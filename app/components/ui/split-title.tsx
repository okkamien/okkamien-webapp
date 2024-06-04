import React, {FC} from 'react'
import {Text} from '@effortless-ui'

interface ISplitTitleProps {
  title: string | [string, string]
}

export const SplitTitle: FC<ISplitTitleProps> = ({title}) => {
  return Array.isArray(title) ? (
    <>
      {title[0]}{' '}
      <Text tag="span" cs={{fontWeight: 300, fontStyle: 'italic'}}>
        {title[1]}
      </Text>
    </>
  ) : (
    title
  )
}
