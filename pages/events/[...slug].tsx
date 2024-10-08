import React from 'react'
import {useQuery} from '@tanstack/react-query'
import {GetServerSideProps, NextPage} from 'next'

import {EventsItem, populateDynamicZone} from '@/app/components/content'
import MasterPage from '@/app/components/masterpages/masterpage'
import {siteMap} from '@/app/dictionaries/site.dictionary'
import {
  getApiCollectionResponse,
  getApiSingleResponse,
  getDehydratedState,
  getQueryKey,
  IApiImage,
  IGetApiCollectionResponseParams,
  IPageWithPayload,
  TApiEvent,
  TApiEventsLandingPage,
} from '@/app/features/api'

interface IEventPageProps {
  cover: IApiImage
  coverMobile?: IApiImage
}

const Page: NextPage<IPageWithPayload<[TApiEvent]> & IEventPageProps> = ({payloads: [payload], cover, coverMobile}) => {
  const {data, isSuccess} = useQuery({
    queryKey: getQueryKey({payload}),
    queryFn: () => getApiCollectionResponse(payload),
  })

  return (
    isSuccess && (
      <MasterPage
        coverImage={cover}
        coverImageMobile={coverMobile}
        breadcrumbs={{current: data.data[0].attributes.title, links: [{label: 'Wydarzenia', link: siteMap.events}]}}
      >
        <EventsItem {...data.data[0]} />
      </MasterPage>
    )
  )
}

export const getServerSideProps: GetServerSideProps = async ({query, req}) => {
  const {
    data: {
      attributes: {cover, coverMobile},
    },
  } = await getApiSingleResponse<TApiEventsLandingPage>({
    req,
    endpoint: 'events-landing-page',
    populate: ['cover', 'coverMobile'],
  })

  const [slug] = query.slug as string[]
  const payloads: IGetApiCollectionResponseParams<TApiEvent>[] = [
    {endpoint: 'events', filters: [{key: 'slug', value: [slug]}], populateRaw: populateDynamicZone},
  ]
  const {dehydratedState, hasData} = await getDehydratedState({payloads, req})

  return hasData
    ? {
        props: {
          cover,
          coverMobile,
          dehydratedState,
          payloads,
        },
      }
    : {
        notFound: true,
      }
}

export default Page
