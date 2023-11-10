import districtList from '../gameData/districts';
import { DistrictConfiguration, Faction } from './constants';

export default function findFactionDistricts(faction: Faction): DistrictConfiguration[] {
  return districtList
    .filter((district) => district.districtType === faction);
}
