import Head from "next/head";
import { useState, useEffect } from "react";
import { createNewCity } from "../classes/city/createNewCity";
import City, { CityBlock } from "../classes/city";
import Police from "../classes/police";
import CityTile from "../components/cityTile/cityTile";
import { instanceToInstance } from "class-transformer";

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
      <main className="contents ">
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
        <div className="grid grid-cols-5 w-[40em] gap-3">
          {city?.blocks.map((line: CityBlock[]) =>
            line.map((district: CityBlock) => {
              return (
                <CityTile city={city} tile={district.tile} police={police} key={district.tile.id} highightedTiles={highightedTiles} setHighlightedTiles={setHighlightedTiles} />
              );
            })
          )}
        </div>
      </main>
    </>
  );
}
