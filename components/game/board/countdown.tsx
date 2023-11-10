import Police from '../../../classes/Police';
import PoliceTank from '../police/policeTank';

const Countdown: React.FC<{ police: Police }> = ({ police }) => (
  <div className="px-2 flex flex-col items-center h-[700px] justify-between">
    <div className="vertical text-amber-500 font-bold uppercase">Countdown</div>
    {Array.from(Array(10), (_, index) => 10 - index).map((number) => (
      <div
        key={number}
        className="text-amber-500 relative font-black rotate-90 flex items-center justify-center w-10 h-10 border-2 border-dashed border-amber-500 rounded-full"
      >
        {number}
        {police.countdown === number ? (
          <PoliceTank className="absolute w-20 -rotate-90" />
        ) : (
          false
        )}
      </div>
    ))}
  </div>
);

export default Countdown;
