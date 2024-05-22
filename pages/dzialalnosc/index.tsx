import React from 'react'
import {Box, Text} from '@effortless-ui'
import {NextPage} from 'next'

import MasterPage from '@/app/components/masterpages/masterpage'

const Page: NextPage = () => {
  return (
    <MasterPage subtitle="Działalność">
      <Box>
        <Text tag="h1">Działalność</Text>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ligula tellus, luctus id fermentum non, tincidunt sit amet erat.
          Suspendisse tristique ipsum magna, in tincidunt ipsum rhoncus vehicula. Morbi tincidunt leo porta, finibus nulla non, auctor dui.
          Donec nec mi eu lorem convallis hendrerit quis sit amet arcu. Integer imperdiet tortor ut enim elementum vehicula. Class aptent
          taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec et tellus quis risus accumsan maximus a ac
          nulla. Donec mollis turpis in ornare porttitor. Aliquam tristique, odio et dictum hendrerit, neque ipsum ultricies magna, eget
          molestie elit leo et leo. Quisque pellentesque efficitur pretium. Maecenas leo nibh, lobortis nec odio et, posuere vestibulum
          felis. Sed tortor mi, pulvinar maximus leo in, bibendum laoreet metus.
        </Text>
      </Box>
    </MasterPage>
  )
}

export default Page
