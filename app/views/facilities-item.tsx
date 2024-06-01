import React, {FC, Fragment} from 'react'
import {Anchor, Box, Text} from '@effortless-ui'
import {IconBrandFacebook} from '@tabler/icons-react'
import Link from 'next/link'

import {ShallowTile} from '@/app/components/ui'
import {TApiFacility} from '@/app/features/api/types'
import {theme} from '@/app/styles'

type IFacilityItemViewProps = TApiFacility

export const FacilityItemView: FC<IFacilityItemViewProps> = ({
  attributes: {address, description, email, facebook, name, phone, splitNameLeft, splitNameRight, thumbnail},
}) => {
  return (
    <ShallowTile
      title={splitNameLeft && splitNameRight ? [splitNameLeft, splitNameRight] : name}
      image={`${process.env.NEXT_PUBLIC_DATABASE_URL}${thumbnail.data.attributes.url}`}
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
  )
}
