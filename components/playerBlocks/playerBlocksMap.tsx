
import City, { DistrictCoordinate } from "../../classes/city";
import Player, { Occupation } from "../../classes/player";
import { GiFist } from "react-icons/gi";

const getPlayerItemCoordinate = (occupation: Occupation, city: City, paddingAmmountX: number = 0, paddingAmmountY: number = 0) => {
    const coordinates = city.getDistrictCoordinates();
    const targetCoordinates: DistrictCoordinate = coordinates.find(coordinate => coordinate.id === occupation.districtId);
    return {
        left: targetCoordinates.x,
        top: targetCoordinates.y,
        x: (140 * targetCoordinates.x) + paddingAmmountX,
        y: (140 * targetCoordinates.y) + paddingAmmountY,
    }
}

const PlayerBlocksMap: React.FC<{ city: City, players: Player[] }> = ({ city, players }) => {
    return players[0].occupations.map(occupation => {
        if (occupation.active) {
            const coordinates = getPlayerItemCoordinate(occupation, city);
            const rotation = city.blocks.flat().find(block => block.tile.id === occupation.districtId)?.tile.rotation;
            return (
                <div key={occupation.id} className="w-[133px] h-[133px] absolute"
                    style={{
                        top: coordinates.y + 2 * coordinates.top,
                        left: coordinates.x + 2 * coordinates.left,
                        rotate: `${rotation}deg`
                    }}>
                    <div
                        className="bg-green-500 rounded-full absolute w-1/4 h-1/4 top-[8%] right-[8%] shadow-md border-2 border-green-700 flex items-center justify-center"
                    >
                        <GiFist size="1.5em" />
                    </div>
                </div>
            )
        }
        return false;
    })


}

export default PlayerBlocksMap;