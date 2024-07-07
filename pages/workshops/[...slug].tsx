import React from 'react'
import {useQuery} from '@tanstack/react-query'
import {GetServerSideProps, NextPage} from 'next'

import {populateDynamicZone, WorkshopItem} from '@/app/components/content'
import MasterPage from '@/app/components/masterpages/masterpage'
import {siteMap} from '@/app/dictionaries/site.dictionary'
import {
  getApiCollectionResponse,
  getDehydratedState,
  getQueryKey,
  IGetApiCollectionResponseParams,
  IPageWithPayload,
  TApiWorkshop,
} from '@/app/features/api'

const Page: NextPage<IPageWithPayload<[TApiWorkshop]>> = ({payloads: [payload]}) => {
  const {data, isSuccess} = useQuery({
    queryKey: getQueryKey({payload}),
    queryFn: () => getApiCollectionResponse(payload),
  })

  return (
    isSuccess && (
      <MasterPage breadcrumbs={{current: data.data[0].attributes.name, links: [{label: 'Pracownie', link: siteMap.workshops}]}}>
        <WorkshopItem {...data.data[0]} />
      </MasterPage>
    )
  )
}

export const getServerSideProps: GetServerSideProps = async ({query, req}) => {
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
        props: {dehydratedState, payloads},
      }
    : {
        notFound: true,
      }
}

export default Page
