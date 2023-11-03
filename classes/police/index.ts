import { policeOpsDeck } from "../../gameData/policeOpsDeck";
import { Block } from "../../utils/constants";
import { Faction } from "../../utils/constants";
import { shuffler } from "../../utils/randomizers";
import City from "../city";
import { OtherDistrictTypes } from "../district/constants";
import Entity from "../entities";
import Player from "../player";
import { PoliceOpsCard, policeOpsMovimentTypes, priority, stateDistricts } from "./constants";
import { handlePoliceOpsCard } from "./handlePoliceOpsCard";
import { getPoliceBlockMoviments } from "./movePoliceBlocks";
import { Type } from "class-transformer";
import PoliceOpsDeck from "./policeOpsDeck";

export interface PoliceBlockMap {
    [key: string | number]: {
        policeBlocks?: number,
        policeVans?: number,
    }
}

export class PoliceVan extends Block {
    hits: number = 0;

    constructor(districtId: number) {
        super(districtId);
    }
}

export default class Police extends Entity {
    moraleIndex = 0;
    vanCount: number = 4;
    currentCard: PoliceOpsCard;

    @Type(() => PoliceVan)
    vans: PoliceVan[] = [];

    constructor() {
        super();
        this.blockCount = 30;
    }

    initialize() {
        stateDistricts.forEach(district => {
            this.createBlock(district);
            this.createBlock(district);
            this.createBlock(district);
            this.createPoliceVan(district);
        });
        return this;
    }

    drawPoliceCard(policeOpsDeck: PoliceOpsDeck, city: City, players: Player[]) {
        const card = policeOpsDeck.draw();
        handlePoliceOpsCard(card, this, city, players);
        this.currentCard = card;
    }

    getDistrictsWithOccupations(players: Player[]) {
        const districts = [];
        players.forEach(player => {
            player.occupations.forEach(occupation => {
                if (occupation.active && districts.includes(occupation.districtId) === false) {
                    districts.push(occupation.districtId);
                }
            })
        });
        return districts;
    }

    getDistrictsWithPlayerBlocks(players: Player[]) {
        const districts = [];
        players.forEach(player => {
            player.blocks.forEach(block => {
                if (districts.includes(block.districtId) === false) {
                    districts.push(block.districtId);
                }
            })
        });
        return districts;
    }

    getPoliceBlocksByDistrict(): PoliceBlockMap {
        const blocksMap: Partial<PoliceBlockMap> = {};
        const districtsWithPoliceBlocks = this.getDistrictsWithBlocks();
        const districtsWithVans = this.getDistrictsWithPoliceVans();
        districtsWithPoliceBlocks.forEach(district => {
            const districtObject = blocksMap[district] || {};
            blocksMap[district] = Object.assign(districtObject, {
                policeBlocks: this.blocks.filter(block => block.districtId === district).length
            });
        })
        districtsWithVans.forEach(district => {
            const districtObject = blocksMap[district] || {};
            blocksMap[district] = Object.assign(districtObject, {
                policeVans: this.vans.filter(van => van.districtId === district).length
            });
        })
        return blocksMap;
    }


    getDistrictsWithPoliceVans(): Array<number> {
        return Array.from(new Set(this.vans.map((van) => van.districtId)));
    }

    createPoliceVan(districtCode: number) {
        if (this.vanCount > 0) {
            this.vans.push(new PoliceVan(districtCode));
            this.vanCount--;
        }
    }

    movePoliceBlocks(city: City, players: Player[], type: policeOpsMovimentTypes, target?: Faction | OtherDistrictTypes, priority?: priority) {
        let moviments = [];
        this.getDistrictsWithBlocks().forEach(districtId => {
            moviments = [...moviments, ...getPoliceBlockMoviments(city, players, this, type, districtId, target)];
        });
        moviments.forEach(moviment => {
            const blockToMove = this.blocks.find(block => block.id === moviment.blockId);
            blockToMove.moveBlock(moviment.targetDistrictId);
        })
    }

    increaseMorale() {
        if (this.moraleIndex < 4) {
            this.moraleIndex++
        }
    }

    decreaseMorale() {
        if (this.moraleIndex > 0) {
            this.moraleIndex--
        }
    }
}