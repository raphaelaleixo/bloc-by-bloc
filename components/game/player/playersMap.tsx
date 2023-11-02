
import City from "../../../classes/city";
import Player from "../../../classes/player";
import FactionMap from "./factionMap";



const PlayersMap: React.FC<{ city: City, players: Player[] }> = ({ city, players }) => {
    return (
        <>
            {
                players.map(player => (
                    <FactionMap player={player} city={city} key={player.playerNumber} />
                ))
            }
        </>
    )

}

export default PlayersMap;