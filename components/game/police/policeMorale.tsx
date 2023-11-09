import { useMemo } from 'react';
import Police from '../../../classes/Police';
import { moraleTrack } from '../../../utils/constants';
import { getRandomIntInclusive } from '../../../utils/randomizers';

const PoliceMorale: React.FC<{ police: Police }> = ({ police }) => {
  const level = police?.moraleIndex || 0;
  const trackPiece = useMemo(() => {
    const rotation = getRandomIntInclusive();
    return (<div className="absolute h-full w-full t-0 l-0 bg-white outline outline-2 outline-black" style={{ rotate: `${-rotation}deg` }}></div>);
  }, [level]);

  return (
        <div className="text-zinc-300 font-bold uppercase text-center flex justify-center">
            <div className="text-xl rotate-180" style={{ writingMode: 'vertical-rl' }}>Police morale</div>
            <div className="flex flex-col-reverse justify-center">
                {
                    moraleTrack.map((trackItem, index) => (
                        <div key={trackItem.text} className="p-2 w-16 aspect-square -rotate-90">
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
  );
};

export default PoliceMorale;
