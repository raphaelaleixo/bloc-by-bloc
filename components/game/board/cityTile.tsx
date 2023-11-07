import { useMemo } from 'react';
import District from '../../../classes/District';
import Highway from '../../../classes/Highway';
import CityBlock from '../../../classes/CityBlock';
import TileInformation from './tileInformation';
import OcupationSlot from './ocupationSlot';
import Roads from './roads';
import { getRandomIntInclusive } from '../../../utils/randomizers';
import { TailwindProperty } from '../../../utils/constants';
import getColor from '../../../utils/getColor';
import MetroStation from './metroStation';
import ShoppingCenters from './shoppingCenters';

const CityTile: React.FC<{
  tile: District | Highway,
  higlightedTiles: CityBlock[],
  setHighlightedTiles: Function
}> = ({
  tile, higlightedTiles, setHighlightedTiles,
}) => {
  const randomRotation = useMemo(() => getRandomIntInclusive(), []);

  const isHighlighted = useMemo(() => {
    const ids = higlightedTiles.map((block: CityBlock) => block.tile.id);
    return ids.includes(tile.id);
  }, [higlightedTiles, tile.id]);

  return (
        <div
            key={tile.id}
            onMouseOver={() => setHighlightedTiles(tile.id) }
            onMouseOut={() => setHighlightedTiles()}
            className={`${tile instanceof District && tile.liberated ? getColor(tile.districtType, TailwindProperty.Background) : 'bg-zinc-700'} hover:outline hover:outline-2 outline-blue-500 aspect-square overflow-hidden shadow-lg relative`}
            style={{
              rotate: `${tile.rotation + randomRotation}deg`,
              outline: isHighlighted ? '2px solid blue' : '',
            }}
        >
            <div className="block absolute h-full w-full bg-zinc-700 opacity-[0.7] top-0 left-0 p-2 pointer-events-none">
              {tile instanceof District ? (<OcupationSlot tile={tile} />) : false}
              {tile instanceof District ? (<MetroStation tile={tile} />) : false}
              {tile instanceof District ? (<ShoppingCenters tile={tile} />) : false}
              <Roads tile={tile} />
              {tile instanceof District ? (<TileInformation tile={tile} />) : false}
            </div>
        </div>
  );
};

export default CityTile;
