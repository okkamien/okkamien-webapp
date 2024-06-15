import React from 'react'
import {GetServerSideProps, NextPage} from 'next'

import MasterPage from '@/app/components/masterpages/masterpage'
import {ISelectOption, Tile, TilesList, Title} from '@/app/components/ui'
import {TApiEvent, TApiLocation} from '@/app/features/api/types'
import {getApiCollectionResponse, getDehydratedState, IGetApiCollectionResponseParams, IPageWithPayload} from '@/app/features/api/utils'
import {DynamicContent} from '@/app/features/dynamic-content'
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
      <DynamicContent
        payload={payload}
        filters={[
          {
            type: 'select',
            key: 'location',
            path: ['id'],
            options: {
              label: 'Lokalizacja',
              options: locations,
            },
          },
          {
            type: 'datepicker',
            key: 'from',
            options: {
              endKey: 'to',
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
      </DynamicContent>
    </MasterPage>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const {data} = await getApiCollectionResponse<TApiLocation>({req, endpoint: 'locations'})
  const locations: ISelectOption[] = data.map(({attributes: {name}, id}) => ({label: name, value: id.toString()}))

  const payloads: IGetApiCollectionResponseParams<TApiEvent>[] = [
    {endpoint: 'events', populate: ['location', 'thumbnail'], sort: [['from', 'desc']]},
  ]
  const {dehydratedState} = await getDehydratedState({payloads, req})

  return {
    props: {dehydratedState, locations, payloads},
  }
}

export default Page
