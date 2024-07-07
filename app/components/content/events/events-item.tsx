import React, {FC} from 'react'

import {DynamicZone} from '@/app/components/content'
import {SingleColumn} from '@/app/components/layout'
import {TApiEvent} from '@/app/features/api'

type TEventsItemProps = TApiEvent

export const EventsItem: FC<TEventsItemProps> = ({attributes: {title, content}}) => {
  return (
    <SingleColumn title={title}>
      <DynamicZone title={title} zones={content} />
    </SingleColumn>
  )
}
