import React, {FC, PropsWithChildren} from 'react'
import {CSObject} from '@effortless-ui'
import {Global} from '@emotion/react'
import Head from 'next/head'

import {DefaultTemplate, EmptyTemplate} from '@/app/components/masterpages/templates'
import {IBreadcrumbsProps} from '@/app/components/ui'
import {siteDescription, siteName} from '@/app/dictionaries/site.dictionary'
import {IApiImage, IApiSlide} from '@/app/features/api'

interface IMasterPageProps {
  bodyCss?: CSObject
  breadcrumbs?: IBreadcrumbsProps
  coverData?: IApiSlide[]
  coverImage?: IApiImage
  coverImageMobile?: IApiImage
  description?: string
  template?: 'default' | 'empty'
  title?: string
}

const MasterPage: FC<PropsWithChildren<IMasterPageProps>> = ({
  bodyCss,
  breadcrumbs,
  coverData,
  coverImage,
  coverImageMobile,
  children,
  description = siteDescription,
  template = 'default',
  title = siteName,
}) => {
  return (
    <>
      <Head>
        <title>
          {[breadcrumbs?.current, breadcrumbs?.links?.map(({label}) => label).reverse(), title]
            .flat()
            .filter((item) => Boolean(item))
            .join(' - ')}
        </title>
        <meta name="description" content={description} key="meta-description" />
        <link rel="icon" href="/favicon.ico" />
        {/* Generate your complete favicon using https://realfavicongenerator.net/ */}
      </Head>
      <Global styles={{body: bodyCss}} />
      {
        {
          default: (
            <DefaultTemplate breadcrumbs={breadcrumbs} coverData={coverData} coverImage={coverImage} coverImageMobile={coverImageMobile}>
              {children}
            </DefaultTemplate>
          ),
          empty: <EmptyTemplate>{children}</EmptyTemplate>,
        }[template]
      }
    </>
  )
}

export default MasterPage
