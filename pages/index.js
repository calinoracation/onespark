import Head from 'next/head'
import Link from 'next/link'

import styles from '../styles/Home.module.css'
import { Logo } from '../components/Logo.tsx';

export default function Home() {

  return (
    <div className={styles.container}>
      <Head>
        <title>OneSpark</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Logo />

        <ul className={styles.courseList}>
          <li className={styles.card}>
            <Link href="/lessons/vocabulary/basics">Vocabulary Basics</Link>
          </li>
          <li className={styles.card}>
            <Link href="/lessons/vocabulary/intermediate">Vocabulary Intermediate</Link>
          </li>
        </ul>
      </main>
    </div>
  )
}