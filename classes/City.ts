import { Type } from 'class-transformer';
import grid from '../gameData/cityGrid';
import { Code, LootStatus } from '../utils/constants';
import { shuffler } from '../utils/randomizers';
import District from './District';
import Highway from './Highway';
import CityBlock from './CityBlock';

export type DistrictCoordinate = {
  x: number;
  y: number;
  id: number | string;
};

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
          x, y, id: block.tile.id,
        });
        x++;
      });
      y++;
      x = 0;
    });
    return coordinates;
  }

  getDistrictById(districtId: number): District {
    let district: District;
    this.cityBlocks.forEach((line) => {
      const targetDistrict = line.find((block) => block.tile.id === districtId)?.tile;
      if (targetDistrict && targetDistrict instanceof District) {
        district = targetDistrict;
      }
    });
    return district;
  }

  createTiles(districtList: Array<District | Highway>) {
    const shuffled = shuffler(districtList);
    const cityBlocks = grid.map((gridLine: Code[]) => gridLine.map((gridItem: Code) => {
      const targetIndex = shuffled.findIndex((item: District) => item.code === gridItem);
      const targetBlock = shuffled.splice(targetIndex, 1);
      return new CityBlock(gridItem).addTile(targetBlock[0]);
    }));
    this.cityBlocks = cityBlocks;
    return this;
  }

  liberateDistrict(districtId: number) {
    const targetDistrict = this.getDistrictById(districtId);
    targetDistrict.liberateDistrict();
    targetDistrict.shoppingCenters.forEach((shopping) => {
      shopping.graffiti();
    });
  }

  lootAction(districtId: number, loot: LootStatus) {
    const targetDistrict = this.getDistrictById(districtId);
    targetDistrict.lootShopping(loot);
  }
}
