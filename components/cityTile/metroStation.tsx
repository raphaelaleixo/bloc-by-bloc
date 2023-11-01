import District from "../../classes/district"
import { FaTrainSubway } from "react-icons/fa6";

const MetroStation: React.FC<{ tile: District }> = ({ tile }) => {

    if (tile.metroStation === false) {
        return false;
    }

    return (
        <div className={`absolute w-1/4 h-1/4 rounded-full right-[8%] bottom-[8%] bg-black flex items-center justify-center`}>
            <FaTrainSubway size="0.875em" className="text-zinc-300 relative z-10" />
            <div className="absolute bg-black w-[15px] h-[60px] -z-0 bottom-1 -rotate-45 -left-1/4"></div>
        </div>
    )
}

export default MetroStation;