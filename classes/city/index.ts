import { grid } from "../../gameData/cityGrid";
import { Block, Code } from "../../utils/constants";
import { shuffler } from "../../utils/randomizers";
import District, { Highway } from "../district";
import { Type } from "class-transformer";
import Police, { PoliceVan } from "../police";
import Player, { Occupation } from "../player";
import { LootStatus } from "../shoppingCenter/constants";

interface ObjectsInDistrict { vans: PoliceVan[] | null, policeBlocks: Block[] | null, blocks: Block[] | null, occupations: Occupation[] | null, };

export interface ObjectsMap {
    [key: string | number]: ObjectsInDistrict
}


export class CityBlock {
    code: Code;

    @Type(() => District, {
        discriminator: {
            property: '__type',
            subTypes: [
                { value: District, name: 'district' },
                { value: Highway, name: 'highway' },
            ],
        },
    })
    tile: District | Highway;

    constructor(code: Code) {
        this.code = code;
    }
    addTile(tile: District | Highway) {
        this.tile = tile;
        return this;
    }
}

export type DistrictCoordinate = {
    x: number;
    y: number;
    id: number | string;
}

export default class City {
    @Type(() => CityBlock)
    cityBlocks: CityBlock[][];

    constructor(cityBlocks?: CityBlock[][]) {
        this.cityBlocks = cityBlocks || [];
    }

    getDistrictCoordinates() {
        const coordinates: DistrictCoordinate[] = [];
        let x = 0;
        let y = 0;
        this.cityBlocks.forEach((line) => {
            line.forEach((block) => {
                coordinates.push({
                    x, y, id: block.tile.id
                });
                x++;
            });
            y++;
            x = 0;
        })
        return coordinates;
    }

    getDistrictById(districtId: number): District {
        let district: District;
        this.cityBlocks.forEach((line) => {
            const targetDistrict = line.find(block => block.tile.id === districtId)?.tile;
            if (targetDistrict && targetDistrict instanceof District) {
                district = targetDistrict;
            }
        });
        return district;
    }

    getObjectsInDistrict(districtId: number, { police, players, player }: { police?: Police, players?: Player[], player?: Player }): ObjectsInDistrict {
        const objects: ObjectsInDistrict = { vans: null, policeBlocks: null, blocks: null, occupations: null };
        if (police) {
            objects.vans = police.vans.filter(van => van.districtId === districtId);
            objects.policeBlocks = police.blocks.filter(block => block.districtId === districtId);
        }
        if (players) {
            let blocks = [];
            let occupations = [];
            players.forEach(player => {
                blocks = [...blocks, ...player.blocks.filter(block => block.districtId === districtId)];
                occupations = [...occupations, ...player.occupations.filter(occupation => occupation.districtId === districtId && occupation.active)]
            })
            objects.blocks = blocks;
            objects.occupations = occupations;
        } else if (player) {
            objects.blocks = player.blocks.filter(block => block.districtId === districtId);
            objects.occupations = player.occupations.filter(occupation => occupation.districtId === districtId && occupation.active);
        }
        return objects;
    }

    createTiles(districtList: Array<District | Highway>) {
        const shuffled = shuffler(districtList);
        const cityBlocks = grid.map((gridLine: Code[]) => gridLine.map((gridItem: Code) => {
            const targetIndex = shuffled.findIndex((item: District) => item.code === gridItem);
            const targetBlock = shuffled.splice(targetIndex, 1);
            return new CityBlock(gridItem).addTile(targetBlock[0]);
        }))
        this.cityBlocks = cityBlocks;
        return this;
    }

    liberateDistrict(districtId: number) {
        const targetDistrict = this.getDistrictById(districtId);
        targetDistrict.liberateDistrict();
        targetDistrict.shoppingCenters.forEach(shopping => {
            shopping.graffiti();
        })
    }

    lootAction(districtId: number, loot: LootStatus) {
        const targetDistrict = this.getDistrictById(districtId);
        targetDistrict.lootShopping(loot);
    }
}