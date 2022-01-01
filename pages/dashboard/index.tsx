import type { NextPage } from 'next'
import NextLink from 'next/link'
import { Container, Text, Flex, Spacer, IconButton } from '@chakra-ui/react'
import { SettingsIcon, InfoIcon } from '@chakra-ui/icons'

const Dashboard: NextPage = () => {
  return (
    <>
      <Container>
        <Flex align="center" py={3}>
          <InfoIcon color="teal" />
          <Text pl={2}>UserName Rank:シルバー</Text>
          <Spacer />
          <NextLink href="/settings" passHref>
            <IconButton as="a" href="/" aria-label="設定" icon={<SettingsIcon />} />
          </NextLink>
        </Flex>
      </Container>
    </>
  )
}
export default Dashboard
