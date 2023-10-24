import Head from "next/head";
import { useState, useEffect } from "react";
import { createNewCity } from "../classes/city/createNewCity";
import City, { CityBlock } from "../classes/city";
import District, { Highway } from "../classes/district";
import Police from "../classes/police";
import { Faction } from "../utils/constants";

export default function Home() {
  const [city, setCity] = useState<City | undefined>();
  const [police, setPolice] = useState<Police | undefined>();

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
            console.log(police.getDistrictsWithPoliceBlocks());
          }}
          className="bg-white"
        >
          Draw police ops card
        </button>
        <div className="grid grid-cols-5 w-[40em] gap-3">
          {city?.blocks.map((line: CityBlock[]) =>
            line.map((district: CityBlock) => {
              return (
                <div
                  key={district.tile?.id}
                  className="bg-zinc-900 aspect-square flex flex-col p-2 h-full overflow-hidden relative"
                  style={{ rotate: `${district.tile.rotation}deg` }}
                >
                  <div className="text-[0.5rem] text-white font-bold relative z-10">
                    <span>{district.tile?.id}</span>
                  </div>
                  <div className="text-sm text-white leading-4 font-bold uppercase relative z-10">
                    <span>
                      {district.tile instanceof District &&
                        district.tile?.title}
                    </span>
                  </div>
                  <div className="text-[0.5rem] text-white font-bold relative z-10">
                    <span>{district.tile.districtType}</span>
                  </div>
                  {district.tile instanceof Highway ? (
                    <div></div>
                  ) : (
                    <>
                      <div className="w-[20%] h-full absolute bg-zinc-600 top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%]"></div>
                      {district.tile instanceof District &&
                      district.tile.metroStation ? (
                        <div className="h-[20%] w-[50%] absolute bg-zinc-600 top-2/4 left-0 translate-y-[-50%]"></div>
                      ) : (
                        <div className="h-[20%] w-full absolute bg-zinc-600 top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%]"></div>
                      )}
                    </>
                  )}
                </div>
              );
            })
          )}
        </div>
      </main>
    </>
  );
}
