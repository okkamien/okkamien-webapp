import React, {FC} from 'react'

import {DynamicZone} from '@/app/components/content'
import {TwoColumns} from '@/app/components/layout'
import {TApiNews} from '@/app/features/api'

type TNewsItemProps = TApiNews

export const NewsItem: FC<TNewsItemProps> = ({attributes: {title, content}}) => {
  return (
    <TwoColumns title={title}>
      <DynamicZone title={title} zones={content} />
    </TwoColumns>
  )
}
