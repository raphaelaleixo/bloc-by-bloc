import Head from "next/head";
import { Saira, Saira_Stencil_One } from 'next/font/google';
import CityMap from "../components/cityTile/cityMap";

const saira = Saira({
  subsets: ["latin"],
  weight: 'variable',
  variable: "--font-saira",
});

const sairaStencil = Saira_Stencil_One({
  subsets: ["latin"],
  weight: '400',
  variable: "--font-saira-stencil",
});

export default function Home() {

  return (
    <>
    <Head>
      <title>Bloc by Bloc</title>
    </Head>
    <main className={`w-full h-full flex align-top justify-center items-start gap-6 ${saira.variable} ${sairaStencil.variable} font-saira`}>
      <CityMap />
    </main>
    </>
    );
}
