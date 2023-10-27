import { useMemo } from "react";
import Police from "../../classes/police";

type MoraleTrackItem = {
    text: string,
    value: number,
}

const moraleTrack: MoraleTrackItem[] = [
    {
        text: 'Timid',
        value: 1,
    },
    {
        text: 'Alert',
        value: 2,
    },
    {
        text: 'Bold',
        value: 2,
    },
    {
        text: 'Brutal',
        value: 2,
    },
    {
        text: 'Deadly',
        value: 3,
    },
];

function getRandomIntInclusive() {
    return Math.floor(Math.random() * (5)) - 3;
}


const PoliceMorale: React.FC<{ police: Police }> = ({ police }) => {
    
    const level = police?.moraleIndex || 0;
    
    const trackPiece = useMemo(() => {
        const rotation = getRandomIntInclusive();
        return (<div className="absolute h-full w-full t-0 l-0 bg-white outline outline-2 outline-black" style={{ rotate: `${-rotation}deg` }}></div>);
    }, [level]);

    return (
        <div className="text-zinc-300 font-black uppercase text-center">
            <div className="text-xl">Police morale</div>
            <div className="flex flex-wrap w-[160px] justify-center">
                {
                    moraleTrack.map((trackItem, index) => (
                        <div key={trackItem.text} className="w-1/2 p-2">
                            <div className="font-saira_stencil text-xl leading-none">{trackItem.value}</div>
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