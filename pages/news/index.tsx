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

const Page: NextPage<IPageWithPayload<[TApiNews]> & {pro: string; host: string}> = ({pro, host, payloads: [payload]}) => {
  const {scrollRef, scrollToElement} = useScrollRef()

  console.log(`pro: ${pro}`)
  console.log(`host: ${host}`)

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
    props: {
      dehydratedState,
      payloads,
      pro: process.env.NEXT_PUBLIC_DATABASE_URL,
      host: `${req ? `${req.headers['x-forwarded-proto'] ?? 'http'}://${req.headers.host}` : ''}/api/${'news'}`,
    },
  }
}

export default Page
