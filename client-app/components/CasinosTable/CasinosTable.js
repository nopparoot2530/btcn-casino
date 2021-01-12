import styles from './CasinosTable.module.scss';
import React from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import client from '../../utils/axiosConfig';

export default function CasinosTable() {

    const [casinos, setCasinos] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);

    const loaderColor = "#162738";

    // Fetch casinos and stop loading
    React.useEffect(() => {
        client(`/casino`)
            .then(res => {
                setCasinos(res.data);
            })
        setIsLoading(true);
    }, [])

    // Stop loading
    React.useEffect(() => {
        if (isLoading)
            setIsLoading(false)
    }, [casinos])

    return (
        <div className={styles.container} id="casinos">
            <h2>Best Bitcoin casino sites TOP 50 list</h2>
            <div className={styles.tableContainer}>
                {
                    isLoading ? (
                            <Loader type="ThreeDots" color={loaderColor} height={80} width={80}/>
                        ) :
                        (

                            <div className={styles.table}>
                                <div className={styles.tableHeaderRow}>
                                    {/*<div className={styles.tableHeaderCell}>Rank</div>*/}
                                    <div className={styles.tableHeaderCell}>Casino</div>
                                    <div className={styles.tableHeaderCell}>Rating</div>
                                    <div className={styles.tableHeaderCell}>Key Features</div>
                                    <div className={styles.tableHeaderCell}>Welcome Bonus</div>
                                    <div className={styles.tableHeaderCell}>Website</div>
                                </div>

                                {
                                    casinos.map(casino => (
                                        <div className={styles.tableRow}>
                                            {/*<div className={styles.tableCell}>*/}
                                            {/*    <div className={styles.tableRankContainer}>*/}
                                            {/*        {casino.rank}*/}
                                            {/*    </div>*/}
                                            {/*</div>*/}
                                            <div className={styles.tableCell}>
                                                <img className={styles.casinoProfilePicture} alt="casino image"
                                                     src={casino.image_link}/>
                                            </div>
                                            <div className={styles.tableCell}>{casino.rating}</div>
                                            <div className={styles.tableCell}>
                                                <ul>
                                                    {casino.key_features.map(feature => <li>{feature.name}</li>)}
                                                </ul>
                                            </div>ł
                                            <div className={styles.tableCell}
                                                 dangerouslySetInnerHTML={{__html: casino.bonus}}/>
                                            <div className={styles.tableCell}>
                                                <GoToCasinoButton website={casino.website}/>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        )
                }
            </div>
        </div>
    )
}

export function GoToCasinoButton({website}) {
    return (
        <div className={styles.goToCasinoButton}>
            <a href={website} target="_blank" rel="external">
                visit site
            </a>
            <ExpandMoreIcon fontSize='small'/>
        </div>
    )
}
