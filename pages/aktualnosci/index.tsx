import React from 'react'
import {Text} from '@effortless-ui'
import {GetServerSideProps, NextPage} from 'next'

import MasterPage from '@/app/components/masterpages/masterpage'
import {NewsList, PaginatedContent} from '@/app/components/ui'
import {TApiNews} from '@/app/features/api/types'
import {getDehydratedState, IGetApiResponseParams, IPageWithPayload} from '@/app/features/api/utils'

const Page: NextPage<IPageWithPayload<TApiNews>> = ({payloads}) => {
  const [payload] = payloads

  return (
    <MasterPage subtitle="Aktualności">
      <Text tag="h1">Aktualności</Text>
      <PaginatedContent payload={payload}>{(data) => <NewsList list={data} />}</PaginatedContent>
    </MasterPage>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const payloads: IGetApiResponseParams<TApiNews>[] = [{endpoint: 'news', sort: [['id', 'desc']]}]
  const {dehydratedState} = await getDehydratedState({payloads, req})

  return {
    props: {dehydratedState, payloads},
  }
}

export default Page
