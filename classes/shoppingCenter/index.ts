import { LootStatus } from "./constants";

export default class ShoppingCenter {
  lootStatus: LootStatus = LootStatus.None;

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
