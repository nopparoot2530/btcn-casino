import styles from './AwardCardsSection.module.scss';
import AwardCard from '../AwardCard/AwardCard';
import Loader from "react-loader-spinner";
import React from "react";
import client from '../../utils/axiosConfig';

export default function AwardCardsSection() {

    const [topCasinos, setTopCasinos] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const loaderColor = "#162738";
    const numberOfAwardCards = 3;

    React.useEffect(() => {
        client(`/casino?limit=${numberOfAwardCards}&page=0`)
            .then(res => {
                setTopCasinos(res.data);
            })
            .catch(err => {

            })
            .finally(() => setIsLoading(false));
    }, [])

    if (isLoading)
        return <Loader type="ThreeDots" color={loaderColor} height={80} width={80}/>

    return (
        <div className={styles.container} id='awards'>
            <div className={styles.textContainer}>
                <h2>Best Bitcoin Gambling Sites - 2020</h2>
                <h3>Best Bitcoin casino sites TOP 3 list</h3>
            </div>
            <div className={styles.cardsContainer}>
                {
                    topCasinos.map((casino, index) => {
                        return (
                            <AwardCard
                                key={index}
                                image={casino.image_link}
                                place={casino.rank}
                                rate={casino.rating}
                                keyFeatures={casino.key_features}
                                description={casino.bonus}
                                link={casino.link}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}
