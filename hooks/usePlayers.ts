/* eslint-disable @typescript-eslint/no-unused-vars */
import { instanceToPlain } from 'class-transformer';
import { onValue } from 'firebase/database';
import { useEffect, useState } from 'react';
import { getGameRef } from '../api/api';
import Game from '../classes/Game';
import Player from '../classes/Player';
import { OccupationTypes, Faction } from '../utils/constants';
import Players from '../classes/Players';

function usePlayers(game: Game): { players: Players } {
  const [players, setPlayers] = useState<Players | undefined>();

  useEffect(() => {
    if (players === undefined) {
      const player1 = new Player(0)
        .initialize();

      const newPlayers = new Players();
      newPlayers.addPlayer(player1);
      setPlayers(newPlayers);
    }
  }, [players]);

  return { players };
}

export default usePlayers;
