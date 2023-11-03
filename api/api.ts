import { instanceToPlain, plainToInstance } from "class-transformer"
import { equalTo, onValue, orderByChild, push, query, ref, set } from "firebase/database";
import database from "./firebase.api";
import Police from "../classes/police";
import City from "../classes/city";
import Game from "../classes/game";


export const savePolice = (police: Police) => {
    const jsonString = JSON.stringify(instanceToPlain(police));
    set(ref(database, 'test/police'), jsonString);
}

export const saveCity = (city: City) => {
    const jsonString = JSON.stringify(instanceToPlain(city));
    set(ref(database, 'test/city'), jsonString);
}

export const saveGame = (game: Game) => {
    const plain = instanceToPlain(game);
    const gameListRef = ref(database, 'games');
    const newGameRef = push(gameListRef);
    set(newGameRef, plain);
}

export const loadGame = (roomId: string) => {
    const gameRef = query(ref(database, 'games'), orderByChild('room'), equalTo(roomId));
    let game: Game;
    onValue(gameRef, (snapshot) => {
        snapshot.forEach(child => {
            if (child.val()) {
                game = plainToInstance(Game, child.val());
            }
        });
    });
    return game;
}