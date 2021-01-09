import Head from 'next/head';
import styles from '../../styles/Admin.module.scss';
import client from '../../utils/axiosConfig';
import React from 'react';
import { useRouter } from 'next/router'
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditModal from '../../components/EditModal/EditModal';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import AddNewCasinoModal from '../../components/AddNewCasinoModal/AddNewCasinoModal';
export default function Admin() {

  const [isLoading, setIsLoading] = React.useState(true);
  const [casinos, setCasinos] = React.useState([]);
  const [refreshFlag, setRefreshFlag] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(50);
  const [inputRefs, setInputRefs] = React.useState({});
  const [isDeleteDialogOpened, setIsDeleteDialogOpened] = React.useState(false);
  const [deleteDialogId, setDeleteDialogId] = React.useState(null);
  const [isEditModalOpened, setIsEditModalOpened] = React.useState(false);
  const [casinoToEditId, setCasinoToEditId] = React.useState();
  const [isAddNewCasinoModalOpened, setIsAddNewCasinoModalOpened] = React.useState(false);
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
  }, [refreshFlag])


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
    setCasinos(prevState => prevState.filter(casino => casino.id !== casinoId));
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
      .catch()
      .finally(() => setIsDeleteDialogOpened(false));
  }

  const handleRemoveButtonPressed = id => {
    setIsDeleteDialogOpened(true);
    setDeleteDialogId(id);
  }

  const handleEditButtonPressed = id => {
    setCasinoToEditId(id);
    setIsEditModalOpened(true);
  }

  const refresh = () => {
    setRefreshFlag(prevState => !prevState);
  }

  if (isLoading) {
    return (
      <div>...Loading</div>
    )
  }


  return (
    <div className={styles.container}>
      {isEditModalOpened &&
        <EditModal isOpened={isEditModalOpened} close={() => setIsEditModalOpened(false)} casinoId={casinoToEditId} refresh={refresh} />
      }
      {isAddNewCasinoModalOpened &&
        <AddNewCasinoModal isOpened={isAddNewCasinoModalOpened} close={() => setIsAddNewCasinoModalOpened(false)} refresh={refresh} />
      }
      <Dialog
        style={{ alignItems: "center", justifyContent: "center" }}
        open={isDeleteDialogOpened}
        onClose={() => setIsDeleteDialogOpened(false)}
      >
        <DialogTitle style={{ cursor: 'move' }}>
          Delete
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to remove the casino?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => removeCasino(deleteDialogId)} color="primary">
            Delete
          </Button>
          <Button onClick={() => setIsDeleteDialogOpened(false)} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
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
                  <div><Button variant="contained" onClick={() => handleEditButtonPressed(casino.id)}>Edit</Button></div>
                  <div><Button variant="contained" onClick={() => handleRemoveButtonPressed(casino.id)}>Remove</Button></div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
      <div className={styles.addNewCasinoButtonContainer}>
        <Button variant="contained" onClick={() => setIsAddNewCasinoModalOpened(true)}>Add casino</Button>
      </div>
    </div >
  )
}

