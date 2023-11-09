import { useState } from 'react';
import { Button } from 'antd';
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
import findFactionDistricts from '../../../utils/findFactionDistricts';
import Players from '../../../classes/Players';
import { PlayerActions } from '../../../hooks/usePlayers';

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
      setHighlightedTiles(getAdjacentDistricts(city, tileId)
        .map((district) => district.tile.id));
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
      <div className="text-white">
        {players.listOfPlayers.map((player) => {
          const possibleDistricts = findFactionDistricts(player.faction);
          return (
            <div key={player.playerNumber}>
              <h2>Setup {`${player.faction}`}</h2>
              {possibleDistricts.map((district) => (
                <Button
                  key={district}
                  onClick={() => {
                    playerActions.setupPlayer(
                      player.playerNumber,
                      district,
                    );
                  }
                  }
                  onMouseOver={() => setHighlightedTiles([district])}
                >
                  {district}
                </Button>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default CityMap;
