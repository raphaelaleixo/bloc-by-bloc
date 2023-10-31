import { useMemo } from "react";
import District, { Highway } from "../../classes/district";
import City from "../../classes/city";
import TileInformation from "./tileInformation";
import OcupationSlot from "./ocupationSlot";
import Roads from "./roads";
import { getRandomIntInclusive } from "../../utils/randomizers";


const CityTile: React.FC<{ city: City, tile: District | Highway }> = ({ city, tile }) => {

    const randomRotation = useMemo(() => getRandomIntInclusive(), []);
    
    return (
        <div
            key={tile.id}
            className="bg-zinc-700 aspect-square flex flex-col p-2 h-full overflow-hidden shadow-lg relativ"
            style={{ rotate: `${tile.rotation + randomRotation}deg`, pointerEvents: tile instanceof Highway ? 'none' : 'all' }}
        >
            {tile instanceof District ? (<TileInformation tile={tile} />) : false}
            {tile instanceof District ? (<OcupationSlot tile={tile} />) : false}
            <Roads tile={tile} />
        </div>
    )
}

export default CityTile;