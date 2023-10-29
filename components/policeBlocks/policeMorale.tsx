import { useMemo } from "react";
import Police from "../../classes/police";
import { moraleTrack } from "../../classes/police/constants";
import { getRandomIntInclusive } from "../../utils/randomizers";

const PoliceMorale: React.FC<{ police: Police }> = ({ police }) => {
    
    const level = police?.moraleIndex || 0;
    const trackPiece = useMemo(() => {
        const rotation = getRandomIntInclusive();
        return (<div className="absolute h-full w-full t-0 l-0 bg-white outline outline-2 outline-black" style={{ rotate: `${-rotation}deg` }}></div>);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [level]);

    return (
        <div className="text-zinc-300 font-bold uppercase text-center">
            <div className="text-xl">Police morale</div>
            <div className="flex flex-wrap w-[160px] justify-center">
                {
                    moraleTrack.map((trackItem, index) => (
                        <div key={trackItem.text} className="w-1/2 p-2">
                            <div className="font-saira_stencil font-normal text-xl leading-none">{trackItem.value}</div>
                            <div className="border border-cyan-500 h-3 relative">
                                {
                                    level === index ? trackPiece : false
                                }
                            </div>
                            <div className="text-xs mt-2 leading-[0] text-cyan-500">{trackItem.text}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default PoliceMorale;