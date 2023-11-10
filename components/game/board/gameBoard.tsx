import { useState } from 'react';
import City from '../../../classes/City';
import PoliceMorale from '../police/policeMorale';
import StagingArea from '../police/stagingArea';
import Police from '../../../classes/Police';
import getAdjacentDistricts from '../../../utils/getAdjacentDistricts';
import Players from '../../../classes/Players';
import { PlayerActions } from '../../../hooks/usePlayers';
import SetupPlayer from '../player/setupPlayer';
// import computeGameStep from '../../../utils/computeGameStep';
// import { GameStates } from '../../../utils/constants';
import CityMap from './cityMap';
import Countdown from './countdown';

const GameBoard: React.FC<{
  city: City;
  police: Police;
  players: Players;
  policeActions: any;
  playerActions: PlayerActions;
}> = ({
  city,
  police,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  policeActions,
  players,
  playerActions,
}) => {
  const [higlightedTiles, setHighlightedTiles] = useState<number[]>([]);

  const highlightTiles = (tileId: number) => {
    if (tileId) {
      setHighlightedTiles(
        getAdjacentDistricts(city, tileId).map((district) => district.tile.id),
      );
    } else {
      setHighlightedTiles([]);
    }
  };

  // const gameStep: GameStates = useMemo(
  //   () => computeGameStep(players),
  //   [players],
  // );

  return players ? (
    <div className="w-full flex gap-6 select-none p-3 items-start">
      <div className="flex flex-col gap-5">
        <PoliceMorale police={police} />
        <StagingArea policeCount={police?.blockCount} />
      </div>
      <CityMap
        players={players}
        police={police}
        city={city}
        highlightTiles={highlightTiles}
        higlightedTiles={higlightedTiles}
      />
      <Countdown police={police} />
      <SetupPlayer
        playerActions={playerActions}
        players={players}
        setHighlightedTiles={setHighlightedTiles}
      />
    </div>
  ) : (
    <div></div>
  );
};

export default GameBoard;
