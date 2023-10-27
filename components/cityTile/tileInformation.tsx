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
                return 'text-zinc-300';
        }
    }, [tile.districtType])


    return (
        <div className="relative z-10 leading-tight text-zinc-300">
            <div className="text-[0.5rem]">
                <span>{tile.id}</span>
            </div>
            <div className={`text-xs w-2/3 leading-none font-bold uppercase`}>
                <span>
                    {tile.title}
                </span>
            </div>
            <div className={`text-[0.5rem] ${textColor} tracking-wider font-bold`}>
                <span>{tile.districtType}</span>
            </div>
        </div>
    )
}

export default TileInformation;