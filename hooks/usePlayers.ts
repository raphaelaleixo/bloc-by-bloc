import { instanceToPlain, plainToInstance } from 'class-transformer';
import { onValue } from 'firebase/database';
import { useEffect, useState } from 'react';
import { getGameRef, savePlayers } from '../api/api';
import Game from '../classes/Game';
import Player from '../classes/Player';
import { PlayerNumber } from '../utils/constants';
import Players from '../classes/Players';

const initializePlayers = (game: Game): Players => {
  const players = new Players();
  game.players.forEach((newPlayer, index) => {
    players.addPlayer(new Player(index as PlayerNumber).addFaction(newPlayer));
  });
  return players;
};

function usePlayers(game: Game): { players: Players } {
  const [players, setPlayers] = useState<Players | undefined>();

  useEffect(() => {
    if (game?.room) {
      const gameRef = getGameRef(game.room);
      onValue(gameRef, (snapshot) => {
        const newPlayersData = snapshot.val()?.police;
        const currentPoliceData = JSON.stringify(instanceToPlain(players));
        if (newPlayersData && newPlayersData !== currentPoliceData) {
          setPlayers(plainToInstance(Players, JSON.parse(newPlayersData)));
        } else if (players === undefined) {
          savePlayers(initializePlayers(game), game.room);
        }
      });
    }
  }, [players, game]);

  return { players };
}

export default usePlayers;
