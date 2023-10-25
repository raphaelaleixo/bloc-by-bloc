import { useMemo } from "react";
import District, { Highway } from "../../classes/district";
import Police from "../../classes/police";
import { getAdjacentDistricts } from "../../utils/getAdjacentDistricts";
import City, { CityBlock } from "../../classes/city";
import TileInformation from "./tileInformation";
import OcupationSlot from "./ocupationSlot";

const CityTile: React.FC<{ city: City, tile: District | Highway, police: Police, highightedTiles: CityBlock[], setHighlightedTiles: Function }> = ({ city, tile, police, highightedTiles, setHighlightedTiles }) => {

    const isHighlighted = useMemo(() => {
        const ids = highightedTiles.map((block: CityBlock) => block.tile.id);
        return ids.includes(tile.id);
    }, [highightedTiles]);

    const blocksOnDistrict = useMemo(() => {
        const blocks = police.blocks.filter(block => block.districtId === tile.id);
        return blocks;
    }, [police, tile.id]);

    return (
        <div
            key={tile.id}
            onMouseOver={() => setHighlightedTiles(getAdjacentDistricts(city, tile.id))}
            onMouseOut={() => setHighlightedTiles([])}
            className="bg-zinc-700 aspect-square flex flex-col p-2 h-full overflow-hidden relative hover:outline hover:outline-2 outline-blue-500"
            style={{ rotate: `${tile.rotation}deg`, outline: isHighlighted ? '2px solid blue' : '', pointerEvents: tile instanceof Highway ? 'none' : 'all' }}
        >
            <TileInformation tile={tile} />
            <OcupationSlot tile={tile} />

            {tile instanceof Highway ? (
                <>
                    <div className="absolute w-full h-full top-0 left-0 rounded-full shadow-[0_0_0_20px_rgb(0,0,0)] translate-x-[calc(-50%_-_10px)] translate-y-[calc(-50%_-_10px)]"></div>
                    <div className="absolute w-full h-full top-0 left-0 rounded-full shadow-[0_0_0_20px_rgb(0,0,0)] translate-x-[calc(50%_+_10px)] translate-y-[calc(50%_+_10px)]"></div>
                </>
            ) : (
                <>
                    <div className="w-[20px] h-full absolute bg-black top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%]"></div>
                    {tile instanceof District &&
                        tile.metroStation ? (
                        <div className="h-[20px] w-[50%] absolute bg-black top-2/4 left-0 translate-y-[-50%]"></div>
                    ) : (
                        <div className="h-[20px] w-full absolute bg-black top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%]"></div>
                    )}
                </>
            )}
            <div className="absolute grid cols-3 gap-1 z-20">
                {
                    blocksOnDistrict.map((_block, index) => (
                        <div key={index} className="w-4 h-4 bg-white shadow-lg"></div>
                    ))
                }
            </div>
        </div>
    )
}

export default CityTile;