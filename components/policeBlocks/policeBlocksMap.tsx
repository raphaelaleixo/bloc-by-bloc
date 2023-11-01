import { useMemo } from "react";
import City, { DistrictCoordinate } from "../../classes/city";
import Police, { PoliceBlockMap } from "../../classes/police";
import { Block } from "../../utils/constants";
import PoliceVan from "./policeVan";

const getPoliceBlockCoordinate = (block: Block, city: City, paddingAmmountX: number = 20, paddingAmmountY: number = 20) => {
    const coordinates = city.getDistrictCoordinates();
    const targetCoordinates: DistrictCoordinate = coordinates.find(coordinate => coordinate.id === block.districtId);
    return {
        x: (140 * targetCoordinates.x) + paddingAmmountX,
        y: (140 * targetCoordinates.y) + paddingAmmountY,
    }
}

const PoliceBlocksMap: React.FC<{ city: City, police: Police }> = ({ city, police }) => {
    const blocksOnDistrict: PoliceBlockMap = useMemo(() => {
        return police?.getPoliceBlocksByDistrict();
    }, [police]);

    return (
        <div className="absolute w-full h-full top-0 right-0 pointer-events-none">
            {
                police?.blocks.map(block => {
                    const { x, y } = getPoliceBlockCoordinate(block, city);
                    const numberOfBlocks = blocksOnDistrict[block.districtId].policeBlocks;
                    return (
                        <div key={block.id} className="w-4 h-4 bg-white shadow-md outline outline-2 outline-black absolute transition-all duration-300" style={{ top: y, left: x }}>
                            {numberOfBlocks > 1 ? (
                                <div className="w-4 h-4 rounded-full bg-white text-zinc-700 outline outline-2 outline-black text-[0.65rem] leading-[0] tabular-nums absolute flex items-center justify-center font-black right-[-1em] bottom-[-1em]">
                                    {numberOfBlocks}
                                </div>
                            ) : false}
                        </div>
                    )
                })
            }
            {
                police?.vans.map(van => {
                    const { x, y } = getPoliceBlockCoordinate(van, city, 10, 40);
                    return (
                        <div key={van.id} className="absolute" style={{ top: y, left: x }}>
                            <PoliceVan  />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default PoliceBlocksMap;