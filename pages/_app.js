import Layout from '../components/layout/layout';
import { SessionProvider } from 'next-auth/react';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
