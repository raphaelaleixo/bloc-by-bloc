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

enum highwayConnections {
    ldtr,
    ltdr,
}

class Tile {
    code: Code;
    rotation: 0 | 90 | 180 | 270 = 0;
    image: DistrictImage;
    title?: string;
    constructor(code: Code, image: DistrictImage) {
        this.code = code;
        this.image = image;
    }
}

let highway_id = 0;

export class Highway extends Tile {
    connections: highwayConnections;
    id: string;
    constructor(code: Code, image: DistrictImage) {
        super(code, image);
        this.title = "Highway";
        this.id = `highway_${highway_id++}`;
    }
    rotateDistrict() {
        const selectedRotation = randomSelect(rotations);
        this.rotation = selectedRotation;
        this.connections = this.rotation === 0 || this.rotation === 180 ? highwayConnections.ldtr : highwayConnections.ltdr;
        return this;
    }
}

export default class District extends Tile {
    districtType: OtherDistrictTypes | Faction;
    difficulty: number;
    metroStation: boolean;
    id: number;
    liberated: boolean = false;
    hasOccupationSlot: boolean;
    roads: boolean[] = [true, true, true, true];

    @Type(() => ShoppingCenter)
    shoppingCenters: ShoppingCenter[];

    @Type(() => Bloc)
    blocs: Bloc[] = [];

    constructor(
        id: number,
        title: string,
        code: Code,
        metroStation: boolean,
        districtType: OtherDistrictTypes | Faction,
        difficulty: number,
        image: DistrictImage,
    ) {
        super(code, image);
        this.roads = metroStation ? [false, true, true, true] : this.roads;
        this.id = id;
        this.title = title;
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
