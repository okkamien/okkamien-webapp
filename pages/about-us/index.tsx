import React from 'react'
import {GetServerSideProps, NextPage} from 'next'

import {DynamicZone, populateDynamicZone, TApiDynamicZone} from '@/app/components/content'
import {TwoColumns} from '@/app/components/layout'
import MasterPage from '@/app/components/masterpages/masterpage'
import {getApiSingleResponse, IApiImage, TApiAboutUsPage} from '@/app/features/api'

interface IAboutUsPageProps {
  cover: IApiImage
  zones: TApiDynamicZone[]
}

const Page: NextPage<IAboutUsPageProps> = ({cover, zones}) => {
  return (
    <MasterPage breadcrumbs={{current: 'O nas'}} coverImage={cover}>
      <TwoColumns title="O nas">
        <DynamicZone title="o nas" zones={zones} />
      </TwoColumns>
    </MasterPage>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const {
    data: {
      attributes: {content, cover},
    },
  } = await getApiSingleResponse<TApiAboutUsPage>({req, endpoint: 'about-us', populateRaw: {...populateDynamicZone, cover: '*'}})

  return {
    props: {zones: content, cover},
  }
}

export default Page
