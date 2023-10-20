import "reflect-metadata";
import "../styles/globals.css";

export default function App({ Component, pageProps, router }) {
  return (
    <Component {...pageProps} key={router.asPath} />
  );
}
