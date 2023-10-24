import { useMemo } from "react";
import District, { Highway } from "../../classes/district";
import Police from "../../classes/police";
import { findAdjacentDistricts } from "../../utils/getAdjacentDistricts";
import City, { CityBlock } from "../../classes/city";

const CityTile: React.FC<{ city: City, tile: District | Highway, police: Police, highightedTiles: CityBlock[], setHighlightedTiles: Function }> = ({ city, tile, police, highightedTiles, setHighlightedTiles }) => {

    const isHighlighted = useMemo(() => {
        const ids = highightedTiles.map((block: CityBlock) => block.tile.id);
        return ids.includes(tile.id);
    }, [highightedTiles]);

    const blocksOnDistrict = useMemo(() => {
        const blocks = police.blocks.filter(block => block.districtId === tile.id);
        return blocks;
    }, [police]);

    return (
        <div
            key={tile.id}
            onMouseOver={() => setHighlightedTiles(findAdjacentDistricts(city, tile.id))}
            onMouseOut={() => setHighlightedTiles([])}
            className="bg-zinc-900 aspect-square flex flex-col p-2 h-full overflow-hidden relative hover:outline hover:outline-2 outline-red-500"
            style={{ rotate: `${tile.rotation}deg`, outline: isHighlighted ? '2px solid red' : '' }}
        >
            <div className="text-[0.5rem] text-white font-bold relative z-10">
                <span>{tile.id}</span>
            </div>
            <div className="text-sm text-white leading-4 font-bold uppercase relative z-10">
                <span>
                    {tile instanceof District &&
                        tile.title}
                </span>
            </div>
            <div className="text-[0.5rem] text-white font-bold relative z-10">
                <span>{tile.districtType}</span>
            </div>
            {tile instanceof Highway ? (
                <div></div>
            ) : (
                <>
                    <div className="w-[20%] h-full absolute bg-zinc-600 top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%]"></div>
                    {tile instanceof District &&
                        tile.metroStation ? (
                        <div className="h-[20%] w-[50%] absolute bg-zinc-600 top-2/4 left-0 translate-y-[-50%]"></div>
                    ) : (
                        <div className="h-[20%] w-full absolute bg-zinc-600 top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%]"></div>
                    )}
                </>
            )}
            <div className="absolute grid cols-3 gap-1">
                {
                    blocksOnDistrict.map((_block, index) => (
                        <div key={index} className="w-5 h-5 bg-white shadow-lg"></div>
                    ))
                }
            </div>
        </div>
    )
}

export default CityTile;