import React from 'react'
import {Anchor, Box, Text} from '@effortless-ui'
import {useQuery} from '@tanstack/react-query'
import {GetServerSideProps, NextPage} from 'next'
import Link from 'next/link'

import {EventsList} from '@/app/components/content'
import MasterPage from '@/app/components/masterpages/masterpage'
import {PaginatedContent, TilesList} from '@/app/components/ui'
import {siteMap} from '@/app/dictionaries/site.dictionary'
import {TApiEvent, TApiNews} from '@/app/features/api/types'
import {getApiResponse, getDehydratedState, getQueryKey, IGetApiResponseParams, IPageWithPayload} from '@/app/features/api/utils'
import {mapApiNewsToTile} from '@/app/utils'

const Home: NextPage<IPageWithPayload<[TApiNews, TApiEvent]>> = ({payloads: [newsPayload, eventsPayload]}) => {
  const {data: newsData, isSuccess: isNewsDataSuccess} = useQuery({
    queryKey: getQueryKey({payload: newsPayload}),
    queryFn: () => getApiResponse(newsPayload),
  })

  return (
    <MasterPage>
      <Text tag="h1">Miejsko-Gminny Ośrodek Kultury w Kamieniu Krajeńskim</Text>
      <Text tag="h2">Nadchodzące wydarzenia</Text>
      <PaginatedContent payload={eventsPayload}>{(data) => <EventsList list={data} />}</PaginatedContent>
      <Link href={siteMap.events} legacyBehavior passHref>
        <Anchor>Zobacz wszystkie wydarzenia</Anchor>
      </Link>
      {isNewsDataSuccess && (
        <TilesList
          cols={[1, null, 2]}
          title="Aktualności"
          tiles={newsData.data.map(mapApiNewsToTile)}
          button={{label: 'Sprawdź wszystkie aktualności', link: siteMap.news}}
        />
      )}
    </MasterPage>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const today = new Date().toISOString()
  const payloads: [IGetApiResponseParams<TApiNews>, IGetApiResponseParams<TApiEvent>] = [
    {endpoint: 'news', pagination: {limit: 2}, sort: [['id', 'desc']]},
    {endpoint: 'events', filters: {date: [today, 'gte']}, pagination: {limit: 3}, sort: [['date']]},
  ]
  const {dehydratedState} = await getDehydratedState<TApiNews & TApiEvent>({payloads, req})

  return {
    props: {dehydratedState, payloads},
  }
}

export default Home
