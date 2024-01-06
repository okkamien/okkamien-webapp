import React from 'react'
import {useQuery} from 'react-query'
import {Anchor, Box, Text} from '@effortless-ui'
import {GetServerSideProps, NextPage} from 'next'
import Image from 'next/image'

import MasterPage from '@/app/components/masterpages/masterpage'
import {TApiManagement} from '@/app/features/api/types'
import {getApiResponse, IGetApiResponseParams, IPageWithInitialData} from '@/app/features/api/utils'

const Page: NextPage<IPageWithInitialData<TApiManagement>> = ({initialData, payload}) => {
  const {data, isSuccess} = useQuery({initialData, queryKey: payload.endpoint, queryFn: () => getApiResponse<TApiManagement>(payload)})

  return (
    <MasterPage subtitle="Kontakt">
      <Text tag="h1">Kontakt</Text>
      {isSuccess && (
        <Box tag="ul" composition={['semanticList']}>
          {data.data.map(({attributes: {email, name, photo, title}, id}) => (
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
    </MasterPage>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const payload: IGetApiResponseParams<TApiManagement> = {endpoint: 'managements', populate: ['photo'], sort: [['id']]}
  const initialData = await getApiResponse<TApiManagement>({req, ...payload})

  return {
    props: {
      initialData,
      payload,
    },
  }
}

export default Page
