import React from 'react'
import {Box} from '@effortless-ui'
import {useQuery} from '@tanstack/react-query'
import {GetServerSideProps, NextPage} from 'next'

import MasterPage from '@/app/components/masterpages/masterpage'
import {Btn, Tile, TilesList, Title} from '@/app/components/ui'
import {siteMap} from '@/app/dictionaries/site.dictionary'
import {TApiEvent, TApiNews} from '@/app/features/api/types'
import {getApiResponse, getDehydratedState, getQueryKey, IGetApiResponseParams, IPageWithPayload} from '@/app/features/api/utils'
import {theme} from '@/app/styles'
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
        <Box cs={{label: 'Events-section', mb: [theme.spacing.xxxl, theme.spacing.xxxxl]}}>
          <Title cs={{mb: [theme.spacing.l, theme.spacing.xxl]}}>Wydarzenia</Title>
          <TilesList
            tiles={eventsData.data.map((item, i) => (
              <Tile key={i} {...mapApiEventToTile(item)} />
            ))}
          />
          <Btn link={siteMap.events} dark cs={{mt: [theme.spacing.l, theme.spacing.xxl]}}>
            Sprawdź wszystkie wydarzenia
          </Btn>
        </Box>
      )}
      {isNewsDataSuccess && (
        <Box cs={{label: 'Events-section', mb: [theme.spacing.xxxl, theme.spacing.xxxxl]}}>
          <Title cs={{mb: [theme.spacing.l, theme.spacing.xxl]}}>Aktualności</Title>
          <TilesList
            cols={[1, 2]}
            tiles={newsData.data.map((item, i) => (
              <Tile key={i} {...mapApiNewsToTile(item)} />
            ))}
          />
          <Btn link={siteMap.news} dark cs={{mt: [theme.spacing.l, theme.spacing.xxl]}}>
            Sprawdź wszystkie aktualności
          </Btn>
        </Box>
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
