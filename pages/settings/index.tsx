import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Container, Button } from '@chakra-ui/react'
import { firebaseAuth } from '../../firebase/config'

const Settings: NextPage = () => {
  const router = useRouter()
  const logout = () => {
    firebaseAuth
      .signOut()
      .then(() => {
        localStorage.removeItem('access_token')
        router.push('/')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <Container>
        <Button onClick={logout}>ログアウト</Button>
      </Container>
    </>
  )
}
export default Settings
