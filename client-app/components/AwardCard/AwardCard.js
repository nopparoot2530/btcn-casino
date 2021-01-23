import styles from './AwardCard.module.scss';
import Trophy from '../../public/trophy.svg'
import React from "react";
import ReactStars from "react-rating-stars-component";
import CheckedIcon from "../../assets/check.svg";
import {GoToCasinoButton} from "../CasinosTable/CasinosTable";

export default function AwardCard({place, image, rate, keyFeatures, description, link}) {
    return (
        <div className={styles.container}>
            <div className={styles.cardBody}>
                <div className={styles.placeContainer}>{place}</div>
                <Trophy className={styles.trophyIcon}/>
                <img className={styles.casinoProfilePicture} alt="casino image"
                     src={image || `${process.env.CASINO_IMAGE_PLACEHOLDER}/casino-image-placeholder.jpg`}/>
                <div className={styles.starsContainer}>
                    <ReactStars
                        count={5}
                        isHalf={false}
                        value={rate}
                        edit={false}
                        size={30}
                        activeColor="#f99400"
                    />
                </div>
                <div className={styles.keyFeaturesContainer}>
                    {keyFeatures.map(feature => (
                        <div className={styles.featureRow}>
                            <CheckedIcon/>
                            {feature.name}
                        </div>)
                    )}
                </div>
                <div dangerouslySetInnerHTML={{__html: description}} className={styles.bonusTextContainer}/>
                <div className={styles.goToButtonContainer}>
                    <GoToCasinoButton website={link}/>
                </div>
            </div>
        </div>
    );
}
