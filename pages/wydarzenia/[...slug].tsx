import React from 'react'
import {Anchor, Text} from '@effortless-ui'
import {useQuery} from '@tanstack/react-query'
import {GetServerSideProps, NextPage} from 'next'
import Link from 'next/link'

import MasterPage from '@/app/components/masterpages/masterpage'
import {siteMap} from '@/app/dictionaries/site.dictionary'
import {TApiEvent} from '@/app/features/api/types'
import {getApiResponse, getDehydratedState, getQueryKey, IGetApiResponseParams, IPageWithPayload} from '@/app/features/api/utils'

const Page: NextPage<IPageWithPayload<TApiEvent>> = ({payloads}) => {
  const [payload] = payloads
  const {data, isSuccess} = useQuery({
    queryKey: getQueryKey({payload}),
    queryFn: () => getApiResponse(payload),
  })
  const event = isSuccess ? data.data[0] : undefined

  return (
    event && (
      <MasterPage subtitle={[event.attributes.title, 'Wydarzenia']}>
        <Text tag="h1">{event.attributes.title}</Text>
        <Text>
          <strong>
            {event.attributes.location}, {new Date(event.attributes.date).toLocaleString()}
          </strong>
        </Text>
        <Text>{event.attributes.description}</Text>
        <Link href={siteMap.events} legacyBehavior passHref>
          <Anchor>Wróć do listy</Anchor>
        </Link>
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
