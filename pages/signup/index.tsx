import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Container, VStack, Input, Button, IconButton, Heading } from '@chakra-ui/react'
import { ChevronLeftIcon } from '@chakra-ui/icons'

const SingUp: NextPage = () => {
  const router = useRouter()
  const pageBack = () => router.back()
  const apiTest = () => {
    axios
      .get('http://localhost:8080/api/v1/public')
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <Container>
        <IconButton as="a" my={3} aria-label="戻る" icon={<ChevronLeftIcon />} onClick={pageBack} />
        <VStack spacing={10}>
          <Heading as="h1">アカウント登録</Heading>
          <VStack spacing={5} w="100%">
            <Input placeholder="メールアドレス" type="email" />
            <Input placeholder="パスワード" type="password" />
          </VStack>
          <Button colorScheme="teal" onClick={apiTest}>
            メールアドレスで登録
          </Button>
        </VStack>
      </Container>
    </>
  )
}
export default SingUp
