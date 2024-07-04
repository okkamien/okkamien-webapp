import React, {FC} from 'react'

import {ContentPage} from '@/app/components/content'
import {SingleColumn} from '@/app/components/layout'
import {TApiEvent} from '@/app/features/api'

type TEventsItemProps = TApiEvent

export const EventsItem: FC<TEventsItemProps> = ({attributes: {title, ...rest}}) => {
  return (
    <SingleColumn title={title}>
      <ContentPage title={title} {...rest} />
    </SingleColumn>
  )
}
