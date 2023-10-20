import Head from "next/head";
import District from "../classes/district/index";
import { districtList } from "../gameData/districts";
import { serialize, deserialize } from "class-transformer";
import City from "../classes/city";

export default function Home() {
  const districts: District[] = districtList.map((districtConf) => {
    const { id, code, metroStation, districtType, difficulty } = districtConf;
    return new District(id, code, metroStation, districtType, difficulty, [
      "",
      "",
    ]).rotateDistrict();
  });

  const myCity = new City();
  myCity.createBlocks(districts);

  const serialized = serialize(myCity);
  console.log(deserialize(City, serialized));

  return (
    <>
      <Head>
        <title>Bloc By Bloc</title>
      </Head>
      <main>
      </main>
    </>
  );
}
