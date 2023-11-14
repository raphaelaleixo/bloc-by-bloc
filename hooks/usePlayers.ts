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
  createBlock: (playerNumber: PlayerNumber, districtId: number) => void;
  setupPlayer: (playerNumber: PlayerNumber, districtId: number) => void;
  rollDice: (playerNumber: PlayerNumber) => void;
  skipActions: (playerNumber: PlayerNumber) => void;
  finishNightTimeStep: (playerNumber: PlayerNumber) => void;
  startNightTimeStep: (playerNumber: PlayerNumber) => void;
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
    const playersClone = players.clone();
    playersClone.createOccupation(playerNumber, type, districtId);
    savePlayers(playersClone, game.room);
  };

  const createBlock = (playerNumber: PlayerNumber, districtId: number) => {
    const playersClone = players.clone();
    playersClone.createBlock(playerNumber, districtId);
    savePlayers(playersClone, game.room);
  };

  const setupPlayer = (playerNumber: PlayerNumber, districtId: number) => {
    const numberOfBlocks = 1 + (4 - players.listOfPlayers.length);
    const playersClone = players.clone();
    playersClone.createOccupation(
      playerNumber,
      OccupationTypes.factionStart,
      districtId,
    );
    for (let i = 0; i < numberOfBlocks; i++) {
      playersClone.createBlock(playerNumber, districtId);
    }
    playersClone.finishSetup(playerNumber);
    savePlayers(playersClone, game.room);
  };

  const rollDice = (playerNumber: PlayerNumber) => {
    const playersClone = players.clone();
    playersClone.rollDice(playerNumber);
    savePlayers(playersClone, game.room);
  };

  const skipActions = (playerNumber: PlayerNumber) => {
    const playersClone = players.clone();
    playersClone.skipActions(playerNumber);
    savePlayers(playersClone, game.room);
  };

  const finishNightTimeStep = (playerNumber: PlayerNumber) => {
    const playersClone = players.clone();
    playersClone.finishNightTimeStep(playerNumber);
    savePlayers(playersClone, game.room);
  };

  const startNightTimeStep = (playerNumber: PlayerNumber) => {
    const playersClone = players.clone();
    playersClone.startNightTimeStep(playerNumber);
    savePlayers(playersClone, game.room);
  };

  return {
    players,
    playerActions: {
      createOccupation,
      createBlock,
      setupPlayer,
      rollDice,
      skipActions,
      finishNightTimeStep,
      startNightTimeStep,
    },
  };
}

export default usePlayers;
