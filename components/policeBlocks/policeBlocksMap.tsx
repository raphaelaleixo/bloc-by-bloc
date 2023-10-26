import { useMemo } from "react";
import City, { DistrictCoordinate } from "../../classes/city";
import Police, { PoliceBlock } from "../../classes/police";

const getPoliceBlockCoordinate = (block: PoliceBlock, city: City) => {
    const coordinates = city.getDistrictCoordinates();
    const targetCoordinates: DistrictCoordinate = coordinates.find(coordinate => coordinate.id === block.districtId);
    return {
        x: (140 * targetCoordinates.x) + 20,
        y: (140 * targetCoordinates.y) + 20,
    }
}

const PoliceBlocksMap: React.FC<{ city: City, police: Police }> = ({ city, police }) => {
    const blocksOnDistrict: { districtId: number | string, value: number }[] = useMemo(() => {
        const blockMap = [];
        if (police) {
            const districtsWithPoliceBlocks = police.getDistrictsWithPoliceBlocks();
            districtsWithPoliceBlocks.forEach((district) => {
                const length = police.blocks.filter(block => block.districtId === district).length;
                const mapObj = {
                    districtId: district,
                    value: length,
                }
                blockMap.push(mapObj);
            })
        }
        return blockMap;
    }, [police]);
    
    return (
        <div className="absolute w-full h-full top-0 right-0 pointer-events-none">
            {
                police?.blocks.map(block => {
                    const { x, y } = getPoliceBlockCoordinate(block, city);
                    const numberOfBlocks = blocksOnDistrict.find((district) => district.districtId === block.districtId).value;
                    return (
                        <div key={block.id} className="w-4 h-4 bg-white shadow-md outline outline-1 outline-black absolute transition-all duration-300" style={{ top: y, left: x }}>
                            {numberOfBlocks > 1 ? (
                                <div className="w-4 h-4 rounded-full bg-red-500 text-white outline outline-1 outline-black text-[0.65rem] absolute flex items-center justify-center text-bold right-[-1em] bottom-[-1em]">
                                    {numberOfBlocks}
                                </div>
                            ) : false}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default PoliceBlocksMap;