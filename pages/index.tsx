import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <Image
      id="backgroundImage"
      src="/images/background.svg"
      width="100vw"
      height="171vw"
      layout="responsive"
    />
  )
}

export default Home
