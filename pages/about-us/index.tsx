import React from 'react'
import {GetServerSideProps, NextPage} from 'next'

import {DynamicZone, populateDynamicZone, TApiDynamicZone} from '@/app/components/content'
import {TwoColumns} from '@/app/components/layout'
import MasterPage from '@/app/components/masterpages/masterpage'
import {getApiSingleResponse, TApiAboutUsPage} from '@/app/features/api'

interface IAboutUsPageProps {
  zones: TApiDynamicZone[]
}

const Page: NextPage<IAboutUsPageProps> = ({zones}) => {
  return (
    <MasterPage breadcrumbs={{current: 'O nas'}}>
      <TwoColumns title="O nas">
        <DynamicZone title="o nas" zones={zones} />
      </TwoColumns>
    </MasterPage>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const {
    data: {
      attributes: {content},
    },
  } = await getApiSingleResponse<TApiAboutUsPage>({req, endpoint: 'about-us', populateRaw: populateDynamicZone})

  return {
    props: {zones: content},
  }
}

export default Page
