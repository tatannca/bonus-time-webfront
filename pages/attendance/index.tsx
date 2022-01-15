import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { firebaseAuth } from '../../firebase/config';
import { useRouter } from 'next/router';

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

  return <div>Attendance</div>;
};
export default Attendance;
