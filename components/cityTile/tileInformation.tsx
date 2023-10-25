import { useMemo } from "react";
import District, { Highway } from "../../classes/district"
import { Faction } from "../../utils/constants";
import { OtherDistrictTypes } from "../../classes/district/constants";

const TileInformation: React.FC<{ tile: District }> = ({ tile }) => {
    const textColor = useMemo(() => {
        switch (tile.districtType) {
            case (Faction.Neighbors):
                return 'text-green-500';
            case (Faction.Prisoners):
                return 'text-orange-500';
            case (Faction.Workers):
                return 'text-yellow-500';
            case (Faction.Students):
                return 'text-purple-500';
            case (OtherDistrictTypes.Public):
                return 'text-fuchsia-300';
            case (OtherDistrictTypes.State):
                return 'text-white';
            default:
                return 'text-zinc-500';
        }
    }, [tile.districtType])


    return (
        <>
            <div className="text-[0.5rem] text-zinc-400 font-bold relative z-10">
                <span>{tile.id}</span>
            </div>
            <div className={`text-xs text-zinc-400 leading-4 font-bold uppercase relative z-10`}>
                <span>
                    {tile.title}
                </span>
            </div>
            <div className={`text-[0.5rem] ${textColor} font-bold relative z-10`}>
                <span>{tile.districtType}</span>
            </div>
        </>
    )
}

export default TileInformation;