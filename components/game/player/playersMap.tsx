import City from '../../../classes/City';
import Players from '../../../classes/Players';
import FactionMap from './factionMap';

const PlayersMap: React.FC<{ city: City, players: Players }> = ({ city, players }) => (
        <>
            {
                players.listOfPlayers.map((player) => (
                    <FactionMap player={player} city={city} key={player.playerNumber} />
                ))
            }
        </>
);

export default PlayersMap;
