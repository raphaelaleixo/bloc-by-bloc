import Head from "next/head";
import { useState, useEffect } from "react";
import { createNewCity } from "../classes/city/createNewCity";
import City, { CityBlock } from "../classes/city";
import Police from "../classes/police";
import CityTile from "../components/cityTile/cityTile";
import PoliceBlocksMap from "../components/policeBlocks/policeBlocksMap";
import PoliceOpsDeck from "../components/policeBlocks/policeOpsDeck";

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
      <main className="flex align-top items-start gap-6">
        <div className="flex flex-col gap-5">
          <PoliceOpsDeck city={city} police={police} setPolice={setPolice} />
          <div className="w-[160px] h-[200px] rounded-md border-slate-100 border-dashed border-2 p-4">
            <div className="text-slate-100 mb-2 text-center">Staging Area</div>
            <div className="w-[full] flex flex-wrap gap-2 justify-center">
              {new Array(police?.policeCount || 0).fill('i').map((_item, index) => (
                <div key={index} className="w-4 h-4 bg-white shadow-md inline-block outline outline-1 outline-black" />
              ))}
            </div>
          </div>
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
  );
}
