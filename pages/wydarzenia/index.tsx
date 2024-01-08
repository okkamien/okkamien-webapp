import React from 'react'
import {Text} from '@effortless-ui'
import {GetServerSideProps, NextPage} from 'next'

import MasterPage from '@/app/components/masterpages/masterpage'
import {EventsList, PaginatedContent} from '@/app/components/ui'
import {TApiEvent} from '@/app/features/api/types'
import {getDehydratedState, IGetApiResponseParams, IPageWithPayload} from '@/app/features/api/utils'

const Page: NextPage<IPageWithPayload<TApiEvent>> = ({payloads}) => {
  const [upcomingPayload, pastPayload] = payloads

  return (
    <MasterPage subtitle="Wydarzenia">
      <Text tag="h1">Wydarzenia</Text>
      <Text tag="h2">Nadchodzące</Text>
      <PaginatedContent payload={upcomingPayload}>{(data) => <EventsList list={data} />}</PaginatedContent>
      <Text tag="h2">Minione</Text>
      <PaginatedContent payload={pastPayload}>{(data) => <EventsList list={data} />}</PaginatedContent>
    </MasterPage>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const today = new Date().toISOString()
  const payloads: IGetApiResponseParams<TApiEvent>[] = [
    {endpoint: 'events', filters: {date: [today, 'gte']}, sort: [['date']]},
    {endpoint: 'events', filters: {date: [today, 'lt']}, sort: [['date']]},
  ]
  const {dehydratedState} = await getDehydratedState({payloads, req})

  return {
    props: {dehydratedState, payloads},
  }
}

export default Page
