import { useEffect, useMemo, useState } from 'react';
import Players from '../../../../classes/Players';
import Police from '../../../../classes/Police';
import { PlayerActions } from '../../../../hooks/usePlayers';
import { PoliceActions } from '../../../../hooks/usePolice';
import City from '../../../../classes/City';
import PlayerAidMenu from './playerAidMenu';
import PlayerAidProps from './PlayerAidProps';
import PoliceAid from './policeAid';
import { Faction } from '../../../../utils/constants';
import NextStep from './nextStep';

const PlayerAid: React.FC<{
  players: Players;
  police: Police;
  playerActions: PlayerActions;
  policeActions: PoliceActions;
  city: City;
}> = ({
  players, playerActions, police, policeActions, city,
}) => {
  const [actualPlayer, setActualPlayer] = useState<Faction | undefined>();
  const [isPoliceTurn, setPoliceTurn] = useState<boolean>(true);

  const availablePlayers: Faction[] = useMemo(
    () => players.listOfPlayers.map((player) => player.faction),
    [players],
  );

  useEffect(() => {
    const nextPlayer = players.listOfPlayers.find(
      (player) => player.actionTaken === false,
    )?.faction;
    if (nextPlayer) {
      setActualPlayer(nextPlayer);
    }
    setPoliceTurn(!police.actionTaken);
  }, [police, players]);

  const aidProps: PlayerAidProps = {
    city,
    actualPlayer,
    playerActions,
    policeActions,
    police,
    players,
    isPoliceTurn,
  };

  const TargetAidComponent = useMemo(() => {
    if (isPoliceTurn) {
      return PoliceAid;
    }
    return false;
  }, [isPoliceTurn]);

  return (
    <div className="flex flex-col gap-2">
      <PlayerAidMenu
        actualPlayer={actualPlayer}
        availablePlayers={availablePlayers}
      />
      {TargetAidComponent ? <TargetAidComponent {...aidProps} /> : false}
      <NextStep {...aidProps} />
    </div>
  );
};

export default PlayerAid;
