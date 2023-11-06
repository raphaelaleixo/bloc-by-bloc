import 'reflect-metadata';
import '../styles/globals.css';
import { AppProps } from 'next/app';
import { ConfigProvider } from 'antd';
import Layout from '../components/layout';
import theme from '../styles/theme';

const App = ({ Component, pageProps }: AppProps) => (
  <ConfigProvider theme={theme}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </ConfigProvider>
);

export default App;
