import React from 'react'
import {Box} from '@effortless-ui'
import dayjs from 'dayjs'
import {NextPage} from 'next'

import MasterPage from '@/app/components/masterpages/masterpage'
import {Container, Tile} from '@/app/components/ui'
import {theme} from '@/app/styles'

const Page: NextPage = () => {
  return (
    <MasterPage subtitle="Test page" template="empty">
      <Container cs={{bg: theme.gradient.linearLight}}>
        <Box cs={{maxWidth: 408, minHeight: '100vh', py: 24}}>
          <Tile
            title="Lorem ipsum dolor sit amet"
            image="/temp/tile.jpg"
            tags={['Aliquet', 'Donec']}
            date={[dayjs(), dayjs().add(2, 'days')]}
            teaser="Donec porta, est sit amet blandit ornare, tellus elit gravida ante, id mollis eros augue sit amet nisl. Nam arcu eros, dapibus non finibus quis, porttitor in ante."
            // button="Zobacz więcej"
          />
        </Box>
      </Container>
    </MasterPage>
  )
}

export default Page
