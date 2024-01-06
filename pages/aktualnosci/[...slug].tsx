import React from 'react'
import {useQuery} from 'react-query'
import {Anchor, Text} from '@effortless-ui'
import {GetServerSideProps, NextPage} from 'next'
import Link from 'next/link'

import MasterPage from '@/app/components/masterpages/masterpage'
import {siteMap} from '@/app/dictionaries/site.dictionary'
import {TApiNews} from '@/app/features/api/types'
import {getApiResponse, IGetApiResponseParams, IPageWithInitialData} from '@/app/features/api/utils'

const Page: NextPage<IPageWithInitialData<TApiNews>> = ({initialData, payload, slug}) => {
  const {data, isSuccess} = useQuery({
    initialData,
    queryKey: [`${payload.endpoint}-${slug}`],
    queryFn: () => getApiResponse<TApiNews>(payload),
  })
  const news = isSuccess ? data.data[0] : undefined

  return (
    <MasterPage subtitle={[...(news ? [news.attributes.title] : []), 'Aktualności']}>
      <Text tag="h1">{news?.attributes.title}</Text>
      <Text>{news?.attributes.content}</Text>
      <Link href={siteMap.news} legacyBehavior passHref>
        <Anchor>Wróć do listy</Anchor>
      </Link>
    </MasterPage>
  )
}

export const getServerSideProps: GetServerSideProps = async ({query, req}) => {
  const [slug] = query.slug as string[]

  const payload: IGetApiResponseParams<TApiNews> = {endpoint: 'news', filters: {slug: [slug]}}
  const initialData = await getApiResponse<TApiNews>({req, ...payload})

  return initialData.data.length
    ? {
        props: {
          initialData,
          payload,
          slug,
        },
      }
    : {
        notFound: true,
      }
}

export default Page
