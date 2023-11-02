import { Type } from "class-transformer";
import { Faction } from "../../utils/constants";
import Entity from "../entities";

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

export interface BlockMap {
    [key: string | number]: {
        blocks?: number,
    }
}

type PlayerNumber = 0 | 1 | 2 | 3;

export default class Player extends Entity {
    playerNumber: PlayerNumber;
    faction: Faction;

    @Type(() => Occupation)
    occupations: Occupation[] = [];

    constructor(playerNumber: PlayerNumber, faction: Faction) {
        super();
        this.playerNumber = playerNumber;
        this.faction = faction;
        this.blockCount = 10;
    }

    initialize() {
        availableOccupations.forEach((occupation) => {
            this.occupations.push(new Occupation(occupation));
        });
        return this;
    }

    getDistrictsWithBlocks(): Array<number> {
        return Array.from(new Set(this.blocks.map((block) => block.districtId)));
    }

    getBlocksByDistrict(): BlockMap {
        const blocksMap: Partial<BlockMap> = {};
        const districtsWithPoliceBlocks = this.getDistrictsWithBlocks();
        districtsWithPoliceBlocks.forEach(district => {
            const districtObject = blocksMap[district] || {};
            blocksMap[district] = Object.assign(districtObject, {
                blocks: this.blocks.filter(block => block.districtId === district).length
            });
        })
        return blocksMap;
    }

    createOccupation(type: OccupationTypes, districtId: number) {
        const targetOccupation = this.occupations.find(occupation => occupation.type === type && !occupation.active);
        if (targetOccupation) {
            targetOccupation.create(districtId);
        }
        return this;
    }
}