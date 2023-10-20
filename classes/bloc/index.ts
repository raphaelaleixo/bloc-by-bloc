import { Faction } from "../../utils/constants";

let counter = 0;
export default class Bloc {
    index: number;
    faction: Faction;

    constructor(faction: Faction) {
        this.index = counter++;
        this.faction = faction;
    }
}
