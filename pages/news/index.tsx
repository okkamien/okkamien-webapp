import React from 'react'
import {GetServerSideProps, NextPage} from 'next'

import MasterPage from '@/app/components/masterpages/masterpage'
import {Tile, TilesList, Title} from '@/app/components/ui'
import {getDehydratedState, IGetApiCollectionResponseParams, IPageWithPayload, TApiNews} from '@/app/features/api'
import {DynamicContent} from '@/app/features/dynamic-content'
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
      <DynamicContent payload={payload} filters={[{type: 'datepicker', key: 'date'}]} scrollToElement={scrollToElement}>
        {(data) => (
          <TilesList
            cols={[1, 2, 3]}
            tiles={data.map((item, i) => (
              <Tile key={i} {...mapApiNewsToTile(item)} />
            ))}
          />
        )}
      </DynamicContent>
    </MasterPage>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const payloads: IGetApiCollectionResponseParams<TApiNews>[] = [{endpoint: 'news', sort: [['date', 'desc']]}]
  const {dehydratedState} = await getDehydratedState({payloads, req})

  return {
    props: {dehydratedState, payloads},
  }
}

export default Page
