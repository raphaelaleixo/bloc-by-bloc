import districtList from '../gameData/districts';
import { Faction } from './constants';

export default function findFactionDistricts(faction: Faction): number[] {
  return districtList
    .filter((district) => district.districtType === faction)
    .map((district) => district.id);
}
