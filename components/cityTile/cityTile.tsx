import { useMemo } from "react";
import District, { Highway } from "../../classes/district";
import Police from "../../classes/police";
import { getAdjacentDistricts } from "../../utils/getAdjacentDistricts";
import City, { CityBlock } from "../../classes/city";
import TileInformation from "./tileInformation";
import OcupationSlot from "./ocupationSlot";
import Roads from "./roads";

function getRandomIntInclusive() {
    return Math.floor(Math.random() * (3)) - 1;
}

const CityTile: React.FC<{ city: City, tile: District | Highway, highightedTiles: CityBlock[], setHighlightedTiles: Function }> = ({ city, tile, highightedTiles, setHighlightedTiles }) => {

    const randomRotation = useMemo(() => getRandomIntInclusive(), []);
    
    const isHighlighted = useMemo(() => {
        const ids = highightedTiles.map((block: CityBlock) => block.tile.id);
        return ids.includes(tile.id);
    }, [highightedTiles, tile.id]);

    return (
        <div
            key={tile.id}
            onMouseOver={() => setHighlightedTiles(getAdjacentDistricts(city, tile.id))}
            onMouseOut={() => setHighlightedTiles([])}
            className="bg-zinc-700 aspect-square flex flex-col p-2 h-full overflow-hidden shadow-lg relative hover:outline hover:outline-2 outline-blue-500"
            style={{ rotate: `${tile.rotation + randomRotation}deg`, outline: isHighlighted ? '2px solid blue' : '', pointerEvents: tile instanceof Highway ? 'none' : 'all' }}
        >

            {tile instanceof District ? (<TileInformation tile={tile} />) : false}
            {tile instanceof District ? (<OcupationSlot tile={tile} />) : false}
            <Roads tile={tile} />
        </div>
    )
}

export default CityTile;