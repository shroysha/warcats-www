import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps): any {
  // @ts-ignore
  return <Component {...pageProps} />
}

export default MyApp
