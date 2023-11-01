import District from "../../classes/district"
import { FaTrainSubway } from "react-icons/fa6";

const MetroStation: React.FC<{ tile: District }> = ({ tile }) => {

    if (tile.metroStation === false) {
        return false;
    }

    return (
        <div className={`absolute w-1/4 h-1/4 rounded-full right-[8%] bottom-[8%] bg-black flex items-center justify-center`}>
            <FaTrainSubway size="0.875em" className="text-zinc-300" />
        </div>
    )
}

export default MetroStation;