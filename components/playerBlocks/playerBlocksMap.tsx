
import City, { DistrictCoordinate } from "../../classes/city";
import Player, { Occupation } from "../../classes/player";
import { FaHandFist } from "react-icons/fa6";
import { getColor } from "../../utils/getColor";
import { TailwindProperty } from "../../utils/constants";

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
    const color = getColor(players[0].faction, TailwindProperty.Background);
    
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
                        className={`${color} rounded-full absolute w-1/4 h-1/4 top-[8%] right-[8%] shadow-md border-2 border-black flex items-center justify-center`}
                    >
                        <FaHandFist size="1.2em" />
                    </div>
                </div>
            )
        }
        return false;
    })


}

export default PlayerBlocksMap;