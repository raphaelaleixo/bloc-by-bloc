import { useMemo } from "react";
import District, { Highway } from "../../classes/district";
import City from "../../classes/city";
import TileInformation from "./tileInformation";
import OcupationSlot from "./ocupationSlot";
import Roads from "./roads";
import { getRandomIntInclusive } from "../../utils/randomizers";
import { TailwindProperty } from "../../utils/constants";
import { getColor } from "../../utils/getColor";
import MetroStation from "./metroStation";
import ShoppingCenters from "./shoppingCenters";


const CityTile: React.FC<{ city: City, tile: District | Highway }> = ({ city, tile }) => {

    const randomRotation = useMemo(() => getRandomIntInclusive(), []);
    
    return (
        <div
            key={tile.id}
            className={`${tile instanceof District && tile.liberated ? getColor(tile.districtType, TailwindProperty.Background) : 'bg-zinc-700'} aspect-square flex flex-col p-2 h-full overflow-hidden shadow-lg relative`}
            style={{ rotate: `${tile.rotation + randomRotation}deg`, pointerEvents: tile instanceof Highway ? 'none' : 'all' }}
        >
            <div className="absolute h-full w-full bg-zinc-700 opacity-[0.7] top-0 left-0 z-0"></div>
            {tile instanceof District ? (<TileInformation tile={tile} />) : false}
            {tile instanceof District ? (<OcupationSlot tile={tile} />) : false}
            {tile instanceof District ? (<MetroStation tile={tile} />) : false}
            {tile instanceof District ? (<ShoppingCenters tile={tile} />) : false}
            <Roads tile={tile} />
        </div>
    )
}

export default CityTile;