import React from 'react'
import {Text} from '@effortless-ui'
import {useQuery} from '@tanstack/react-query'
import {GetServerSideProps, NextPage} from 'next'

import MasterPage from '@/app/components/masterpages/masterpage'
import {Tile, TilesList, Title} from '@/app/components/ui'
import {TApiWorkshop, TApiWorkshopsLandingPage} from '@/app/features/api/types'
import {
  getApiCollectionResponse,
  getApiSingleResponse,
  getDehydratedState,
  getQueryKey,
  IGetApiCollectionResponseParams,
  IPageWithPayload,
} from '@/app/features/api/utils'
import {theme} from '@/app/styles'
import {mapApiWorkshopToTile} from '@/app/utils'

interface IWorkshopPageProps {
  ids: number[]
  intro: string
}

const Page: NextPage<IPageWithPayload<[TApiWorkshop]> & IWorkshopPageProps> = ({intro, ids, payloads: [payload]}) => {
  const {data, isSuccess} = useQuery({
    queryKey: getQueryKey({payload}),
    queryFn: () => getApiCollectionResponse(payload),
  })

  return (
    <MasterPage breadcrumbs={{current: 'Pracownie'}}>
      <Title cs={{mb: theme.spacing.ms}}>Pracownie</Title>
      <Text cs={{mb: theme.spacing.xxl, fontWeight: 300}}>{intro}</Text>
      {isSuccess && (
        <>
          <TilesList
            cols={[1, 2]}
            tiles={data.data
              .sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id))
              .slice(0, 2)
              .map((item, i) => (
                <Tile key={i} {...mapApiWorkshopToTile(item)} />
              ))}
            cs={{mb: theme.gap}}
          />
          <TilesList
            tiles={data.data
              .sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id))
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

export const getServerSideProps: GetServerSideProps = async () => {
  const {
    data: {
      attributes: {intro, workshops},
    },
  } = await getApiSingleResponse<TApiWorkshopsLandingPage>({
    endpoint: 'workshops-landing-page',
    populate: ['workshops'],
  })
  const ids = workshops?.data.map(({id}) => id) ?? []

  const payloads: IGetApiCollectionResponseParams<TApiWorkshop>[] = [
    {endpoint: 'workshops', filters: {id: [ids, 'containsi']}, populate: ['thumbnail']},
  ]
  const {dehydratedState} = await getDehydratedState({payloads})

  return {
    props: {dehydratedState, intro, ids, payloads},
  }
}

export default Page
