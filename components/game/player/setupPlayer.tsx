import { Button } from 'antd';
import Players from '../../../classes/Players';
import { PlayerActions } from '../../../hooks/usePlayers';
import findFactionDistricts from '../../../utils/findFactionDistricts';

const SetupPlayer: React.FC<{
  players: Players;
  playerActions: PlayerActions;
  setHighlightedTiles: Function;
}> = ({ players, playerActions, setHighlightedTiles }) => (
  <div className="text-white flex flex-col gap-4">
    {players.listOfPlayers.map((player) => {
      const possibleDistricts = findFactionDistricts(player.faction);
      return (
        <div className="bg-zinc-700 p-4 text-center flex flex-col gap-4" key={player.playerNumber}>
          <h2>
            Select <span className="font-bold">{`${player.faction}`}</span>{' '}
            starting district
          </h2>
          <div className="flex gap-2">
            {possibleDistricts.map((district) => (
              <Button
                disabled={player.setupFinished}
                key={district}
                onClick={() => {
                  playerActions.setupPlayer(player.playerNumber, district);
                }}
                onMouseOver={() => setHighlightedTiles([district])}
              >
                {district}
              </Button>
            ))}
          </div>
        </div>
      );
    })}
  </div>
);

export default SetupPlayer;
