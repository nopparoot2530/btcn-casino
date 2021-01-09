import styles from './EditModal.module.scss';
import Modal from '@material-ui/core/Modal';
import client from '../../utils/axiosConfig';
import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Button, TextField } from '@material-ui/core';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import SaveIcon from '@material-ui/icons/Save';

export default function EditModal({ isOpened, close, casinoId, refresh }) {

    const [casino, setCasino] = React.useState();
    const [isLoading, setIsLoading] = React.useState(true);
    const [isUpdating, setIsUpdating] = React.useState(false);

    React.useEffect(() => {
        if (casinoId !== undefined && casino === undefined) {
            client(`/casino/${casinoId}`)
                .then(res => {
                    setCasino(res.data)
                })
                .finally(() => setIsLoading(false));
        }
        return () => {
            setCasino(null)
            setIsUpdating(false);
        };
    }, []);

    const handleChangeName = event => {
        setCasino(prevState => {
            return {
                ...prevState,
                name: event.target.value
            }
        })
    }

    const handleChangeLink = event => {
        setCasino(prevState => {
            return {
                ...prevState,
                link: event.target.value
            }
        })
    }

    const handleChangeKeyFeature = (event, keyFeatureIndex) => {
        setCasino(prevState => {
            let newKeyFeatures = prevState.key_features;
            newKeyFeatures[keyFeatureIndex].name = event.target.value;
            return {
                ...prevState,
                key_features: newKeyFeatures
            }
        })
    }

    const handleChangeRate = (event, rate) => {
        setCasino(prevState => {
            return {
                ...prevState,
                rating: rate
            }
        })
    }

    const saveButtonPressed = () => {
        setIsUpdating(true);
        client.put(`/casino/${casinoId}`, casino)
            .then(() => {
                refresh();
            })
            .finally(() => close());
    }

    if (isLoading && isOpened)
        return (
            <Modal
                open={isOpened}
                onClose={close}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                style={{ alignItems: "center", justifyContent: "center" }}
            >
                <div className={styles.updatingLoaderContainer}>
                    <CircularProgress />
                </div>
            </Modal>
        )

    return (
        <Modal
            open={isOpened}
            onClose={close}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            style={{ alignItems: "center", justifyContent: "center" }}
        >
            <div className={styles.modalBody}>
                {
                    isUpdating && (
                        <div className={styles.updatingLoaderContainer}>
                            <CircularProgress />
                        </div>
                    )
                }
                <Grid container direction="column" spacing={2}>
                    <Grid item>
                        <Grid container direction="row">
                            <Grid container direction="column" xs={6} spacing={3}>
                                <Grid item >
                                    <TextField fullWidth id="outlined-basic" label="Name" size="medium" variant="outlined" onChange={handleChangeName} value={casino.name} />
                                </Grid>
                                <Grid item>
                                    <TextField fullWidth id="outlined-basic" label="link" size="medium" variant="outlined" onChange={handleChangeLink} value={casino.link} />
                                </Grid>
                                <Grid item direction="column">
                                    <Typography id="discrete-slider-restrict" gutterBottom>
                                        Rating
                                </Typography>
                                    <Slider
                                        defaultValue={casino.rating}
                                        onChange={handleChangeRate}
                                        aria-labelledby="discrete-slider"
                                        valueLabelDisplay="auto"
                                        step={1}
                                        marks
                                        min={1}
                                        max={5}
                                    />
                                </Grid>
                                {
                                    casino.key_features.map((feature, index) =>
                                        <Grid item>
                                            <TextField id="outlined-basic" size="small" label={`key feature ${index + 1}`} variant="outlined" onChange={event => handleChangeKeyFeature(event, index)} value={casino.key_features[index].name} />
                                        </Grid>
                                    )
                                }

                            </Grid>
                            <Grid container direction="column" xs={6}>
                                <Grid item>
                                    {/* TODO rich text editor */}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container direction="row" justify="left">
                            <Grid item >
                                <Button
                                    onClick={() => saveButtonPressed()}
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    startIcon={<SaveIcon />}
                                >
                                    Save
                        </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </Modal>
    );
}