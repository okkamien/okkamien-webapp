import React from 'react'
import {GetServerSideProps, NextPage} from 'next'

import {EventsEmptyState} from '@/app/components/content'
import MasterPage from '@/app/components/masterpages/masterpage'
import {ISelectOption, Tile, TilesList, Title} from '@/app/components/ui'
import {
  getApiCollectionResponse,
  getApiSingleResponse,
  getDehydratedState,
  IApiImage,
  IGetApiCollectionResponseParams,
  IPageWithPayload,
  TApiEvent,
  TApiEventsLandingPage,
  TApiHomePage,
  TApiLocation,
} from '@/app/features/api'
import {DynamicContent} from '@/app/features/dynamic-content'
import {useScrollRef} from '@/app/hooks'
import {theme} from '@/app/styles'
import {mapApiEventToTile, sortByIdList} from '@/app/utils'

interface IEventsPageProps {
  cover: IApiImage
  coverMobile?: IApiImage
  locations: ISelectOption[]
  promotedEvents: TApiEvent[]
}

const Page: NextPage<IPageWithPayload<[TApiEvent, TApiEvent]> & IEventsPageProps> = ({
  cover,
  coverMobile,
  locations,
  payloads: [payload],
  promotedEvents,
}) => {
  const {scrollRef, scrollToElement} = useScrollRef()

  return (
    <MasterPage breadcrumbs={{current: 'Wydarzenia'}} coverImage={cover} coverImageMobile={coverMobile}>
      <Title ref={scrollRef} cs={{mb: [theme.spacing.l, theme.spacing.xxl]}}>
        Wydarzenia
      </Title>
      <DynamicContent
        payload={payload}
        filters={[
          {
            type: 'select',
            key: 'location',
            path: ['id'],
            options: {
              label: 'Lokalizacja',
              options: locations,
            },
          },
          {
            type: 'datepicker',
            key: 'from',
            options: {
              endKey: 'to',
            },
          },
        ]}
        emptyState={<EventsEmptyState events={promotedEvents} />}
        scrollToElement={scrollToElement}
      >
        {(data) => (
          <TilesList
            tiles={data.map((item, i) => (
              <Tile key={i} {...mapApiEventToTile(item)} />
            ))}
          />
        )}
      </DynamicContent>
    </MasterPage>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const {
    data: {
      attributes: {cover, coverMobile},
    },
  } = await getApiSingleResponse<TApiEventsLandingPage>({
    req,
    endpoint: 'events-landing-page',
    populate: ['cover', 'coverMobile'],
  })
  const {
    data: {
      attributes: {events},
    },
  } = await getApiSingleResponse<TApiHomePage>({req, endpoint: 'home-page', populate: ['events']})
  const ids = events?.data.map(({id}) => id.toString()) ?? []
  const {data: promotedEventsData} = await getApiCollectionResponse<TApiEvent>({
    req,
    endpoint: 'events',
    filters: [{key: 'id', value: ids, operator: 'containsi'}],
    populate: [['location'], ['thumbnail']],
  })
  const promotedEvents = promotedEventsData.sort((a, b) => sortByIdList(ids, a, b))

  const {data: locationsData} = await getApiCollectionResponse<TApiLocation>({req, endpoint: 'locations'})
  const locations: ISelectOption[] = locationsData.map(({attributes: {name}, id}) => ({label: name, value: id.toString()}))

  const payloads: IGetApiCollectionResponseParams<TApiEvent>[] = [
    {endpoint: 'events', populate: [['location'], ['thumbnail']], sort: [['from', 'desc']]},
  ]
  const {dehydratedState} = await getDehydratedState({payloads, req})

  return {
    props: {
      cover,
      coverMobile,
      dehydratedState,
      locations,
      payloads,
      promotedEvents,
    },
  }
}

export default Page
