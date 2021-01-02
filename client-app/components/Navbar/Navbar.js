import styles from './Navbar.module.scss';
import VeritcalDivider from '../VerticalDivider/VerticalDivider';
import Link from 'next/link';
import BitcoinLogo from '../../public/bitcoin.svg';

export default function Navbar() {
    return (
        <>
            {/* Desktop menu view */}
            <div className={styles.desktopContainer} id='navbar-desktop'>
                <div className={styles.upperRow}>
                    <div className={styles.textContainer}>
                        <Link href='/'>
                            <a>Help</a>
                        </Link>
                        <VeritcalDivider color='#F99400' />
                        <Link href='/'>
                            <a>Terms and conditions</a>
                        </Link>
                    </div>
                </div>
                <div className={styles.lowerRow}>
                    <div className={styles.logo}>
                        <div className={styles.imageContainer}>
                            <BitcoinLogo className={styles.bitcoinLogo} />
                        </div>
                        <VeritcalDivider color='#98A0A7' />
                        <div className={styles.logoName}>BITCOINCASINOLISTS</div>
                    </div>
                    <div className={styles.menu}>
                        <ul>
                            <li>HOME</li>
                            <li>REVIEW</li>
                            <li>GAMBLING</li>
                            <li>BLOG</li>
                            <li>ABOUT US</li>
                            <li className={styles.buttonListElement}>CONTACT</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Mobile menu view */}
            <div className={styles.mobileContainer}>
                <div className={styles.menuIcon}>
                    
                </div>
                <div className={styles.imageContainer}>
                    <BitcoinLogo className={styles.bitcoinLogo} />
                </div>
                <div className={styles.menu}>

                </div>
            </div>
        </>
    )
}