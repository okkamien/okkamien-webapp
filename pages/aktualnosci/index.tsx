import React from 'react'
import {useQuery} from 'react-query'
import {Anchor, Box, Text} from '@effortless-ui'
import {GetServerSideProps, NextPage} from 'next'
import Link from 'next/link'

import MasterPage from '@/app/components/masterpages/masterpage'
import {siteMap} from '@/app/dictionaries/site.dictionary'
import {TApiNews} from '@/app/features/api/types'
import {getApiResponse, IGetApiResponseParams, IPageWithInitialData} from '@/app/features/api/utils'

const Page: NextPage<IPageWithInitialData<TApiNews>> = ({initialData, payload}) => {
  const {data, isSuccess} = useQuery({initialData, queryKey: payload.endpoint, queryFn: () => getApiResponse<TApiNews>(payload)})

  return (
    <MasterPage subtitle="Aktualności">
      <Text tag="h1">Aktualności</Text>
      {isSuccess && (
        <Box tag="ul">
          {data.data.map(({attributes: {slug, title}, id}) => (
            <Box key={id} tag="li">
              <Link href={`${siteMap.news}/${slug}`} legacyBehavior passHref>
                <Anchor>{title}</Anchor>
              </Link>
            </Box>
          ))}
        </Box>
      )}
    </MasterPage>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const payload: IGetApiResponseParams<TApiNews> = {endpoint: 'news', sort: [['id', 'desc']]}
  const initialData = await getApiResponse<TApiNews>({req, ...payload})

  return {
    props: {
      initialData,
      payload,
    },
  }
}

export default Page
