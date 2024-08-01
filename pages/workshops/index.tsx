import React from 'react'
import {Text} from '@effortless-ui'
import {useQuery} from '@tanstack/react-query'
import {GetServerSideProps, NextPage} from 'next'

import MasterPage from '@/app/components/masterpages/masterpage'
import {Tile, TilesList, Title} from '@/app/components/ui'
import {
  getApiCollectionResponse,
  getApiSingleResponse,
  getDehydratedState,
  getQueryKey,
  IApiImage,
  IGetApiCollectionResponseParams,
  IPageWithPayload,
  TApiWorkshop,
  TApiWorkshopsLandingPage,
} from '@/app/features/api'
import {theme} from '@/app/styles'
import {mapApiWorkshopToTile, sortByIdList} from '@/app/utils'

interface IWorkshopPageProps {
  cover: IApiImage
  ids: string[]
  intro: string
}

const Page: NextPage<IPageWithPayload<[TApiWorkshop]> & IWorkshopPageProps> = ({cover, intro, ids, payloads: [payload]}) => {
  const {data, isSuccess} = useQuery({
    queryKey: getQueryKey({payload}),
    queryFn: () => getApiCollectionResponse(payload),
  })

  return (
    <MasterPage breadcrumbs={{current: 'Pracownie'}} coverImage={cover}>
      <Title cs={{mb: theme.spacing.ms}}>Pracownie</Title>
      <Text cs={{mb: theme.spacing.xxl, fontWeight: 300}}>{intro}</Text>
      {isSuccess && (
        <>
          <TilesList
            cols={[1, 2]}
            tiles={data.data
              .sort((a, b) => sortByIdList(ids, a, b))
              .slice(0, 2)
              .map((item, i) => (
                <Tile key={i} {...mapApiWorkshopToTile(item)} />
              ))}
            cs={{mb: theme.gap}}
          />
          <TilesList
            tiles={data.data
              .sort((a, b) => sortByIdList(ids, a, b))
              .slice(2)
              .map((item, i) => (
                <Tile key={i} {...mapApiWorkshopToTile(item)} />
              ))}
          />
        </>
      )}
    </MasterPage>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const {
    data: {
      attributes: {cover, intro, workshops},
    },
  } = await getApiSingleResponse<TApiWorkshopsLandingPage>({
    req,
    endpoint: 'workshops-landing-page',
    populate: ['cover', 'workshops'],
  })
  const ids = workshops?.data.map(({id}) => id.toString()) ?? []

  const payloads: IGetApiCollectionResponseParams<TApiWorkshop>[] = [
    {endpoint: 'workshops', filters: [{key: 'id', value: ids, operator: 'containsi'}], populate: [['thumbnail']]},
  ]
  const {dehydratedState} = await getDehydratedState({payloads, req})

  return {
    props: {dehydratedState, cover, intro, ids, payloads},
  }
}

export default Page
