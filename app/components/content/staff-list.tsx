import React, {FC} from 'react'
import {Anchor, Box} from '@effortless-ui'
import Image from 'next/image'

import {TApiStaff} from '@/app/features/api/types'

interface IStaffListProps {
  list: TApiStaff[]
}

export const StaffList: FC<IStaffListProps> = ({list}) => {
  return (
    <Box tag="ul" composition={['semanticList']} cs={{display: 'flex', justifyContent: 'space-between'}}>
      {list.map(({attributes: {email, name, photo, title}, id}) => (
        <Box key={id} tag="li">
          <Image src={`${process.env.NEXT_PUBLIC_DATABASE_URL}${photo.data.attributes.url}`} alt={name} width={256} height={256} />
          <strong>{name}</strong>
          <br />
          {title}
          <br />
          <Anchor href={`mailto:${email}`}>{email}</Anchor>
        </Box>
      ))}
    </Box>
  )
}
