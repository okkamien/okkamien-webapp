import React, {Fragment} from 'react'
import {Anchor, Box, Text} from '@effortless-ui'
import {IconBrandFacebook} from '@tabler/icons-react'
import {useQuery} from '@tanstack/react-query'
import {GetServerSideProps, NextPage} from 'next'
import Link from 'next/link'

import MasterPage from '@/app/components/masterpages/masterpage'
import {ShallowTile, TilesList, Title} from '@/app/components/ui'
import {TApiFacilitiesLandingPage, TApiFacility, TApiWorkshop} from '@/app/features/api/types'
import {
  getApiCollectionResponse,
  getApiSingleResponse,
  getDehydratedState,
  getQueryKey,
  IGetApiCollectionResponseParams,
  IPageWithPayload,
} from '@/app/features/api/utils'
import {theme} from '@/app/styles'

interface IWorkshopPageProps {
  ids: number[]
  intro: string
}

const Page: NextPage<IPageWithPayload<[TApiFacility]> & IWorkshopPageProps> = ({intro, ids, payloads: [payload]}) => {
  const {data, isSuccess} = useQuery({
    queryKey: getQueryKey({payload}),
    queryFn: () => getApiCollectionResponse(payload),
  })

  return (
    <MasterPage breadcrumbs={{current: 'Placówki'}}>
      <Title cs={{mb: theme.spacing.ms}}>Placówki</Title>
      <Text cs={{mb: theme.spacing.xxl, fontWeight: 300}}>{intro}</Text>
      {isSuccess && (
        <TilesList
          cols={1}
          tiles={data.data
            .sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id))
            .map(({attributes: {address, description, email, facebook, name, phone, splitNameLeft, splitNameRight, thumbnail}}, i) => (
              <ShallowTile
                title={splitNameLeft && splitNameRight ? [splitNameLeft, splitNameRight] : name}
                image={`${process.env.NEXT_PUBLIC_DATABASE_URL}${thumbnail.data.attributes.url}`}
                key={i}
              >
                <Text cs={{fontWeight: 300}}>{description}</Text>
                <Box cs={{fontWeight: 300}}>
                  <Text tag="h3" variant="h6" cs={{mb: theme.spacing.xxs, color: theme.color.primary}}>
                    Adres
                  </Text>
                  <Text tag="address" cs={{fontStyle: 'normal'}}>
                    {address.split('\n').map((text, j) => (
                      <Fragment key={j}>
                        {text}
                        <br />
                      </Fragment>
                    ))}
                  </Text>
                </Box>
                {(email || phone) && (
                  <Box cs={{fontWeight: 300}}>
                    <Text tag="h3" variant="h6" cs={{mb: theme.spacing.xxs, color: theme.color.primary}}>
                      Kontakt
                    </Text>
                    {phone && <>Tel. {phone}</>}
                    {email && phone && <br />}
                    {email && (
                      <>
                        Email:.{' '}
                        <Anchor href={`mailto:${email}`} cs={{color: theme.color.text}}>
                          {email}
                        </Anchor>
                      </>
                    )}
                  </Box>
                )}
                {facebook && (
                  <Link href={facebook} legacyBehavior passHref>
                    <Anchor
                      cs={{
                        display: 'flex',
                        alignItems: 'center',
                        alignSelf: 'flex-end',
                        columnGap: theme.spacing.xxs,
                        mt: 'auto',
                        color: theme.color.text,
                        textDecoration: 'none',
                      }}
                    >
                      Przejdź na
                      <IconBrandFacebook size={24} stroke={2} css={{color: theme.color.primary}} />
                    </Anchor>
                  </Link>
                )}
              </ShallowTile>
            ))}
          cs={{mb: theme.gap}}
        />
      )}
    </MasterPage>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const {
    data: {
      attributes: {intro, facilities},
    },
  } = await getApiSingleResponse<TApiFacilitiesLandingPage>({
    req,
    endpoint: 'facilities-landing-page',
    populate: ['facilities'],
  })
  const ids = facilities?.data.map(({id}) => id) ?? []

  const payloads: IGetApiCollectionResponseParams<TApiWorkshop>[] = [
    {endpoint: 'facilities', filters: {id: [ids, 'contains']}, populate: ['thumbnail']},
  ]
  const {dehydratedState} = await getDehydratedState({payloads, req})

  return {
    props: {dehydratedState, intro, ids, payloads},
  }
}

export default Page
