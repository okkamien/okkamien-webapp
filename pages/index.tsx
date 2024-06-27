import React from 'react'
import {Box} from '@effortless-ui'
import {useQuery} from '@tanstack/react-query'
import {GetServerSideProps, NextPage} from 'next'

import MasterPage from '@/app/components/masterpages/masterpage'
import {Btn, ImageTile, Tile, TilesList, Title} from '@/app/components/ui'
import {siteMap} from '@/app/dictionaries/site.dictionary'
import {
  getApiCollectionResponse,
  getApiSingleResponse,
  getDehydratedState,
  getQueryKey,
  IGetApiCollectionResponseParams,
  IPageWithPayload,
  TApiEvent,
  TApiHomePage,
  TApiNews,
} from '@/app/features/api'
import {theme} from '@/app/styles'
import {mapApiEventToTile, mapApiNewsToTile, sortByIdList} from '@/app/utils'

interface IHomePageProps {
  ids: string[]
  intro: string
}

const Home: NextPage<IPageWithPayload<[TApiNews, TApiEvent]> & IHomePageProps> = ({ids, payloads: [newsPayload, eventsPayload]}) => {
  const {data: newsData, isSuccess: isNewsDataSuccess} = useQuery({
    queryKey: getQueryKey({payload: newsPayload}),
    queryFn: () => getApiCollectionResponse(newsPayload),
  })
  const {data: eventsData, isSuccess: isEventsDataSuccess} = useQuery({
    queryKey: getQueryKey({payload: eventsPayload}),
    queryFn: () => getApiCollectionResponse(eventsPayload),
  })

  return (
    <MasterPage>
      {isEventsDataSuccess && (
        <Box cs={{label: 'Events-section', mb: [theme.spacing.xxxl, theme.spacing.xxxxl]}}>
          <Title cs={{mb: [theme.spacing.l, theme.spacing.xxl]}}>Wydarzenia</Title>
          <TilesList
            tiles={eventsData.data
              .sort((a, b) => sortByIdList(ids, a, b))
              .map((item, i) => (
                <Tile key={i} {...mapApiEventToTile(item)} />
              ))}
          />
          <Btn link={siteMap.events} dark cs={{width: ['100%', 'auto'], mt: [theme.spacing.l, theme.spacing.xxl]}}>
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
          <Btn link={siteMap.news} dark cs={{width: ['100%', 'auto'], mt: [theme.spacing.l, theme.spacing.xxl]}}>
            Sprawdź wszystkie aktualności
          </Btn>
        </Box>
      )}
      <Box cs={{label: 'Links-section'}}>
        <TilesList
          cols={[1, null, 2]}
          tiles={[
            <ImageTile
              key={1}
              image="/content/workshops-cover.jpg"
              title="Pracownie M&#8209;GOK"
              link={siteMap.workshops}
              button="Zobacz"
            />,
            <ImageTile key={2} image="/content/facilities-cover.jpg" title="Placówki" link={siteMap.facilities} button="Zobacz" />,
          ]}
        />
      </Box>
    </MasterPage>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const {
    data: {
      attributes: {events},
    },
  } = await getApiSingleResponse<TApiHomePage>({
    req,
    endpoint: 'home-page',
    populate: ['events'],
  })
  const ids = events?.data.map(({id}) => id.toString()) ?? []

  const payloads: [IGetApiCollectionResponseParams<TApiNews>, IGetApiCollectionResponseParams<TApiEvent>] = [
    {endpoint: 'news', pagination: {limit: 2}, sort: [['date', 'desc']]},
    {endpoint: 'events', filters: [{key: 'id', value: ids, operator: 'containsi'}], populate: [['location'], ['thumbnail']]},
  ]
  const {dehydratedState} = await getDehydratedState<TApiNews & TApiEvent>({payloads, req})

  return {
    props: {ids, dehydratedState, payloads},
  }
}

export default Home
