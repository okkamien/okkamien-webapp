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
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d997.031688877033!2d17.51642100570026!3d53.53358682076739!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47024d049a29b6b5%3A0xbcc29922e2af63e9!2sMiejsko-Gminny%20O%C5%9Brodek%20Kultury!5e0!3m2!1spl!2spl!4v1725376015179!5m2!1spl!2spl"
          width="800"
          height="600"
          css={{height: '600px'}}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
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
