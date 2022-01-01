import type { NextPage } from 'next'
import NextImage from 'next/image'
import NextLink from 'next/link'
import { Box, Button, Text, Link, Center } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

const Home: NextPage = () => {
  const [height, setHeight] = useState(0)
  useEffect(() => {
    const handleResize = () => setHeight(window.innerHeight)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Center h={height}>
      <Box textAlign="center">
        <div>
          <NextImage src="/logo_bonus-time.png" width={200} height={200} alt="BONUS TIME" />
        </div>
        <NextLink href="/login" passHref>
          <Button as="a" colorScheme="teal" mt={2}>
            ログイン
          </Button>
        </NextLink>
        <Text textAlign="center" pt={4}>
          新規アカウント登録は
          <NextLink href="/signup" passHref>
            <Link color="teal.500">こちら</Link>
          </NextLink>
        </Text>
      </Box>
    </Center>
  )
}

export default Home
