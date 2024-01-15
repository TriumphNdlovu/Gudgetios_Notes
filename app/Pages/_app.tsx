
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { metadata } from '../components/metadata';
import TopNavbar from '../components/TopNavbar';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="canonical" href={metadata.metadataBase.toString()} />
      </Head>
      {/* <TopNavbar /> */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;