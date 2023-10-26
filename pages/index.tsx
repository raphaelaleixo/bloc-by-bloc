import Head from "next/head";
import { useState, useEffect } from "react";
import { createNewCity } from "../classes/city/createNewCity";
import City, { CityBlock } from "../classes/city";
import Police from "../classes/police";
import CityTile from "../components/cityTile/cityTile";
import { instanceToInstance } from "class-transformer";
import PoliceBlocksMap from "../components/policeBlocks/policeBlocksMap";

export default function Home() {
  const [city, setCity] = useState<City | undefined>();
  const [police, setPolice] = useState<Police | undefined>();
  const [highightedTiles, setHighlightedTiles] = useState<CityBlock[]>([]);

  useEffect(() => {
    setCity(createNewCity());
    setPolice(new Police().initialize());
  }, []);

  return (
    <>
      <Head>
        <title>Bloc By Bloc</title>
      </Head>
      <main className="flex flex-col gap-3">
        <button
          onClick={() => {
            police.drawPoliceCard(city);
            const newPolice = instanceToInstance(police);
            setPolice(newPolice);
          }}
          className="bg-white"
        >
          Draw police ops card
        </button>
        <div className="w-[700px] h-[700px] relative">
          <div className="grid grid-cols-5 w-full h-full gap-3 absolute">
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
  );
}
