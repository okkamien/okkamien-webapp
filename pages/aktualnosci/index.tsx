import React from 'react'
import {Anchor, Box, Text} from '@effortless-ui'
import {GetServerSideProps, NextPage} from 'next'
import Link from 'next/link'

import MasterPage from '@/app/components/masterpages/masterpage'
import {PaginatedContent} from '@/app/components/ui'
import {siteMap} from '@/app/dictionaries/site.dictionary'
import {TApiNews} from '@/app/features/api/types'
import {getDehydratedState, IGetApiResponseParams, IPageWithPayload} from '@/app/features/api/utils'

const Page: NextPage<IPageWithPayload<TApiNews>> = ({payload}) => {
  return (
    <MasterPage subtitle="Aktualności">
      <Text tag="h1">Aktualności</Text>
      <PaginatedContent payload={payload}>
        {(data) => (
          <Box tag="ul">
            {data.map(({attributes: {slug, title}, id}) => (
              <Box key={id} tag="li">
                <Link href={`${siteMap.news}/${slug}`} legacyBehavior passHref>
                  <Anchor>{title}</Anchor>
                </Link>
              </Box>
            ))}
          </Box>
        )}
      </PaginatedContent>
    </MasterPage>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const payload: IGetApiResponseParams<TApiNews> = {endpoint: 'news', sort: [['id', 'desc']], pagination: {pageSize: 10}}
  const {dehydratedState} = await getDehydratedState({payload, req})

  return {
    props: {dehydratedState, payload},
  }
}

export default Page
