import { useEffect, useState } from 'react';
import Player from '../classes/Player';
import { OccupationTypes, Faction } from '../utils/constants';

function usePlayers() {
  const [players, setPlayers] = useState<Player[] | undefined>();

  useEffect(() => {
    const player1 = new Player(0, Faction.Workers)
      .initialize()
      .createOccupation(OccupationTypes.factionStart, 5).createBlock(5);
    setPlayers([player1]);
  }, []);

  return { players };
}

export default usePlayers;
