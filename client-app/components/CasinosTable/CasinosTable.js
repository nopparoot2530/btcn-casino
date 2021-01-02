import styles from './CasinosTable.module.scss';
import React from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function CasinosTable() {

    const [casinos, setCasinos] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);

    const loaderColor = "#162738";

    // Fetch casinos and stop loading
    React.useEffect(() => {
        // TODO Actual fetch logic
        setIsLoading(true);
        setCasinos([
            {
                rank: 1,
                name: "best casino 1",
                rating: 10,
                key_features: "black jack, roulette",
                bonus: "free",
                website: "https://google.com"
            },
            {
                rank: 2,
                name: "best casino 1",
                rating: 10,
                key_features: "black jack, roulette",
                bonus: "free",
                website: "https://google.com"
            },
            {
                rank: 3,
                name: "best casino 1",
                rating: 10,
                key_features: "black jack, roulette",
                bonus: "free",
                website: "https://google.com"
            }, {
                rank: 4,
                name: "best casino 1",
                rating: 10,
                key_features: "black jack, roulette",
                bonus: "free",
                website: "https://google.com"
            },
        ])
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
                        <Loader type="ThreeDots" color={loaderColor} height={80} width={80} />
                    ) :
                        (
                            <table className={styles.table}>
                                <tr>
                                    <th>Rank</th>
                                    <th>Casino</th>
                                    <th>Rating</th>
                                    <th>Key Features</th>
                                    <th>Welcome Bonus</th>
                                    <th>Website</th>
                                </tr>
                                {
                                    casinos.map(casino => (
                                        <tr>
                                            <td>
                                                <div className={styles.tableRankContainer}>
                                                    {casino.rank}
                                                </div>
                                            </td>
                                            <td>{casino.name}</td>
                                            <td>{casino.rating}</td>
                                            <td>{casino.key_features}</td>
                                            <td>{casino.bonus}</td>
                                            <td>
                                                <GoToCasinoButton website={casino.website} />
                                            </td>
                                        </tr>
                                    ))
                                }
                            </table>
                        )
                }
            </div>
        </div>
    )
}

export function GoToCasinoButton({ website }) {
    return (
        <div className={styles.goToCasinoButton}>
            <a href={website} target="_blank" rel="external">
                visit site
            </a>
            <ExpandMoreIcon fontSize='small'/>
        </div>
    )
}