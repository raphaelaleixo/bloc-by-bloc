import { policeOpsDeck } from "../../gameData/policeOpsDeck";
import { shuffler } from "../../utils/randomizers";
import { PoliceOpsCard } from "./constants";

export default class PoliceOpsDeck {
    cards: PoliceOpsCard[] = [];
    
    initialize() {
        this.shuffleDeck();
    }
    
    shuffleDeck() {
        this.cards = shuffler(policeOpsDeck);
        return this;
    }

    draw(): PoliceOpsCard {
        if (this.cards.length === 0) {
            this.shuffleDeck()
        }
        return this.cards.shift();
    }
}