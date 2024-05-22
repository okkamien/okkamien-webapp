import React from 'react'
import {Anchor, Box, Text} from '@effortless-ui'
import {GetServerSideProps, NextPage} from 'next'
import Link from 'next/link'

import {EventsList, NewsList} from '@/app/components/content'
import MasterPage from '@/app/components/masterpages/masterpage'
import {PaginatedContent} from '@/app/components/ui'
import {siteMap} from '@/app/dictionaries/site.dictionary'
import {TApiEvent, TApiNews} from '@/app/features/api/types'
import {getDehydratedState, IGetApiResponseParams, IPageWithPayload} from '@/app/features/api/utils'

const Home: NextPage<IPageWithPayload<[TApiNews, TApiEvent]>> = ({payloads: [newsPayload, eventsPayload]}) => {
  return (
    <MasterPage>
      <Text tag="h1">Miejsko-Gminny Ośrodek Kultury w Kamieniu Krajeńskim</Text>
      <Text tag="h2">Ostatnie aktualności</Text>
      <PaginatedContent payload={newsPayload}>{(data) => <NewsList list={data} />}</PaginatedContent>
      <Link href={siteMap.news} legacyBehavior passHref>
        <Anchor>Zobacz wszystkie aktualności</Anchor>
      </Link>
      <Text tag="h2">Nadchodzące wydarzenia</Text>
      <PaginatedContent payload={eventsPayload}>{(data) => <EventsList list={data} />}</PaginatedContent>
      <Link href={siteMap.events} legacyBehavior passHref>
        <Anchor>Zobacz wszystkie wydarzenia</Anchor>
      </Link>
      <Box cs={{bg: ['blue', 'red', 'yellow']}}>Test</Box>
    </MasterPage>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const today = new Date().toISOString()
  const payloads: [IGetApiResponseParams<TApiNews>, IGetApiResponseParams<TApiEvent>] = [
    {endpoint: 'news', pagination: {limit: 3}, sort: [['id', 'desc']]},
    {endpoint: 'events', filters: {date: [today, 'gte']}, pagination: {limit: 3}, sort: [['date']]},
  ]
  const {dehydratedState} = await getDehydratedState<TApiNews & TApiEvent>({payloads, req})

  return {
    props: {dehydratedState, payloads},
  }
}

export default Home
