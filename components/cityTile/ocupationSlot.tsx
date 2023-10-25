import { useMemo } from "react";
import District, { Highway } from "../../classes/district"
import { Faction } from "../../utils/constants";
import { OtherDistrictTypes } from "../../classes/district/constants";

const OcupationSlot: React.FC<{ tile: District | Highway }> = ({ tile }) => {

    if (tile instanceof Highway || tile.hasOccupationSlot === false) {
        return false;
    }

    const borderColor = useMemo(() => {
        switch (tile.districtType) {
            case (Faction.Neighbors):
                return 'border-green-500';
            case (Faction.Prisoners):
                return 'border-orange-500';
            case (Faction.Workers):
                return 'border-yellow-500';
            case (Faction.Students):
                return 'border-purple-500';
            case (OtherDistrictTypes.Public):
                return 'border-fuchsia-300';
            case (OtherDistrictTypes.State):
                return 'border-white';
        }
    }, [tile.districtType])


    return (
        <div className={`absolute w-1/4 h-1/4 rounded-full right-[8%] top-[8%] border border-4 ${borderColor}`}></div>
    )
}

export default OcupationSlot;