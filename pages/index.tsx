import { Camera, HemisphericLight, MeshBuilder, Scene, Vector3 } from 'babylonjs'
import type { NextPage } from 'next'
import Head from 'next/head'
import BuyButton from '../components/BuyButton'
import SocialButton from '../components/SocialButton'
import WarCatClickGameComponent from '../components/WarCatClickGameComponent'
import WarCatPanel from '../components/WarCatPanel'
import { DISCORD_HREF, IMAGE_DISCORD_HREF, IMAGE_TWITTER_HREF, PAGE_HEIGHT, PAGE_WIDTH, TWITTER_HREF } from '../src/constants'

interface HomeProps {

}

const Home: NextPage = (props: HomeProps) => {
  return <>
     <Head>
        <title>War Cats</title>
      </Head>
      <WarCatPanel width={PAGE_WIDTH} height={PAGE_HEIGHT}>
          <SocialButton x='468' y='3043' href={TWITTER_HREF} imageHref={IMAGE_TWITTER_HREF}/>
          <SocialButton x='455' y='3178' href={DISCORD_HREF} imageHref={IMAGE_DISCORD_HREF}/>
          <BuyButton x="400" y="3410"/>
      </WarCatPanel>
  </>
}

export default Home
