import React from 'react'
import {Anchor, Box, Text} from '@effortless-ui'
import {GetServerSideProps, NextPage} from 'next'
import Image from 'next/image'

import MasterPage from '@/app/components/masterpages/masterpage'
import {PaginatedContent} from '@/app/components/ui'
import {TApiManagement} from '@/app/features/api/types'
import {getDehydratedState, IGetApiResponseParams, IPageWithPayload} from '@/app/features/api/utils'

const Page: NextPage<IPageWithPayload<TApiManagement>> = ({payload}) => {
  return (
    <MasterPage subtitle="Kontakt">
      <Text tag="h1">Kontakt</Text>
      <PaginatedContent payload={payload}>
        {(data) => (
          <Box tag="ul" composition={['semanticList']}>
            {data.map(({attributes: {email, name, photo, title}, id}) => (
              <Box key={id} tag="li">
                <Image src={`${process.env.NEXT_PUBLIC_DATABASE_URL}${photo.data.attributes.url}`} alt={name} width={256} height={256} />
                <strong>{name}</strong>
                <br />
                {title}
                <br />
                <Anchor href={`mailto:${email}`}>{email}</Anchor>
              </Box>
            ))}
          </Box>
        )}
      </PaginatedContent>
    </MasterPage>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const payload: IGetApiResponseParams<TApiManagement> = {endpoint: 'staff', populate: ['photo'], sort: [['id']]}
  const {dehydratedState} = await getDehydratedState({payload, req})

  return {
    props: {dehydratedState, payload},
  }
}

export default Page
