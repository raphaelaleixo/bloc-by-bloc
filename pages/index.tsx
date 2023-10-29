import Head from "next/head";
import { useState, useEffect } from "react";
import { Saira, Saira_Stencil_One } from 'next/font/google';
import { createNewCity } from "../classes/city/createNewCity";
import City, { CityBlock } from "../classes/city";
import Police from "../classes/police";
import CityTile from "../components/cityTile/cityTile";
import PoliceBlocksMap from "../components/policeBlocks/policeBlocksMap";
import PoliceOpsDeck from "../components/policeBlocks/policeOpsDeck";
import StagingArea from "../components/policeBlocks/stagingArea";
import PoliceMorale from "../components/policeBlocks/policeMorale";
import { savePolice } from "../classes/api/savePolice";
import usePolice from "../hooks/usePolice";

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
  const [city, setCity] = useState<City | undefined>();
  const [highightedTiles, setHighlightedTiles] = useState<CityBlock[]>([]);

  const { police, policeActions } = usePolice();

  useEffect(() => {
    setCity(createNewCity());
  }, []);

  return city ? (
    <>
      <Head>
        <title>Bloc By Bloc</title>
      </Head>
      <main className={`w-full h-full flex align-top justify-center items-start gap-6 ${saira.variable} ${sairaStencil.variable} font-saira`}>
        <div className="flex flex-col gap-5">
          <PoliceOpsDeck city={city} police={police} drawPoliceCard={policeActions.drawPoliceCard} />
          <StagingArea policeCount={police?.policeCount} />
          <PoliceMorale police={police} />
        </div>
        <div className="w-[700px] h-[700px] relative">
          <div className="grid grid-cols-5 w-full h-full gap-2 absolute">
            {city?.blocks.map((line: CityBlock[]) =>
              line.map((district: CityBlock) => {
                return (
                  <CityTile city={city} tile={district.tile} key={district.tile.id} highightedTiles={highightedTiles} setHighlightedTiles={setHighlightedTiles} />
                );
              })
            )}
          </div>
          <PoliceBlocksMap city={city} police={police} />
        </div>
      </main>
    </>
  ) : false;
}
