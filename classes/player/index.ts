import { Type } from "class-transformer";
import { Block, Faction } from "../../utils/constants";

export enum OccupationTypes {
    factionStart,
    assemblyHall,
    mutualAidCenter
}

const availableOccupations = [
    OccupationTypes.factionStart,
    OccupationTypes.assemblyHall,
    OccupationTypes.assemblyHall,
    OccupationTypes.mutualAidCenter,
    OccupationTypes.mutualAidCenter,
]

let id = 0;
export class Occupation {
    type: OccupationTypes;
    districtId: number;
    active: boolean = false;
    id: number;

    constructor(type: OccupationTypes) {
        this.type = type;
        this.id = id++;
    }

    create(districtId: number) {
        this.districtId = districtId;
        this.active = true;
        return this;
    }

    destroy() {
        this.districtId = null;
        this.active = false;
        return this;
    }
}

type PlayerNumber = 0 | 1 | 2 | 3;
export default class Player {
    playerNumber: PlayerNumber;
    faction: Faction;
    blocksCount: 10;

    @Type(() => Occupation)
    occupations: Occupation[] = [];

    @Type(() => Block)
    blocks: Block[];

    constructor(playerNumber: PlayerNumber, faction: Faction) {
        this.playerNumber = playerNumber;
        this.faction = faction;
    }

    initialize() {
        availableOccupations.forEach((occupation) => {
            this.occupations.push(new Occupation(occupation));
        });
        return this;
    }

    createOccupation(type: OccupationTypes, districtId: number) {
        const targetOccupation = this.occupations.find(occupation => occupation.type === type && !occupation.active);
        if (targetOccupation) {
            targetOccupation.create(districtId);
        }
        return this;
    }

    get
}