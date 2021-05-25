import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Game from '../components/Game';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
    <Head>
      
    </Head>
      <div className="container">
        <Header text="Let's go" />
        <Game />
      </div>
      <Footer />
    </>
  );
}
