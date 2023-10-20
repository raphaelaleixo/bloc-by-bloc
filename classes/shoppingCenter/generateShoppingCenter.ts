import ShoppingCenter from "./index";
import { OtherDistrictTypes } from "../district/constants";
import { Faction } from "../../utils/constants";

const getShoppingCenterSlots = (
    districtType: OtherDistrictTypes | Faction,
    metroStation: boolean
) => {
    return districtType === OtherDistrictTypes.Commercial && metroStation
        ? 3
        : districtType === OtherDistrictTypes.Commercial
            ? 4
            : 1;
};

export const generateShoppingCenters = (
    districtType: OtherDistrictTypes | Faction,
    metroStation: boolean
) => {
    const shoppingCentersNumber = getShoppingCenterSlots(
        districtType,
        metroStation
    );
    const shoppingCenterArray: Array<ShoppingCenter> = new Array(
        shoppingCentersNumber
    );
    shoppingCenterArray.fill(new ShoppingCenter());
    return shoppingCenterArray;
};
