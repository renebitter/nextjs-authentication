import Layout from '../components/layout/layout';
import { SessionProvider } from 'next-auth/react';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    //"pageProps.session" is provided by profile.js getServerSideProps(context). Declaring it here will skip the "session http request" which is sent when reloading the "profile.js" page.
    //"auth.js" page will send this "session http request" since it does not have a getServerSideProps(context) function.
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
