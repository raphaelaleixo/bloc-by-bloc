import { instanceToPlain, plainToInstance } from 'class-transformer';
import {
  DatabaseReference, child, get, ref, set,
} from 'firebase/database';
import database from './firebase.api';
import Police from '../classes/Police';
import City from '../classes/City';
import Game from '../classes/Game';
import Players from '../classes/Players';

export const savePolice = (police: Police, roomId: string) => {
  const jsonString = JSON.stringify(instanceToPlain(police));
  set(ref(database, `data/${roomId}/police`), jsonString);
};

export const saveCity = (city: City, roomId: string) => {
  const jsonString = JSON.stringify(instanceToPlain(city));
  set(ref(database, `data/${roomId}/city`), jsonString);
};

export const savePlayers = (players: Players, roomId: string) => {
  const jsonString = JSON.stringify(instanceToPlain(players));
  set(ref(database, `data/${roomId}/players`), jsonString);
};

export const saveGame = (game: Game) => {
  const newGame = instanceToPlain(game);
  const gameListRef = ref(database, 'data');
  const newGameRef = child(gameListRef, game.room);
  set(newGameRef, { game: newGame });
};

export const loadAllGames = async () => {
  const gamesRef = ref(database, 'data');
  const games: Game[] = [];
  await get(gamesRef).then((snapshot) => {
    snapshot.forEach((snapshotChild) => {
      const loadedData = snapshotChild.val();
      if (loadedData) {
        games.push(plainToInstance(Game, loadedData.game));
      }
    });
  });
  return games;
};

export const getGameRef = (roomId: string): DatabaseReference => {
  const gameRef = ref(database, `data/${roomId}`);
  return gameRef;
};

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
};
