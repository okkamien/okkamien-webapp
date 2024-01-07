import React from 'react'
import {Anchor, Box, Text} from '@effortless-ui'
import {GetServerSideProps, NextPage} from 'next'
import Link from 'next/link'

import MasterPage from '@/app/components/masterpages/masterpage'
import {PaginatedContent} from '@/app/components/ui'
import {siteMap} from '@/app/dictionaries/site.dictionary'
import {TApiEvent} from '@/app/features/api/types'
import {getDehydratedState, IGetApiResponseParams, IPageWithPayload} from '@/app/features/api/utils'

const Page: NextPage<IPageWithPayload<TApiEvent>> = ({payloads}) => {
  const [upcomingPayload, pastPayload] = payloads

  return (
    <MasterPage subtitle="Wydarzenia">
      <Text tag="h1">Wydarzenia</Text>
      <Text tag="h2">Nadchodzące</Text>
      <PaginatedContent payload={upcomingPayload}>
        {(data) => (
          <Box tag="ul">
            {data.map(({attributes: {date, location, slug, title}, id}) => (
              <Box key={id} tag="li">
                <Link href={`${siteMap.events}/${slug}`} legacyBehavior passHref>
                  <Anchor>{title}</Anchor>
                </Link>
                <Text>
                  {location}, {new Date(date).toLocaleString()}
                </Text>
              </Box>
            ))}
          </Box>
        )}
      </PaginatedContent>
      <Text tag="h2">Minione</Text>
      <PaginatedContent payload={pastPayload}>
        {(data) => (
          <Box tag="ul">
            {data.map(({attributes: {date, location, slug, title}, id}) => (
              <Box key={id} tag="li">
                <Link href={`${siteMap.events}/${slug}`} legacyBehavior passHref>
                  <Anchor>{title}</Anchor>
                </Link>
                <Text>
                  {location}, {new Date(date).toLocaleString()}
                </Text>
              </Box>
            ))}
          </Box>
        )}
      </PaginatedContent>
    </MasterPage>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const today = new Date().toISOString()
  const payloads: IGetApiResponseParams<TApiEvent>[] = [
    {endpoint: 'events', filters: {date: [today, 'gte']}, sort: [['date']]},
    {endpoint: 'events', filters: {date: [today, 'lt']}, sort: [['date']]},
  ]
  const {dehydratedState} = await getDehydratedState({payloads, req})

  return {
    props: {dehydratedState, payloads},
  }
}

export default Page
