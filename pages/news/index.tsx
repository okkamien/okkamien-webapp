/* eslint-disable */
import React from 'react'
import {GetServerSideProps, NextPage} from 'next'

import MasterPage from '@/app/components/masterpages/masterpage'
import {PaginatedContent, Tile, TilesList, Title} from '@/app/components/ui'
import {TApiNews} from '@/app/features/api/types'
import {getDehydratedState, IGetApiCollectionResponseParams, IPageWithPayload} from '@/app/features/api/utils'
import {useScrollRef} from '@/app/hooks'
import {theme} from '@/app/styles'
import {mapApiNewsToTile} from '@/app/utils'

const Page: NextPage<IPageWithPayload<[TApiNews]>> = ({payloads: [payload]}) => {
  const {scrollRef, scrollToElement} = useScrollRef()

  return (
    <MasterPage breadcrumbs={{current: 'Aktualności'}}>
      <Title ref={scrollRef} cs={{mb: [theme.spacing.l, theme.spacing.xxl]}}>
        Aktualności
      </Title>
      <PaginatedContent payload={payload} scrollToElement={scrollToElement}>
        {(data) => (
          <TilesList
            cols={[1, 2, 3]}
            tiles={data.map((item, i) => (
              <Tile key={i} {...mapApiNewsToTile(item)} />
            ))}
          />
        )}
      </PaginatedContent>
    </MasterPage>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const payloads: IGetApiCollectionResponseParams<TApiNews>[] = [{endpoint: 'news', sort: [['id', 'desc']]}]
  const {dehydratedState} = await getDehydratedState({payloads, req})

  return {
    props: {payloads},
  }
}

export default Page
