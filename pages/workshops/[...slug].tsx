import React from 'react'
import {useQuery} from '@tanstack/react-query'
import {GetServerSideProps, NextPage} from 'next'

import {populateDynamicZone, WorkshopItem} from '@/app/components/content'
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
  TApiWorkshop,
  TApiWorkshopsLandingPage,
} from '@/app/features/api'

interface IWorkshopPageProps {
  cover: IApiImage
  coverMobile?: IApiImage
}

const Page: NextPage<IPageWithPayload<[TApiWorkshop]> & IWorkshopPageProps> = ({payloads: [payload], cover, coverMobile}) => {
  const {data, isSuccess} = useQuery({
    queryKey: getQueryKey({payload}),
    queryFn: () => getApiCollectionResponse(payload),
  })

  return (
    isSuccess && (
      <MasterPage
        coverImage={cover}
        coverImageMobile={coverMobile}
        breadcrumbs={{current: data.data[0].attributes.name, links: [{label: 'Pracownie', link: siteMap.workshops}]}}
      >
        <WorkshopItem {...data.data[0]} />
      </MasterPage>
    )
  )
}

export const getServerSideProps: GetServerSideProps = async ({query, req}) => {
  const {
    data: {
      attributes: {cover, coverMobile},
    },
  } = await getApiSingleResponse<TApiWorkshopsLandingPage>({
    req,
    endpoint: 'workshops-landing-page',
    populate: ['cover', 'coverMobile'],
  })
  const [slug] = query.slug as string[]
  const payloads: IGetApiCollectionResponseParams<TApiWorkshop>[] = [
    {
      endpoint: 'workshops',
      filters: [{key: 'slug', value: [slug]}],
      populateRaw: populateDynamicZone,
    },
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
