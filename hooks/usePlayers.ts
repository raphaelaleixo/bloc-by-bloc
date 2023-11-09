import { instanceToPlain, plainToInstance } from 'class-transformer';
import { onValue } from 'firebase/database';
import { useEffect, useState } from 'react';
import { getGameRef, savePlayers } from '../api/api';
import Game from '../classes/Game';
import Player from '../classes/Player';
import { OccupationTypes, PlayerNumber } from '../utils/constants';
import Players from '../classes/Players';

const initializePlayers = (game: Game): Players => {
  const players = new Players();
  game.players.forEach((newPlayer, index) => {
    players.addPlayer(new Player(index as PlayerNumber).addFaction(newPlayer));
  });
  return players;
};

export type PlayerActions = {
  createOccupation: (
    playerNumber: PlayerNumber,
    type: OccupationTypes,
    districtId: number
  ) => void;
};

function usePlayers(game: Game): {
  players: Players;
  playerActions: PlayerActions;
} {
  const [players, setPlayers] = useState<Players | undefined>();

  useEffect(() => {
    if (game?.room) {
      const gameRef = getGameRef(game.room);
      onValue(gameRef, (snapshot) => {
        const newPlayersData = snapshot.val()?.players;
        const currentPlayerData = JSON.stringify(instanceToPlain(players));
        if (newPlayersData && newPlayersData !== currentPlayerData) {
          setPlayers(plainToInstance(Players, JSON.parse(newPlayersData)));
        } else if (players === undefined) {
          savePlayers(initializePlayers(game), game.room);
        }
      });
    }
  }, [game?.room]);

  const createOccupation = (
    playerNumber: PlayerNumber,
    type: OccupationTypes,
    districtId: number,
  ) => {
    const newPlayers = players.clone();
    newPlayers.createOccupation(playerNumber, type, districtId);
    savePlayers(newPlayers, game.room);
  };

  return { players, playerActions: { createOccupation } };
}

export default usePlayers;
