import styles from './Introduction.module.scss';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function Introduction() {
    return (
        <div className={styles.container} id='introduction'>
            <div className={styles.textContainer}>
                <div className={styles.text}>
                    <h2>Best Bitcoin Casino Sites - 2020</h2>
                    <h4>Your guide to crypto casino sites!</h4>
                    <p>Check out our reviewed, tested, carefully selected list of the most
                        trustworthy Bitcoin casinos in 2020.<br />We won and lost on all of these sites so you don't have to.
                    </p>
                </div>
            </div>
            <div className={styles.mediaContainer}>
                <iframe src="https://www.youtube.com/embed/yz5qukVDpgc" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <div className={styles.arrowContainer}>
                <p>SHOW AVAILABLE PROMOTIONS</p>
                <div className={styles.arrow}>
                    <ExpandMoreIcon fontSize='large'/>
                </div>
            </div>
        </div>
    )
}