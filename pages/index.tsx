import React from 'react'
import {useQuery} from '@tanstack/react-query'
import {GetServerSideProps, NextPage} from 'next'

import MasterPage from '@/app/components/masterpages/masterpage'
import {TilesList} from '@/app/components/ui'
import {siteMap} from '@/app/dictionaries/site.dictionary'
import {TApiEvent, TApiNews} from '@/app/features/api/types'
import {getApiResponse, getDehydratedState, getQueryKey, IGetApiResponseParams, IPageWithPayload} from '@/app/features/api/utils'
import {mapApiEventToTile, mapApiNewsToTile} from '@/app/utils'

const Home: NextPage<IPageWithPayload<[TApiNews, TApiEvent]>> = ({payloads: [newsPayload, eventsPayload]}) => {
  const {data: newsData, isSuccess: isNewsDataSuccess} = useQuery({
    queryKey: getQueryKey({payload: newsPayload}),
    queryFn: () => getApiResponse(newsPayload),
  })
  const {data: eventsData, isSuccess: isEventsDataSuccess} = useQuery({
    queryKey: getQueryKey({payload: eventsPayload}),
    queryFn: () => getApiResponse(eventsPayload),
  })

  return (
    <MasterPage>
      {isEventsDataSuccess && (
        <TilesList
          title="Wydarzenia"
          tiles={eventsData.data.map(mapApiEventToTile)}
          button={{label: 'Sprawdź wszystkie wydarzenia', link: siteMap.events}}
        />
      )}
      {isNewsDataSuccess && (
        <TilesList
          cols={[1, 2]}
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
    {endpoint: 'events', filters: {from: [today, 'gte']}, pagination: {limit: 3}, populate: ['thumbnail'], sort: [['from']]},
  ]
  const {dehydratedState} = await getDehydratedState<TApiNews & TApiEvent>({payloads, req})

  return {
    props: {dehydratedState, payloads},
  }
}

export default Home
