import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { firebaseAuth } from '../../firebase/config';
import { useRouter } from 'next/router';
import { Container, Text, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const Attendance: NextPage = () => {
  const router = useRouter();

  // TODO: hookに切り出す
  const [user, setUser] = useState<User | null | undefined>(undefined);
  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/');
      } else {
        setUser(user);
      }
    });
    return () => unsubscribe();
  }, [router]);

  if (!user) return <></>;

  return (
    <Container maxW="container.sm">
      <Text py={5} textAlign="center">
        今月
      </Text>
      <Table variant="striped" size="sm">
        <Thead>
          <Tr>
            <Th>日付</Th>
            <Th>出勤</Th>
            <Th>退勤</Th>
            <Th>休憩</Th>
            <Th>就業時間</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>10/10</Td>
            <Td>--:--</Td>
            <Td>--:--</Td>
            <Td>--:--</Td>
            <Td>--:--</Td>
          </Tr>
          <Tr>
            <Td>10/10</Td>
            <Td>--:--</Td>
            <Td>--:--</Td>
            <Td>--:--</Td>
            <Td>--:--</Td>
          </Tr>
          <Tr>
            <Td>10/10</Td>
            <Td>--:--</Td>
            <Td>--:--</Td>
            <Td>--:--</Td>
            <Td>--:--</Td>
          </Tr>
        </Tbody>
      </Table>
    </Container>
  );
};
export default Attendance;
