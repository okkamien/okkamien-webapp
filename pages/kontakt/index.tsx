import React from 'react'
import {Text} from '@effortless-ui'
import {GetServerSideProps, NextPage} from 'next'

import MasterPage from '@/app/components/masterpages/masterpage'
import {PaginatedContent, StaffList} from '@/app/components/ui'
import {TApiStaff} from '@/app/features/api/types'
import {getDehydratedState, IGetApiResponseParams, IPageWithPayload} from '@/app/features/api/utils'

const Page: NextPage<IPageWithPayload<[TApiStaff]>> = ({payloads: [payload]}) => {
  return (
    <MasterPage subtitle="Kontakt">
      <Text tag="h1">Kontakt</Text>
      <PaginatedContent payload={payload}>{(data) => <StaffList list={data} />}</PaginatedContent>
    </MasterPage>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const payloads: IGetApiResponseParams<TApiStaff>[] = [{endpoint: 'staff', populate: ['photo'], sort: [['id']]}]
  const {dehydratedState} = await getDehydratedState({payloads, req})

  return {
    props: {dehydratedState, payloads},
  }
}

export default Page
