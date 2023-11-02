import "reflect-metadata";
import "../styles/globals.css";
import Layout from '../components/layout';

export default function App({ Component, pageProps, router }) {
  return (
    <Layout>
      <Component {...pageProps} key={router.asPath} />
    </Layout>
  );
}
