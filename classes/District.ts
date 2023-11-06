import { Type } from 'class-transformer';
import ShoppingCenter from './ShoppingCenter';
import Bloc from './Bloc';
import {
  Faction, Code, DistrictType, rotations, OtherDistrictTypes,
  LootStatus,
} from '../utils/constants';
import { randomSelect } from '../utils/randomizers';
import generateShoppingCenters from '../utils/generateShoppingCenter';
import Tile from './Tile';

export default class District extends Tile {
  districtType: OtherDistrictTypes | Faction;

  difficulty: number;

  metroStation: boolean;

  id: number;

  title: string = '';

  liberated: boolean = false;

  hasOccupationSlot: boolean;

  roads: boolean[];

  @Type(() => ShoppingCenter)
    shoppingCenters: ShoppingCenter[];

  @Type(() => Bloc)
    blocs: Bloc[] = [];

  constructor(
    id: number,
    title: string,
    code: Code,
    metroStation: boolean,
    districtType: DistrictType,
    difficulty: number,
    roads: boolean[] = [true, true, true, true],
  ) {
    super(code, districtType);
    this.roads = roads;
    this.id = id;
    this.title = title;
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
      (bloc: Bloc) => bloc.index !== targetBloc.index,
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
      this.districtType !== OtherDistrictTypes.Commercial
            && this.districtType !== OtherDistrictTypes.Public
    ) {
      this.difficulty -= 1;
    }
    return this;
  }

  lootShopping(loot: LootStatus) {
    const targetShopping = this.shoppingCenters
      .find((shopping) => shopping.lootStatus === LootStatus.None);
    if (targetShopping) {
      if (loot === LootStatus.Graffiti) {
        targetShopping.graffiti();
      } else {
        targetShopping.burn();
      }
    }
  }
}
