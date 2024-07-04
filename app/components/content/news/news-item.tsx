import React, {FC} from 'react'

import {ContentPage} from '@/app/components/content'
import {TwoColumns} from '@/app/components/layout'
import {TApiNews} from '@/app/features/api'

type TNewsItemProps = TApiNews

export const NewsItem: FC<TNewsItemProps> = ({attributes: {title, ...rest}}) => {
  return (
    <TwoColumns title={title}>
      <ContentPage title={title} {...rest} />
    </TwoColumns>
  )
}
