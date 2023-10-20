import ShoppingCenter from "../shoppingCenter";
import Bloc from "../bloc";
import { OtherDistrictTypes } from "./constants";
import { randomSelect } from "../../utils/randomizers";
import { Faction } from "../../utils/constants";
import { generateShoppingCenters } from "../shoppingCenter/generateShoppingCenter";
import { Type } from "class-transformer";
import { Code } from "../../utils/constants";

const rotations = [0, 90, 180, 270];
type DistrictImage = [string, string];

export default class District {
    districtType: OtherDistrictTypes | Faction;
    difficulty: number;
    metroStation: boolean;
    id: number;
    code: Code;
    image: DistrictImage;
    liberated: boolean = false;
    hasOccupationSlot: boolean;
    roads: boolean[] = [true, true, true, true];
    rotation: 0 | 90 | 180 | 270 = 0;

    @Type(() => ShoppingCenter)
    shoppingCenters: ShoppingCenter[];

    @Type(() => Bloc)
    blocs: Bloc[] = [];

    constructor(
        id: number,
        code: Code,
        metroStation: boolean,
        districtType: OtherDistrictTypes | Faction,
        difficulty: number,
        image: DistrictImage,
    ) {
        this.roads = metroStation ? [false, true, true, true] : this.roads;
        this.id = id;
        this.code = code;
        this.image = image,
        this.difficulty = difficulty;
        this.metroStation = metroStation;
        this.districtType = districtType;
        this.shoppingCenters = generateShoppingCenters(districtType, metroStation);
        this.hasOccupationSlot = districtType !== OtherDistrictTypes.Commercial;
    }

    createBloc(faction: Faction) {
        this.blocs.push(new Bloc(faction));
    }

    addBloc(targetBloc: Bloc) {
        this.blocs.push(targetBloc);
    }

    removeBloc(targetBloc: Bloc) {
        this.blocs = this.blocs.filter(
            (bloc: Bloc) => bloc.index !== targetBloc.index
        );
    }

    rotateDistrict() {
        const selectedRotation = randomSelect(rotations);
        this.rotation = selectedRotation;
        if (this.roads.includes(false)) {
            const rotationIndex = rotations.indexOf(selectedRotation);
            const newRoads = [true, true, true, true];
            newRoads[rotationIndex] = false;
            this.roads = newRoads;
        }
        return this;
    }

    liberateDistrict() {
        this.liberated = true;
        if (
            this.districtType !== OtherDistrictTypes.Commercial &&
            this.districtType !== OtherDistrictTypes.Public
        ) {
            this.difficulty = this.difficulty - 1;
        }
        return this;
    }
}
