import styles from './AwardCard.module.scss';
import Trophy from '../../public/trophy.svg'

export default function AwardCard({ place }) {
    return (
        <div className={styles.container}>
            <div className={styles.cardBody}>
                <div className={styles.placeContainer}>{place}</div>
                <Trophy className={styles.trophyIcon} />
            </div>
        </div>
    );
}