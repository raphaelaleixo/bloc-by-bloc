import { policeOpsDeck } from "../../gameData/policeOpsDeck";
import { Faction } from "../../utils/constants";
import { shuffler } from "../../utils/randomizers";
import City from "../city";
import { OtherDistrictTypes } from "../district/constants";
import { PoliceOpsCard, policeOpsCardTypes, policeOpsMovimentTypes, priority, stateDistricts } from "./constants";
import { movePoliceBlocks } from "./movePoliceBlocks";
import { Type } from "class-transformer";

export class PoliceBlock {
    districtId: string | number;

    constructor(districtId: number) {
        this.districtId = districtId;
    }

    movePolice(districtCode: string | number) {
        this.districtId = districtCode;
    }
}

export class PoliceVan extends PoliceBlock {
    hits: number = 0;

    constructor(districtId: number) {
        super(districtId);
    }
}

export default class Police {
    moraleTrack = [1, 2, 2, 2, 3];
    moraleIndex = 0;
    policeCount: number = 30;
    vanCount: number = 4;
    policeDeck: PoliceOpsCard[] = [];

    @Type(() => PoliceBlock)
    blocks: PoliceBlock[] = [];

    @Type(() => PoliceVan)
    vans: PoliceVan[] = [];


    initialize() {
        stateDistricts.forEach(district => {
            this.createPoliceBlock(district);
            this.createPoliceBlock(district);
            this.createPoliceBlock(district);
            this.createPoliceVan(district);
        });
        this.shufflePoliceDeck(policeOpsDeck);
        return this;
    }

    shufflePoliceDeck(deck: PoliceOpsCard[]) {
        this.policeDeck = shuffler(deck);
    }

    drawPoliceCard(city: City) {
        if (this.policeDeck.length === 0) {
            this.shufflePoliceDeck(policeOpsDeck);
        }
        const card = this.policeDeck.shift();
        if (card.type === policeOpsCardTypes.moviment) {
            if (card.moviment.movimentType === policeOpsMovimentTypes.district) {
                this.movePoliceBlocks(city, card.moviment.target as Faction | OtherDistrictTypes);
            }
        }
        console.log(card.title);
    }

    getDistrictsWithPoliceBlocks(): Array<string | number> {
        return Array.from(new Set(this.blocks.map((policeBlock) => policeBlock.districtId)));
    }

    getBlocksInDistrict(districtId: number | string): PoliceBlock[] {
        return this.blocks.filter(block => block.districtId === districtId);
    }

    createPoliceBlock(districtCode: number) {
        if (this.policeCount > 0) {
            this.blocks.push(new PoliceBlock(districtCode));
            this.policeCount--;
        }
    }

    createPoliceVan(districtCode: number) {
        if (this.vanCount > 0) {
            this.vans.push(new PoliceVan(districtCode));
            this.vanCount--;
        }
    }

    movePoliceBlocks(city: City, districtType: Faction | OtherDistrictTypes, priority?: priority) {
        this.getDistrictsWithPoliceBlocks().forEach(districtId => {
            movePoliceBlocks(city, districtId, districtType, this);
        });
    }
}