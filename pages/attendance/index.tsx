import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { firebaseAuth } from '../../firebase/config';
import { useRouter } from 'next/router';
import { Container, Text, Table, Thead, Tbody, Tr, Th, Td, Flex, Spacer, IconButton, Box } from '@chakra-ui/react';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';

type TableRowProps = {
  month: string;
  attendance: {
    date: string;
    startTime: string;
    endTime: string;
    restTime: string;
    workingHours: string;
  }[];
};

const sampleData: TableRowProps[] = [
  {
    month: '2022-01',
    attendance: [
      { date: '1/10', startTime: '10:00', endTime: '19:00', restTime: '1:00', workingHours: '8:00' },
      { date: '1/11', startTime: '10:00', endTime: '19:00', restTime: '1:00', workingHours: '8:00' },
      { date: '1/12', startTime: '10:00', endTime: '19:00', restTime: '1:00', workingHours: '8:00' },
      { date: '1/13', startTime: '10:00', endTime: '19:00', restTime: '1:00', workingHours: '8:00' },
      { date: '1/14', startTime: '10:00', endTime: '19:00', restTime: '1:00', workingHours: '8:00' }
    ]
  },
  {
    month: '2021-12',
    attendance: [
      { date: '12/10', startTime: '10:00', endTime: '19:00', restTime: '1:00', workingHours: '8:00' },
      { date: '12/11', startTime: '10:00', endTime: '19:00', restTime: '1:00', workingHours: '8:00' },
      { date: '12/12', startTime: '10:00', endTime: '19:00', restTime: '1:00', workingHours: '8:00' },
      { date: '12/13', startTime: '10:00', endTime: '19:00', restTime: '1:00', workingHours: '8:00' },
      { date: '12/14', startTime: '10:00', endTime: '19:00', restTime: '1:00', workingHours: '8:00' }
    ]
  }
];

type dataRow = {
  date: string;
  startTime: string;
  endTime: string;
  restTime: string;
  workingHours: string;
};

const TableRow: NextPage<dataRow> = (props) => {
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

  const [currentMonth, setCurrentMonth] = useState(0);
  const [disabledPushPrev, setDisabledPushPrev] = useState(false);
  const [disabledPushNext, setDisabledPushNext] = useState(true);

  const prevMonth = () => {
    if (currentMonth !== sampleData.length - 1) {
      setCurrentMonth((prev) => prev + 1);
      setDisabledPushNext(false);
    } else {
      setDisabledPushPrev(true);
    }
  };

  const nextMonth = () => {
    if (currentMonth !== 0) {
      setCurrentMonth((prev) => prev - 1);
      setDisabledPushPrev(false);
    } else {
      setDisabledPushNext(true);
    }
  };

  if (!user) return <></>;

  return (
    <Container maxW="container.sm">
      <Flex alignItems="center" justifyContent="center">
        <IconButton
          onClick={prevMonth}
          disabled={disabledPushPrev || currentMonth === sampleData.length - 1}
          aria-label="前月へ"
          icon={<ArrowLeftIcon />}
        />
        <Spacer />
        <Text py={5} textAlign="center">
          {sampleData[currentMonth].month}
        </Text>
        <Spacer />
        <IconButton
          onClick={nextMonth}
          disabled={disabledPushNext || currentMonth === 0}
          aria-label="翌月へ"
          icon={<ArrowRightIcon />}
        />
      </Flex>

      <Box overflow="scroll">
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
            {sampleData[currentMonth].attendance.map((data, i) => (
              <TableRow key={i.toString()} {...data} />
            ))}
          </Tbody>
        </Table>
      </Box>
    </Container>
  );
};
export default Attendance;
