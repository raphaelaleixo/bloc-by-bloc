import City from '../../../classes/City';
import CityBlock from '../../../classes/CityBlock';
import Players from '../../../classes/Players';
import Police from '../../../classes/Police';
import PlayersMap from '../player/playersMap';
import PoliceBlocksMap from '../police/policeBlocksMap';
import CityTile from './cityTile';

const CityMap: React.FC<{
  city: City;
  players: Players;
  police: Police;
  higlightedTiles: number[];
  highlightTiles: Function;
}> = ({
  city, players, police, highlightTiles, higlightedTiles,
}) => (
  <div className="w-[700px] h-[700px] relative">
    <div className="grid grid-cols-5 w-full h-full gap-2 absolute">
      {city?.cityBlocks.map((line: CityBlock[]) => line
        .map((district: CityBlock) => (
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
);

export default CityMap;
