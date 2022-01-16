import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { firebaseAuth } from '../../firebase/config';
import { useRouter } from 'next/router';
import { Container, Text, Table, Thead, Tbody, Tr, Th, Td, Flex, Spacer, IconButton } from '@chakra-ui/react';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';

type TableRowProps = {
  date: string;
  startTime: string;
  endTime: string;
  restTime: string;
  workingHours: string;
};

const sampleData: TableRowProps[] = [
  { date: '10/10', startTime: '10:00', endTime: '19:00', restTime: '1:00', workingHours: '8:00' },
  { date: '10/11', startTime: '10:00', endTime: '19:00', restTime: '1:00', workingHours: '8:00' },
  { date: '10/12', startTime: '10:00', endTime: '19:00', restTime: '1:00', workingHours: '8:00' },
  { date: '10/13', startTime: '10:00', endTime: '19:00', restTime: '1:00', workingHours: '8:00' },
  { date: '10/14', startTime: '10:00', endTime: '19:00', restTime: '1:00', workingHours: '8:00' }
];

const TableRow: NextPage<TableRowProps> = (props) => {
  return (
    <Tr>
      <Td>{props.date}</Td>
      <Td>{props.startTime}</Td>
      <Td>{props.endTime}</Td>
      <Td>{props.restTime}</Td>
      <Td>{props.workingHours}</Td>
    </Tr>
  );
};

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
      <Flex alignItems="center" justifyContent="center">
        <IconButton aria-label="前月へ" icon={<ArrowLeftIcon />} />
        <Spacer />
        <Text py={5} textAlign="center">
          今月
        </Text>
        <Spacer />
        <IconButton aria-label="翌月へ" icon={<ArrowRightIcon />} />
      </Flex>
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
          {sampleData.map((data, i) => (
            <TableRow key={i.toString()} {...data} />
          ))}
        </Tbody>
      </Table>
    </Container>
  );
};
export default Attendance;
