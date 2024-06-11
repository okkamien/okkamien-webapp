import React from 'react'
import {GetServerSideProps, NextPage} from 'next'

import MasterPage from '@/app/components/masterpages/masterpage'
import {ISelectOption, PaginatedContent, Tile, TilesList, Title} from '@/app/components/ui'
import {TApiEvent, TApiLocation} from '@/app/features/api/types'
import {getApiCollectionResponse, getDehydratedState, IGetApiCollectionResponseParams, IPageWithPayload} from '@/app/features/api/utils'
import {useScrollRef} from '@/app/hooks'
import {theme} from '@/app/styles'
import {mapApiEventToTile} from '@/app/utils'

interface IEventsPageProps {
  locations: ISelectOption[]
}

const Page: NextPage<IPageWithPayload<[TApiEvent, TApiEvent]> & IEventsPageProps> = ({locations, payloads: [payload]}) => {
  const {scrollRef, scrollToElement} = useScrollRef()

  return (
    <MasterPage breadcrumbs={{current: 'Wydarzenia'}}>
      <Title ref={scrollRef} cs={{mb: [theme.spacing.l, theme.spacing.xxl]}}>
        Wydarzenia
      </Title>
      <PaginatedContent
        payload={payload}
        filters={[
          {
            type: 'select',
            path: ['location', 'id'],
            options: {
              title: 'Lokalizacja',
              options: locations,
            },
          },
        ]}
        scrollToElement={scrollToElement}
      >
        {(data) => (
          <TilesList
            tiles={data.map((item, i) => (
              <Tile key={i} {...mapApiEventToTile(item)} />
            ))}
          />
        )}
      </PaginatedContent>
    </MasterPage>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const {data} = await getApiCollectionResponse<TApiLocation>({
    req,
    endpoint: 'locations',
  })
  const locations: ISelectOption[] = data.map(({attributes: {name}, id}) => ({label: name, value: id.toString()}))

  const payloads: IGetApiCollectionResponseParams<TApiEvent>[] = [
    {endpoint: 'events', filters: {from: [[new Date().toISOString()], 'gte']}, populate: ['location', 'thumbnail'], sort: [['from']]},
  ]
  const {dehydratedState} = await getDehydratedState({payloads, req})

  return {
    props: {dehydratedState, locations, payloads},
  }
}

export default Page
