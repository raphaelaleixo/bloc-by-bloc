import City from '../classes/City';
import District from '../classes/District';
import Highway from '../classes/Highway';
import districtList from '../gameData/districts';

const createNewCity = (): City => {
  const districts: Array<District | Highway> = districtList.map((districtConf) => {
    const {
      id, title, code, metroStation, districtType, difficulty, roads,
    } = districtConf;
    return new District(id, title, code, metroStation, districtType, difficulty, roads)
      .rotateDistrict();
  });

  districts.push(new Highway('C', ['', '']).rotateDistrict());
  districts.push(new Highway('C', ['', '']).rotateDistrict());
  districts.push(new Highway('C', ['', '']).rotateDistrict());

  const myCity = new City();
  myCity.createTiles(districts);

  return myCity;
};

export default createNewCity;
