import { CityBlock } from "../../classes/city";
import PoliceBlocksMap from "../policeBlocks/policeBlocksMap";
import PoliceMorale from "../policeBlocks/policeMorale";
import PoliceOpsDeck from "../policeBlocks/policeOpsDeck";
import StagingArea from "../policeBlocks/stagingArea";
import CityTile from "./cityTile";
import useCity from "../../hooks/useCity";
import usePolice from "../../hooks/usePolice";
import usePlayers from "../../hooks/usePlayers";
import PlayersMap from "../playerBlocks/playersMap";

const CityMap: React.FC = () => {
    const { city } = useCity();
    const { police, policeActions } = usePolice();
    const { players } = usePlayers();
    
    return city && police ? (
        <div className="contents">
            <div className="flex flex-col gap-5">
                <PoliceOpsDeck city={city} police={police} players={players} drawPoliceCard={policeActions.drawPoliceCard} />
                <StagingArea policeCount={police?.policeCount} />
                <PoliceMorale police={police} />
            </div>
            <div className="w-[700px] h-[700px] relative">
                <div className="grid grid-cols-5 w-full h-full gap-2 absolute">
                    {city?.blocks.map((line: CityBlock[]) =>
                        line.map((district: CityBlock) => {
                            return (
                                <CityTile city={city} tile={district.tile} key={district.tile.id} />
                            );
                        })
                    )}
                </div>
                <PlayersMap city={city} players={players} />
                <PoliceBlocksMap city={city} police={police} />
            </div>
        </div>
    ) :  false;
}

export default CityMap;