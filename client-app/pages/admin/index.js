import Head from 'next/head';
import styles from '../../styles/Admin.module.scss';
import client from '../../utils/axiosConfig';
import React from 'react';
import { useRouter } from 'next/router'
import Button from '@material-ui/core/Button';


export default function Admin() {

  const [isLoading, setIsLoading] = React.useState(true);
  const [casinos, setCasinos] = React.useState([]);
  const [refreshFlag, setRefreshFlag] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const token = sessionStorage.getItem('_at');
    if (token !== null || token !== undefined)
      client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    client('/auth/me')
      .catch(err => router.push('/login'))
      .finally(() => setIsLoading(false));
  }, []);

  React.useEffect(() => {
    client('/casino').then(res => setCasinos([...res.data,]));
  }, [])

  if (isLoading) {
    return (
      <div>
        <div>...Loading</div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.casinoListContainer}>
        <div className={styles.casinoListBody}>
          {
            casinos.map((casino, index) => (
              <div className={styles.casinoRow} key={index}>
                <div className={styles.casinoImageContainer}>
                  <img src={casino.image_link} />
                </div>
                <div className={styles.casinoName}>
                  <h3>
                    {casino.name}
                  </h3>
                </div>
                <div className={styles.buttonsContainer}>
                  <div>
                    <label htmlFor="upload-image-input">
                      <input accept="image/*" hidden id="upload-image-input" name="upload-image-input" multiple type="file" />
                      <Button variant="contained" component="span">Upload Image</Button>
                    </label>
                  </div>
                  <div><Button variant="contained" onClick={() => console.log(casino.name)}  >Edit</Button></div>
                  <div><Button variant="contained" onClick={() => console.log(casino.name)}  >Remove</Button></div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div >
  )
}

