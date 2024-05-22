import React from 'react'
import {GetServerSideProps, NextPage} from 'next'

import MasterPage from '@/app/components/masterpages/masterpage'
import {PaginatedContent, TilesList} from '@/app/components/ui'
import {TApiNews} from '@/app/features/api/types'
import {getDehydratedState, IGetApiResponseParams, IPageWithPayload} from '@/app/features/api/utils'
import {mapApiNewsToTile} from '@/app/utils'

const Page: NextPage<IPageWithPayload<[TApiNews]>> = ({payloads: [payload]}) => {
  return (
    <MasterPage subtitle="Aktualności">
      <PaginatedContent title="Aktualności" payload={payload}>
        {(data) => <TilesList tiles={data.map(mapApiNewsToTile)} />}
      </PaginatedContent>
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
