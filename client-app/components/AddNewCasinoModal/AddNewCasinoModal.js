import styles from './AddNewCasinoModal.module.scss';
import Modal from '@material-ui/core/Modal';
import client from '../../utils/axiosConfig';
import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Button, TextField } from '@material-ui/core';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

import AddIcon from '@material-ui/icons/Add';

export default function AddNewCasinoModal({ isOpened, close, refresh }) {

    const [isCreating, setIsCreating] = React.useState(false);
    const [casino, setCasino] = React.useState(
        {
            name: 'example casino',
            rank: 1,
            rating: 5,
            key_features: [
                {
                    name: 'key feature 1'
                },
                {
                    name: 'key feature 2'
                },
                {
                    name: 'key feature 3'
                }
            ],
            link: 'https://example.com',
            bonus: '<p>example bonus </p>'
        }
    );

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
        setIsCreating(true);
        client.post(`/casino`, casino)
            .then(() => {
                refresh();
            })
            .catch(res => console.log(res))
            .finally(() => close())

    }

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
                    isCreating && (
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
                                    startIcon={<AddIcon />}
                                >
                                    Add
                        </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </Modal>
    );
}