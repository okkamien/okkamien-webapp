import React from 'react'
import {dehydrate, QueryClient} from '@tanstack/react-query'
import axios from 'axios'
import {GetServerSideProps, NextPage} from 'next'

import MasterPage from '@/app/components/masterpages/masterpage'
import {PaginatedContent, Tile, TilesList, Title} from '@/app/components/ui'
import {DEFAULT_PAGE_SIZE} from '@/app/features/api/constants'
import {TApiNews} from '@/app/features/api/types'
import {
  getQueryKey,
  IGetApiCollectionResponseParams,
  IGetApiCollectionResponseSuccessResponse,
  IPageWithPayload,
  TGetApiResponseFilter,
} from '@/app/features/api/utils'
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const payloads: IGetApiCollectionResponseParams<TApiNews>[] = [{endpoint: 'news', sort: [['id', 'desc']]}]
  const queryClient = new QueryClient()
  const responses: IGetApiCollectionResponseSuccessResponse<TApiNews>[] = []

  await Promise.all(
    payloads.map(async (payload) => {
      const host = `https://okkamien-webapp.vercel.app`

      const {data: response} = await axios.get<IGetApiCollectionResponseSuccessResponse<TApiNews>>(`${host}/api/${payload.endpoint}`, {
        params: {
          filters: Object.entries(payload.filters ?? {}).reduce((t, c) => {
            const [key, [value, operator = 'eq']]: [string, TGetApiResponseFilter] = c

            return {...t, [key]: {[`$${operator}`]: value}}
          }, {}),
          pagination: payload.pagination ?? {pageSize: DEFAULT_PAGE_SIZE},
          populate: payload.populate ?? [],
          sort: (payload.sort ?? []).map(([key, operator = 'asc']) => `${String(key)}:${operator}`),
        },
      })

      responses.push(response)
      await queryClient.prefetchQuery({
        queryKey: getQueryKey({payload, currentPage: payload.pagination?.page, pageSize: payload.pagination?.pageSize}),
        queryFn: () => response,
      })
    }),
  )

  return {
    props: {dehydratedState: dehydrate(queryClient), payloads},
  }
}

export default Page
