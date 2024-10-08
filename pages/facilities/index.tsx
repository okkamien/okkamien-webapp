import React from 'react'
import {Text} from '@effortless-ui'
import {useQuery} from '@tanstack/react-query'
import {GetServerSideProps, NextPage} from 'next'

import {FacilityItemView} from '@/app/components/content'
import MasterPage from '@/app/components/masterpages/masterpage'
import {TilesList, Title} from '@/app/components/ui'
import {
  getApiCollectionResponse,
  getApiSingleResponse,
  getDehydratedState,
  getQueryKey,
  IApiImage,
  IGetApiCollectionResponseParams,
  IPageWithPayload,
  TApiFacilitiesLandingPage,
  TApiFacility,
  TApiWorkshop,
} from '@/app/features/api'
import {theme} from '@/app/styles'
import {sortByIdList} from '@/app/utils'

interface IWorkshopPageProps {
  cover: IApiImage
  coverMobile?: IApiImage
  ids: string[]
  intro: string
}

const Page: NextPage<IPageWithPayload<[TApiFacility]> & IWorkshopPageProps> = ({cover, coverMobile, intro, ids, payloads: [payload]}) => {
  const {data, isSuccess} = useQuery({
    queryKey: getQueryKey({payload}),
    queryFn: () => getApiCollectionResponse(payload),
  })

  return (
    <MasterPage breadcrumbs={{current: 'Placówki'}} coverImage={cover} coverImageMobile={coverMobile}>
      <Title cs={{mb: theme.spacing.ms}}>Placówki</Title>
      <Text cs={{mb: theme.spacing.xxl, fontWeight: 300}}>{intro}</Text>
      {isSuccess && (
        <TilesList
          cols={1}
          tiles={data.data
            .sort((a, b) => sortByIdList(ids, a, b))
            .map((facility, i) => (
              <FacilityItemView key={i} {...facility} />
            ))}
          cs={{mb: theme.gap}}
        />
      )}
    </MasterPage>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const {
    data: {
      attributes: {cover, coverMobile, intro, facilities},
    },
  } = await getApiSingleResponse<TApiFacilitiesLandingPage>({
    req,
    endpoint: 'facilities-landing-page',
    populate: ['cover', 'coverMobile', 'facilities'],
  })
  const ids = facilities?.data.map(({id}) => id.toString()) ?? []

  const payloads: IGetApiCollectionResponseParams<TApiWorkshop>[] = [
    {endpoint: 'facilities', filters: [{key: 'id', value: ids, operator: 'containsi'}], populate: [['thumbnail']]},
  ]
  const {dehydratedState} = await getDehydratedState({payloads, req})

  return {
    props: {
      cover,
      coverMobile,
      dehydratedState,
      ids,
      intro,
      payloads,
    },
  }
}

export default Page
