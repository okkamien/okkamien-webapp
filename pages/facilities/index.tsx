import React from 'react'
import {Text} from '@effortless-ui'
import {useQuery} from '@tanstack/react-query'
import {GetServerSideProps, NextPage} from 'next'

import MasterPage from '@/app/components/masterpages/masterpage'
import {TilesList, Title} from '@/app/components/ui'
import {TApiFacilitiesLandingPage, TApiFacility, TApiWorkshop} from '@/app/features/api/types'
import {
  getApiCollectionResponse,
  getApiSingleResponse,
  getDehydratedState,
  getQueryKey,
  IGetApiCollectionResponseParams,
  IPageWithPayload,
} from '@/app/features/api/utils'
import {theme} from '@/app/styles'
import {FacilityItemView} from '@/app/views'

interface IWorkshopPageProps {
  ids: number[]
  intro: string
}

const Page = () => {
  // const Page: NextPage<IPageWithPayload<[TApiFacility]> & IWorkshopPageProps> = ({intro, ids, payloads: [payload]}) => {
  // const {data, isSuccess} = useQuery({
  //   queryKey: getQueryKey({payload}),
  //   queryFn: () => getApiCollectionResponse(payload),
  // })

  return (
    <MasterPage breadcrumbs={{current: 'Placówki'}}>
      <Title cs={{mb: theme.spacing.ms}}>Placówki</Title>
      {/* <Text cs={{mb: theme.spacing.xxl, fontWeight: 300}}>{intro}</Text> */}
      {/* {isSuccess && (
        <TilesList
          cols={1}
          tiles={data.data
            .sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id))
            .map((facility, i) => (
              <FacilityItemView key={i} {...facility} />
            ))}
          cs={{mb: theme.gap}}
        />
      )} */}
    </MasterPage>
  )
}

// export const getServerSideProps: GetServerSideProps = async ({req}) => {
//   const {
//     data: {
//       attributes: {intro, facilities},
//     },
//   } = await getApiSingleResponse<TApiFacilitiesLandingPage>({
//     req,
//     endpoint: 'facilities-landing-page',
//     populate: ['facilities'],
//   })
//   const ids = facilities?.data.map(({id}) => id) ?? []

//   const payloads: IGetApiCollectionResponseParams<TApiWorkshop>[] = [
//     {endpoint: 'facilities', filters: {id: [ids, 'containsi']}, populate: ['thumbnail']},
//   ]
//   const {dehydratedState} = await getDehydratedState({payloads, req})

//   return {
//     props: {dehydratedState, intro, ids, payloads},
//   }
// }

export default Page
