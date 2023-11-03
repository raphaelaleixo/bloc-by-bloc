import { useState } from "react";
import City, { CityBlock } from "../../../classes/city";
import PoliceBlocksMap from "../police/policeBlocksMap";
import PoliceMorale from "../police/policeMorale";
import PoliceOpsDeck from "../police/policeOpsDeck";
import StagingArea from "../police/stagingArea";
import CityTile from "./cityTile";
import usePlayers from "../../../hooks/usePlayers";
import PlayersMap from "../player/playersMap";
import Police from "../../../classes/police";

const CityMap: React.FC<{city: City, police: Police, policeActions: any }> = ({ city, police, policeActions }) => {
    const { players } = usePlayers();
    const [higlightedTiles, setHighlightedTiles] = useState<CityBlock[]>([]);
    
    return players ? (
        <div className="contents">
            <div className="flex flex-col gap-5">
                <PoliceOpsDeck city={city} police={police} players={players} drawPoliceCard={policeActions.drawPoliceCard} />
                <StagingArea policeCount={police?.blockCount} />
                <PoliceMorale police={police} />
            </div>
            <div className="w-[700px] h-[700px] relative">
                <div className="grid grid-cols-5 w-full h-full gap-2 absolute">
                    {city?.cityBlocks.map((line: CityBlock[]) =>
                        line.map((district: CityBlock) => {
                            return (
                                <CityTile city={city} tile={district.tile} key={district.tile.id} higlightedTiles={higlightedTiles} setHighlightedTiles={setHighlightedTiles} />
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