import District from '../../../classes/District';
import Highway from '../../../classes/Highway';

const Roads: React.FC<{ tile: District | Highway }> = ({ tile }) => (tile instanceof Highway ? (
        <>
            <div className="absolute w-full h-full top-0 left-0 rounded-full shadow-[0_0_0_20px_rgb(0,0,0)] translate-x-[calc(-50%_-_10px)] translate-y-[calc(-50%_-_10px)]"></div>
            <div className="absolute w-full h-full top-0 left-0 rounded-full shadow-[0_0_0_20px_rgb(0,0,0)] translate-x-[calc(50%_+_10px)] translate-y-[calc(50%_+_10px)]"></div>
        </>
) : (
        <>
            <div className="w-[20px] h-full absolute bg-black top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%]"></div>
            {tile instanceof District
                && tile.metroStation ? (
                <div className="h-[20px] w-[50%] absolute bg-black top-2/4 left-0 translate-y-[-50%]"></div>
              ) : (
                <div className="h-[20px] w-full absolute bg-black top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%]"></div>
              )}
        </>
));

export default Roads;
