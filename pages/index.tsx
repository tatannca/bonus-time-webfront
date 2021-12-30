import type { NextPage } from 'next'
import NextImage from 'next/image'
import NextLink from 'next/link'
import { Box, Button, Text, Link, Flex } from '@chakra-ui/react'

const Home: NextPage = () => {
  return (
    <Flex justify={'center'} alignItems={'center'} height={'100vh'} px={4}>
      <div>
        <Box>
          <Box textAlign={'center'}>
            <NextImage src="/logo_bonus-time.png" width={200} height={200} alt="BONUS TIME" />
          </Box>
          <NextLink href="/login" passHref>
            <Button as="a" colorScheme={'teal'} mt={2} width={'100%'}>
              ログイン
            </Button>
          </NextLink>
          <Text textAlign={'center'} pt={4}>
            新規アカウント登録は
            <NextLink href="/signup" passHref>
              <Link color="teal.500">こちら</Link>
            </NextLink>
            から
          </Text>
        </Box>
      </div>
    </Flex>
  )
}

export default Home
