import React from 'react'
import {GetServerSideProps, NextPage} from 'next'

import MasterPage from '@/app/components/masterpages/masterpage'
import {PaginatedContent, Tile, TilesList, Title} from '@/app/components/ui'
import {TApiEvent} from '@/app/features/api/types'
import {getDehydratedState, IGetApiCollectionResponseParams, IPageWithPayload} from '@/app/features/api/utils'
import {useScrollRef} from '@/app/hooks'
import {theme} from '@/app/styles'
import {mapApiEventToTile} from '@/app/utils'

const Page: NextPage<IPageWithPayload<[TApiEvent, TApiEvent]>> = ({payloads: [payload]}) => {
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
            name: 'location',
            options: {
              title: 'Lokalizacja',
              multiple: true,
              options: [
                {label: 'Torwar', value: 'Torwar'},
                {label: 'Stadion Narodowy', value: 'Stadion Narodowy'},
              ],
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
  const payloads: IGetApiCollectionResponseParams<TApiEvent>[] = [
    {endpoint: 'events', filters: {from: [[new Date().toISOString()], 'gte']}, populate: ['thumbnail'], sort: [['from']]},
  ]
  const {dehydratedState} = await getDehydratedState({payloads, req})

  return {
    props: {dehydratedState, payloads},
  }
}

export default Page
