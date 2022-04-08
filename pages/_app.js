import Layout from '../components/layout/layout';
import { SessionProvider } from 'next-auth/react';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    //pageProps.session is provided by profile.js getServerSideProps. Providing it here will skip the "session http request" to check if there is a session when reloading the "/profile". "/auth" on the other hand will send the "session http request" since it does not provide "pageProps.session" hence returning it "undefined"
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
