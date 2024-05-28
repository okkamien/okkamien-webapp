import React from 'react'
import {GetServerSideProps, NextPage} from 'next'

import MasterPage from '@/app/components/masterpages/masterpage'
import {PaginatedContent, Tile, TilesList, Title} from '@/app/components/ui'
import {TApiNews} from '@/app/features/api/types'
import {getDehydratedState, IGetApiResponseParams, IPageWithPayload} from '@/app/features/api/utils'
import {useScrollRef} from '@/app/hooks'
import {theme} from '@/app/styles'
import {mapApiNewsToTile} from '@/app/utils'

const Page: NextPage<IPageWithPayload<[unknown]>> = ({payloads: [payload]}) => {
  return (
    <MasterPage breadcrumbs={{current: 'Pracownie'}}>
      <Title cs={{mb: [theme.spacing.l, theme.spacing.xxl]}}>Pracownie</Title>
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
