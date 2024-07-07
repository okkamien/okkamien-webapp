import React, {FC} from 'react'

import {DynamicZone} from '@/app/components/content'
import {TwoColumns} from '@/app/components/layout'
import {TApiWorkshop} from '@/app/features/api'

type TWorkshopItemProps = TApiWorkshop

export const WorkshopItem: FC<TWorkshopItemProps> = ({attributes: {content, name, splitNameLeft, splitNameRight}}) => {
  return (
    <TwoColumns title={splitNameLeft && splitNameRight ? [splitNameLeft, splitNameRight] : name}>
      <DynamicZone title={name} zones={content} />
    </TwoColumns>
  )
}
