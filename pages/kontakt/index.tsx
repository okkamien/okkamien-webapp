import React from 'react'
import {Text} from '@effortless-ui'
import {NextPage} from 'next'

import MasterPage from '@/app/components/masterpages/masterpage'

const Page: NextPage = () => {
  return (
    <MasterPage subtitle="Kontakt">
      <Text tag="h1">Kontakt</Text>
    </MasterPage>
  )
}

export default Page
