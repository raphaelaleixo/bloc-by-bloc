import { policeOpsDeck } from "../../gameData/policeOpsDeck";
import { Block } from "../../utils/constants";
import { Faction } from "../../utils/constants";
import { shuffler } from "../../utils/randomizers";
import City from "../city";
import { OtherDistrictTypes } from "../district/constants";
import Player from "../player";
import { PoliceOpsCard, policeOpsCardTypes, policeOpsMovimentTypes, priority, stateDistricts } from "./constants";
import { getPoliceBlockMoviments } from "./movePoliceBlocks";
import { Type, instanceToInstance, instanceToPlain, serialize } from "class-transformer";

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

export default class Police {
    moraleIndex = 0;
    policeCount: number = 30;
    vanCount: number = 4;
    policeDeck: PoliceOpsCard[] = [];
    currentCard: PoliceOpsCard;

    @Type(() => Block)
    blocks: Block[] = [];

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

    clone() {
        return instanceToInstance(this);
    }

    export() {
        return JSON.stringify(instanceToPlain(this));
    }

    shufflePoliceDeck(deck: PoliceOpsCard[]) {
        this.policeDeck = shuffler(deck);
    }

    drawPoliceCard(city: City, players: Player[]) {
        if (this.policeDeck.length === 0) {
            this.shufflePoliceDeck(policeOpsDeck);
        }
        const card = this.policeDeck.shift();

        if (card.increaseMorale) {
            this.increaseMorale();
        }

        if (card.type === policeOpsCardTypes.moviment) {
            if (card.moviment.movimentType === policeOpsMovimentTypes.district || policeOpsMovimentTypes.priority) {
                this.movePoliceBlocks(city, players, card.moviment.movimentType, card.moviment.target as Faction | OtherDistrictTypes);
            }
            if (card.moviment.movimentType === policeOpsMovimentTypes.occupation) {
                this.movePoliceBlocks(city, players, card.moviment.movimentType);
            }
        }

        if (card.type === policeOpsCardTypes.reinforcement) {
            const districtsWithVans = this.getDistrictsWithPoliceVans();
            districtsWithVans.forEach((district) => {
                if (this.vans.find(van => van.districtId === district).hits === 0) {
                    this.createPoliceBlock(district as number);
                }
            })
        }
        if (card.type === policeOpsCardTypes.rotation) {
            const policeBlocksByDistrict = this.getPoliceBlocksByDistrict();
            const districtsWithPoliceBlocks = this.getDistrictsWithPoliceBlocks();

            districtsWithPoliceBlocks.forEach(district => {
                const maximum = policeBlocksByDistrict[district].policeBlocks;
                if (policeBlocksByDistrict[district].policeBlocks > 5) {
                    const targetBlocks = this.getBlocksInDistrict(district);
                    for (let i = maximum; i > 5; i--) {
                        this.removePoliceBlock(targetBlocks[i - 1].id);
                    }
                }
            })
        }
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

    getPoliceBlocksByDistrict(): PoliceBlockMap {
        const blocksMap: Partial<PoliceBlockMap> = {};
        const districtsWithPoliceBlocks = this.getDistrictsWithPoliceBlocks();
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

    getDistrictsWithPoliceBlocks(): Array<number> {
        return Array.from(new Set(this.blocks.map((policeBlock) => policeBlock.districtId)));
    }

    getDistrictsWithPoliceVans(): Array<number> {
        return Array.from(new Set(this.vans.map((van) => van.districtId)));
    }

    getBlocksInDistrict(districtId: number): Block[] {
        return this.blocks.filter(block => block.districtId === districtId);
    }

    removePoliceBlock(blockId: number) {
        const targetBlock = this.blocks.find(block => block.id === blockId);
        if (targetBlock) {
            this.blocks = this.blocks.filter(block => block.id !== targetBlock.id);
            this.policeCount++;
        }
    }

    createPoliceBlock(districtCode: number) {
        if (this.policeCount > 0) {
            this.blocks.push(new Block(districtCode));
            this.policeCount--;
        }
    }

    createPoliceVan(districtCode: number) {
        if (this.vanCount > 0) {
            this.vans.push(new PoliceVan(districtCode));
            this.vanCount--;
        }
    }

    movePoliceBlocks(city: City, players: Player[], type: policeOpsMovimentTypes, target?: Faction | OtherDistrictTypes, priority?: priority) {
        let moviments = [];
        this.getDistrictsWithPoliceBlocks().forEach(districtId => {
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