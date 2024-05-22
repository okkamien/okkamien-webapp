import React from 'react'
import {useQuery} from '@tanstack/react-query'
import {GetServerSideProps, NextPage} from 'next'

import {EventsItem} from '@/app/components/content'
import MasterPage from '@/app/components/masterpages/masterpage'
import {TApiEvent} from '@/app/features/api/types'
import {getApiResponse, getDehydratedState, getQueryKey, IGetApiResponseParams, IPageWithPayload} from '@/app/features/api/utils'

const Page: NextPage<IPageWithPayload<[TApiEvent]>> = ({payloads: [payload]}) => {
  const {data, isSuccess} = useQuery({
    queryKey: getQueryKey({payload}),
    queryFn: () => getApiResponse(payload),
  })

  return (
    isSuccess && (
      <MasterPage subtitle={[data.data[0].attributes.title, 'Wydarzenia']}>
        <EventsItem {...data.data[0]} />
      </MasterPage>
    )
  )
}

export const getServerSideProps: GetServerSideProps = async ({query, req}) => {
  const [slug] = query.slug as string[]
  const payloads: IGetApiResponseParams<TApiEvent>[] = [{endpoint: 'events', filters: {slug: [slug]}}]
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
