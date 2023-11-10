import { useEffect, useMemo, useState } from 'react';
import Players from '../../../../classes/Players';
import Police from '../../../../classes/Police';
import { PlayerActions } from '../../../../hooks/usePlayers';
import { PoliceActions } from '../../../../hooks/usePolice';
import City from '../../../../classes/City';
import { AvailablePlayers, POLICE } from '../../../../utils/constants';
import PlayerAidMenu from './playerAidMenu';
import PlayerAidProps from './PlayerAidProps';
import PoliceAid from './policeAid';

const PlayerAid: React.FC<{
  players: Players;
  police: Police;
  playerActions: PlayerActions;
  policeActions: PoliceActions;
  city: City;
}> = ({
  players, playerActions, police, policeActions, city,
}) => {
  const [actualPlayer, setActualPlayer] = useState<AvailablePlayers>(POLICE);
  const availablePlayers: AvailablePlayers[] = useMemo(
    () => [POLICE, ...players.listOfPlayers.map((player) => player.faction)],
    [players],
  );

  useEffect(() => {
    if (police.actionTaken) {
      const nextPlayer = players.listOfPlayers.find(
        (player) => player.actionTaken === false,
      )?.faction;
      if (nextPlayer) {
        setActualPlayer(nextPlayer);
      }
    } else {
      setActualPlayer(POLICE);
    }
  }, [police, players]);

  const aidProps: PlayerAidProps = {
    city,
    actualPlayer,
    playerActions,
    policeActions,
    police,
    players,
  };

  const TargetAidComponent = useMemo(() => {
    if (actualPlayer === POLICE) {
      return PoliceAid;
    }
    return false;
  }, [actualPlayer]);

  return (
    <div className="flex flex-col gap-2">
      <PlayerAidMenu
        actualPlayer={actualPlayer}
        availablePlayers={availablePlayers}
      />
      {TargetAidComponent ? <TargetAidComponent {...aidProps} /> : false}
    </div>
  );
};

export default PlayerAid;
