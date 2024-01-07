import React from 'react'
import {Anchor, Text} from '@effortless-ui'
import {useQuery} from '@tanstack/react-query'
import {GetServerSideProps, NextPage} from 'next'
import Link from 'next/link'

import MasterPage from '@/app/components/masterpages/masterpage'
import {siteMap} from '@/app/dictionaries/site.dictionary'
import {TApiNews} from '@/app/features/api/types'
import {getApiResponse, getDehydratedState, getQueryKey, IGetApiResponseParams, IPageWithPayload} from '@/app/features/api/utils'

const Page: NextPage<IPageWithPayload<TApiNews>> = ({payloads}) => {
  const [payload] = payloads
  const {data, isSuccess} = useQuery({
    queryKey: getQueryKey({payload}),
    queryFn: () => getApiResponse(payload),
  })
  const news = isSuccess ? data.data[0] : undefined

  return (
    news && (
      <MasterPage subtitle={[news.attributes.title, 'Aktualności']}>
        <Text tag="h1">{news.attributes.title}</Text>
        <Text>{news.attributes.content}</Text>
        <Link href={siteMap.news} legacyBehavior passHref>
          <Anchor>Wróć do listy</Anchor>
        </Link>
      </MasterPage>
    )
  )
}

export const getServerSideProps: GetServerSideProps = async ({query, req}) => {
  const [slug] = query.slug as string[]
  const payloads: IGetApiResponseParams<TApiNews>[] = [{endpoint: 'news', filters: {slug: [slug]}}]
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
