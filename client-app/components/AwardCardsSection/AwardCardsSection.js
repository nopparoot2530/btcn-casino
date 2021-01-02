import styles from './AwardCardsSection.module.scss';
import AwardCard from '../AwardCard/AwardCard';

export default function AwardCardsSection(){
    return (
        <div className={styles.container} id='awards'>
            <div className={styles.textContainer}>
                <h2>Best Bitcoin Gambling Sites - 2020</h2>
                <h3>Best Bitcoin casino sites TOP 3 list</h3>
            </div>
            <div className={styles.cardsContainer}>
                <AwardCard place={1}/>
                <AwardCard place={2}/>
                <AwardCard place={3}/>
            </div>
        </div>
    )
}