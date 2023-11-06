import City from '../../../classes/City';
import Player from '../../../classes/Player';
import FactionMap from './factionMap';

const PlayersMap: React.FC<{ city: City, players: Player[] }> = ({ city, players }) => (
        <>
            {
                players.map((player) => (
                    <FactionMap player={player} city={city} key={player.playerNumber} />
                ))
            }
        </>
);

export default PlayersMap;
