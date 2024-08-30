import React from 'react'
import {GetServerSideProps, NextPage} from 'next'

import {DynamicZone, populateDynamicZone, TApiDynamicZone} from '@/app/components/content'
import {TwoColumns} from '@/app/components/layout'
import MasterPage from '@/app/components/masterpages/masterpage'
import {getApiSingleResponse, IApiImage, TApiAboutUsPage} from '@/app/features/api'

interface IContactPageProps {
  zones: TApiDynamicZone[]
  cover: IApiImage
  coverMobile?: IApiImage
}

const Page: NextPage<IContactPageProps> = ({zones, cover, coverMobile}) => {
  return (
    <MasterPage breadcrumbs={{current: 'Kontakt'}} coverImage={cover} coverImageMobile={coverMobile}>
      <TwoColumns title="Kontakt">
        <DynamicZone title="Kontakt" zones={zones} />
      </TwoColumns>
    </MasterPage>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const {
    data: {
      attributes: {content, cover, coverMobile},
    },
  } = await getApiSingleResponse<TApiAboutUsPage>({
    req,
    endpoint: 'contact',
    populateRaw: {...populateDynamicZone, cover: '*', coverMobile: '*'},
  })

  return {
    props: {
      zones: content,
      cover,
      coverMobile,
    },
  }
}

export default Page
