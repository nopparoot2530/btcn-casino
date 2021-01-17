import Head from 'next/head';
import Introduction from '../components/Introduction/Introduction';
import Navbar from '../components/Navbar/Navbar';
import styles from '../styles/Home.module.scss';
import AwardCardsSection from '../components/AwardCardsSection/AwardCardsSection';
import CasinosTable from '../components/CasinosTable/CasinosTable';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Bitcoin Casinos</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/" />
      </Head>
      <Navbar />
      <Introduction />
      <AwardCardsSection />
      <CasinosTable />
    </div>
  )
}
