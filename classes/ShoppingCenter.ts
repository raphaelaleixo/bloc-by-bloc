import { LootStatus } from '../utils/constants';

let id = 0;
export default class ShoppingCenter {
  lootStatus: LootStatus = LootStatus.None;

  id: number;

  constructor() {
    this.id = id++;
  }

  burn() {
    if (this.lootStatus === LootStatus.None) {
      this.lootStatus = LootStatus.Burned;
    }
    return this;
  }

  graffiti() {
    if (this.lootStatus === LootStatus.None) {
      this.lootStatus = LootStatus.Graffiti;
    }
    return this;
  }
}
