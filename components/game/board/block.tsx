import { useEffect, useState } from "react";
import { Faction, TailwindProperty } from "../../../utils/constants";
import { getColor } from "../../../utils/getColor";
import { getRandomIntInclusive } from "../../../utils/randomizers";

const BlockPiece: React.FC<{ faction?: Faction, numberOfBlocks?: number, x?: number, y?: number }> = ({ faction, numberOfBlocks, x, y }) => {

    const [rotation, setRotation] = useState<number>(0);
    useEffect(() => {
        setRotation(getRandomIntInclusive(5));
    }, [])

    const absolutePositionStyles = isNaN(x) && isNaN(y) ? '' : 'absolute transition-all duration-300';
    const bgColor = faction ? getColor(faction, TailwindProperty.Background) : 'bg-white';

    return (
        <div className={`${absolutePositionStyles} w-4 h-4 ${bgColor} shadow-md outline outline-2 outline-black `} style={{ top: y, left: x, rotate: `${rotation}deg` }}>
            {numberOfBlocks > 1 ? (
                <div
                    className={`w-4 h-4 rounded-full ${bgColor} text-zinc-700 outline outline-2 outline-black text-[0.65rem] absolute flex items-center justify-center font-bold right-[-1em] bottom-[-1em]`}
                    style={{
                        rotate: `-${rotation}deg`
                    }}
                >
                    {numberOfBlocks}
                </div>
            ) : false}
        </div>
    )
}

export default BlockPiece;