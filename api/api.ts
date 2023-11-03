import { instanceToPlain, plainToInstance } from "class-transformer"
import { DatabaseReference, child, equalTo, get, onValue, orderByChild, push, query, ref, set } from "firebase/database";
import database from "./firebase.api";
import Police from "../classes/police";
import City from "../classes/city";
import Game from "../classes/game";


export const savePolice = (police: Police, roomId: string) => {
    const jsonString = JSON.stringify(instanceToPlain(police));
    set(ref(database, `data/${roomId}/police`), jsonString);
}

export const saveCity = (city: City, roomId: string) => {
    const cityJSON = JSON.stringify(instanceToPlain(city));
    set(ref(database, `data/${roomId}/city`), cityJSON);
}

export const saveGame = (game: Game) => {
    const newGame = instanceToPlain(game);
    const gameListRef = ref(database, 'data');
    const newGameRef = child(gameListRef, game.room);
    set(newGameRef, { game });
}

export const loadAllGames = async () => {
    const gamesRef = ref(database, 'data');
    let games: Game[] = [];
    await get(gamesRef).then((snapshot) => {
        snapshot.forEach(child => {
            const loadedData = child.val();
            if (loadedData) {
                games.push(plainToInstance(Game, loadedData.game));
            }
        });
    });
    return games;
}

export const getGameRef = (roomId: string): DatabaseReference => {
    const gameRef = ref(database, `data/${roomId}`);
    return gameRef;
}

export const loadGame = async (roomId: string) => {
    const gameRef = getGameRef(roomId);
    let game: Game = null;
    await get(gameRef).then((snapshot) => {
        const loadedData = snapshot.val();
        if (loadedData) {
            game = loadedData.game;
        }
    });
    return game;
}