import { useState } from 'react';
import City from '../../../classes/City';
import CityBlock from '../../../classes/CityBlock';
import PoliceBlocksMap from '../police/policeBlocksMap';
import PoliceMorale from '../police/policeMorale';
import PoliceOpsDeck from '../police/policeOpsDeck';
import StagingArea from '../police/stagingArea';
import CityTile from './cityTile';
import PlayersMap from '../player/playersMap';
import Police from '../../../classes/Police';
import getAdjacentDistricts from '../../../utils/getAdjacentDistricts';
import Players from '../../../classes/Players';
import { PlayerActions } from '../../../hooks/usePlayers';
import SetupPlayer from '../player/setupPlayer';

const CityMap: React.FC<{
  city: City;
  police: Police;
  players: Players;
  policeActions: any;
  playerActions: PlayerActions;
}> = ({
  city, police, policeActions, players, playerActions,
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

  return players ? (
    <div className="contents select-none">
      <div className="flex flex-col gap-5">
        <PoliceOpsDeck
          city={city}
          police={police}
          players={players}
          drawPoliceCard={policeActions.drawPoliceCard}
        />
        <StagingArea policeCount={police?.blockCount} />
        <PoliceMorale police={police} />
      </div>
      <div className="w-[700px] h-[700px] relative">
        <div className="grid grid-cols-5 w-full h-full gap-2 absolute">
          {city?.cityBlocks.map((line: CityBlock[]) => line.map((district: CityBlock) => (
              <CityTile
                tile={district.tile}
                key={district.tile.id}
                higlightedTiles={higlightedTiles}
                setHighlightedTiles={highlightTiles}
              />
          )))}
        </div>
        <PlayersMap city={city} players={players} />
        <PoliceBlocksMap city={city} police={police} />
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

export default CityMap;
