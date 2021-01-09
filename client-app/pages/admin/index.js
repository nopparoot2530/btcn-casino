import Head from 'next/head';
import styles from '../../styles/Home.module.scss';
import client from '../../utils/axiosConfig';
import React from 'react';
import { useRouter } from 'next/router'


export default function Admin() {

  const [isLoading, setIsLoading] = React.useState(true);
  const router = useRouter();

  React.useEffect(() => {
    console.log(process.env.apiBaseUrl);
    const token = sessionStorage.getItem('_at');
    if (token !== null || token !== undefined)
      client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    client('/auth/me')
      .catch(err => router.push('/login'))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div>
        <div>Loading</div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      ADMIN
    </div>
  )
}
