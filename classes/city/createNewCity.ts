import City from ".";
import District, { Highway } from "../district";
import { districtList } from "../../gameData/districts";

export const createNewCity = (): City => {
    const districts: Array<District|Highway> = districtList.map((districtConf) => {
        const { id, title, code, metroStation, districtType, difficulty } = districtConf;
        return new District(id, title, code, metroStation, districtType, difficulty, [
            "",
            "",
        ]).rotateDistrict();
    });

    districts.push(new Highway("C", ['', '']).rotateDistrict());
    districts.push(new Highway("C", ['', '']).rotateDistrict());
    districts.push(new Highway("C", ['', '']).rotateDistrict());

    const myCity = new City();
    myCity.createBlocks(districts);

    return myCity;
}