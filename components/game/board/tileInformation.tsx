import { useMemo } from "react";
import District, { Highway } from "../../../classes/district"
import { Faction, TailwindProperty } from "../../../utils/constants";
import { OtherDistrictTypes } from "../../../classes/district/constants";
import { getColor } from "../../../utils/getColor";

const TileInformation: React.FC<{ tile: District }> = ({ tile }) => {
    const textColor = useMemo(() => {
        return getColor(tile.districtType, TailwindProperty.Text);
    }, [tile.districtType])


    return (
        <>
            <div className="relative z-10 leading-tight text-zinc-300">
                {
                    tile instanceof District && tile.liberated ? (
                        <div className={`text-[0.5rem] ${textColor} tracking-wider font-bold uppercase`}>
                            <span>Liberated</span>
                        </div>
                    ) : false
                }
                <div className={`text-[0.65em] w-2/3 leading-none font-bold uppercase`}>
                    <span>
                        {tile.title}
                    </span>
                </div>
                <div className={`text-[0.5rem] ${textColor} tracking-wider font-bold`}>
                    <span>{tile.districtType}</span>
                </div>
            </div>
            <div className="font-saira_stencil text-zinc-500 absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rotate-45 text-sm">
                {tile.difficulty}
            </div>
            <div className="text-zinc-500 font-bold absolute bottom-0 right-1 z-10 text-[0.5em]">
                {tile.id}
            </div>
        </>
    )
}

export default TileInformation;