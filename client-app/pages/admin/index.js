import Head from 'next/head';
import styles from '../../styles/Admin.module.scss';
import client from '../../utils/axiosConfig';
import React from 'react';
import { useRouter } from 'next/router'
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Admin() {

  const [isLoading, setIsLoading] = React.useState(true);
  const [casinos, setCasinos] = React.useState([]);
  const [refreshFlag, setRefreshFlag] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(50);
  const [inputRefs, setInputRefs] = React.useState({});
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

  const uploadFile = (event, casinoId) => {
    setIsUploading(true);
    const form = new FormData();
    form.append('casino_image', event.target.files[0], event.target.files[0].name);
    client.post(`/casino/${casinoId}/upload-image`, form, {
      onUploadProgress: progressEvent => {
        setUploadProgress(Math.round(progressEvent.loaded / progressEvent.total * 100));
      }
    }).then(res => {
      console.log(res.data);
      changePictureOfCasinoInList(casinoId, res.data.image_link)
    })
      .catch()
      .finally(() => setIsUploading(false));
  }

  const removeCasinoFromState = (casinoId) => {
    setCasinos(prevState => prevState.map(casino => {
      if (casino.id !== casinoId)
        return casino;
    }));
  }

  const changePictureOfCasinoInList = (casinoId, newImageUrl) => {
    setCasinos(prevState => prevState.map(casino => {
      if (casino.id === casinoId)
        casino.image_link = newImageUrl
      return casino;
    }));
  }

  const removeCasino = id => {
    client.delete(`/casino/${id}`)
      .then(() => removeCasinoFromState(id))
      .catch();
  }

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
            isUploading && (
              <div className={styles.uploadModal}>
                <CircularProgress variant="determinate" value={uploadProgress} />
              </div>
            )
          }
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
                    <input
                      onChange={event => uploadFile(event, casino.id)}
                      ref={inputRef => setInputRefs(prevState => {
                        prevState[`${casino.id}_ref`] = inputRef;
                        return prevState;
                      })}
                      accept="image/*"
                      hidden
                      name="upload-image-input"
                      multiple
                      type="file"
                    />
                    <Button variant="contained" component="span" onClick={() => inputRefs[`${casino.id}_ref`].click()}>Upload Image</Button>
                  </div>
                  <div><Button variant="contained" onClick={() => console.log('valami')}>Edit</Button></div>
                  <div><Button variant="contained" onClick={() => removeCasino(casino.id)}>Remove</Button></div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div >
  )
}

