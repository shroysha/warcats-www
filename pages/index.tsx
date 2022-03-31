import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    
    <svg id="panel" width="100vw" height="171vw" viewBox="0 0 2304 3955">
      <Head>
        <title>War Cats</title>
      </Head>,
      <image id="backgrond" href="images/background.svg" width="2304" height="3955"></image>
      <image id="discord" href="images/discord.svg" x="400" y="3126" width="1512" height="152" onClick={() => {
        window.open("https://discord.gg/DZjRR5TS")
      }}></image>
      <image id="telegram" href="images/telegram.svg" x="400" y="3340" width="1512" height="152" onClick={() => {
        window.open("https://twitter.com/war_cat_army")
      }}></image>
    </svg>
  )
}

export default Home
