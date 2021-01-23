import styles from './Navbar.module.scss';
import React from 'react';
import VeritcalDivider from '../VerticalDivider/VerticalDivider';
import Link from 'next/link';
import BitcoinLogo from '../../public/bitcoin.svg';
import useWindowSize from "../../utils/useWindowSize";
import Drawer from '@material-ui/core/Drawer';

export default function Navbar() {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const {isMobileView} = useWindowSize();

    const commonMenuContent = (
        <ul>
            <li>HOME</li>
            <li>REVIEW</li>
            <li>GAMBLING</li>
            <li>BLOG</li>
            <li>ABOUT US</li>
            <li className={styles.buttonListElement}>CONTACT</li>
        </ul>
    )

    if (isMobileView)
        return (
            <div className={styles.mobileContainer}>
                <div className={styles.hamburgerIconContainer}>
                    <div onClick={() => setIsMobileMenuOpen(true)}>
                        <span/>
                        <span/>
                        <span/>
                    </div>
                </div>
                <div className={styles.imageContainer}>
                    <BitcoinLogo className={styles.bitcoinLogo}/>
                </div>
                <Drawer open={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
                    <div className={styles.mobileMenu}>
                        {commonMenuContent}
                    </div>
                </Drawer>
            </div>
        )

    return (
        <div className={styles.desktopContainer} id='navbar-desktop'>
            <div className={styles.upperRow}>
                <div className={styles.textContainer}>
                    <Link href='/'>
                        <a>Help</a>
                    </Link>
                    <VeritcalDivider color='#F99400'/>
                    <Link href='/'>
                        <a>Terms and conditions</a>
                    </Link>
                </div>
            </div>
            <div className={styles.lowerRow}>
                <div className={styles.logo}>
                    <div className={styles.imageContainer}>
                        <BitcoinLogo className={styles.bitcoinLogo}/>
                    </div>
                    <VeritcalDivider color='#98A0A7'/>
                    <div className={styles.logoName}>BITCOINCASINOLISTS</div>
                </div>
                <div className={styles.desktopMenu}>
                    {commonMenuContent}
                </div>
            </div>
        </div>
    )
}
