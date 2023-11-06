import ShoppingCenter from '../classes/ShoppingCenter';
import { OtherDistrictTypes, Faction } from './constants';

const getShoppingCenterSlots = (
  districtType: OtherDistrictTypes | Faction,
  metroStation: boolean,
) => {
  if (districtType === OtherDistrictTypes.Commercial) {
    if (metroStation) {
      return 3;
    } return 4;
  }
  return 1;
};

const generateShoppingCenters = (
  districtType: OtherDistrictTypes | Faction,
  metroStation: boolean,
) => {
  const shoppingCentersNumber = getShoppingCenterSlots(
    districtType,
    metroStation,
  );
  const shoppingCenterArray: Array<ShoppingCenter> = [];
  for (let i = 0; i < shoppingCentersNumber; i++) {
    shoppingCenterArray.push(new ShoppingCenter());
  }

  return shoppingCenterArray;
};

export default generateShoppingCenters;
