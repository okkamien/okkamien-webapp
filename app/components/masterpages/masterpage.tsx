import React, {FC, PropsWithChildren} from 'react'
import {CSObject} from '@effortless-ui'
import {Global} from '@emotion/react'
import Head from 'next/head'

import {DefaultTemplate, EmptyTemplate} from '@/app/components/masterpages/templates'
import {IBreadcrumbsProps} from '@/app/components/ui'
import {siteDescription, siteName} from '@/app/dictionaries/site.dictionary'

interface IMasterPageProps {
  bodyCss?: CSObject
  breadcrumbs?: IBreadcrumbsProps
  description?: string
  template?: 'default' | 'empty'
  title?: string
}

const MasterPage: FC<PropsWithChildren<IMasterPageProps>> = ({
  bodyCss,
  breadcrumbs,
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
          default: <DefaultTemplate breadcrumbs={breadcrumbs}>{children}</DefaultTemplate>,
          empty: <EmptyTemplate>{children}</EmptyTemplate>,
        }[template]
      }
    </>
  )
}

export default MasterPage
