import React from 'react'
import {GetServerSideProps, NextPage} from 'next'

import MasterPage from '@/app/components/masterpages/masterpage'
import {Tile, TilesList, Title} from '@/app/components/ui'
import {
  getApiSingleResponse,
  getDehydratedState,
  IApiImage,
  IGetApiCollectionResponseParams,
  IPageWithPayload,
  TApiNews,
  TApiNewsLandingPage,
} from '@/app/features/api'
import {DynamicContent} from '@/app/features/dynamic-content'
import {useScrollRef} from '@/app/hooks'
import {theme} from '@/app/styles'
import {mapApiNewsToTile} from '@/app/utils'

interface INewsPageProps {
  cover: IApiImage
}

const Page: NextPage<IPageWithPayload<[TApiNews]> & INewsPageProps> = ({cover, payloads: [payload]}) => {
  const {scrollRef, scrollToElement} = useScrollRef()

  return (
    <MasterPage breadcrumbs={{current: 'Aktualności'}} coverImage={cover}>
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
  const {
    data: {
      attributes: {cover},
    },
  } = await getApiSingleResponse<TApiNewsLandingPage>({
    req,
    endpoint: 'news-landing-page',
    populate: ['cover'],
  })
  const payloads: IGetApiCollectionResponseParams<TApiNews>[] = [{endpoint: 'news', sort: [['date', 'desc']]}]
  const {dehydratedState} = await getDehydratedState({payloads, req})

  return {
    props: {dehydratedState, cover, payloads},
  }
}

export default Page
