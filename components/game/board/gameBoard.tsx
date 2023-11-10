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
import PoliceTank from '../police/policeTank';

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

  console.log(police);

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
      <div className="px-2 flex flex-col items-center h-[700px] justify-between">
        <div className="vertical text-amber-500 font-bold uppercase">
          Countdown
        </div>
        {Array.from(Array(10), (_, index) => 10 - index).map((number) => (
          <div
            key={number}
            className="text-amber-500 relative font-black rotate-90 flex items-center justify-center w-10 h-10 border-2 border-dashed border-amber-500 rounded-full"
          >
            {number}
            { police.countdown === number ? (
              <PoliceTank className="absolute w-20 -rotate-90"/>
            ) : false
            }
          </div>
        ))}
      </div>
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
