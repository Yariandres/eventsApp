import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import  styles from "../styles/layout.module.css";

export default function Layout({
  title = 'DJ Events | Find the hotest events in the world',
  keywords = 'music, dj, events',
  description = 'Find the latests and other musical events',
  children
}) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="descrioption" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Header />
      <div className={styles.container}>{children}</div>
      <Footer/>
    </div>
  );
}
