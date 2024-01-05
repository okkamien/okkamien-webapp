import React from 'react'
import {Text} from '@effortless-ui'
import {NextPage} from 'next'

import MasterPage from '@/app/components/masterpages/masterpage'

const Page: NextPage = () => {
  return (
    <MasterPage subtitle="Aktualności">
      <Text tag="h1">Aktualności</Text>
    </MasterPage>
  )
}

export default Page
