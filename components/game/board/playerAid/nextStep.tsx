import { useMemo } from 'react';
import PlayerAidProps from './PlayerAidProps';
import BlocButton from '../../../app/blocButton';

type NextAction = {
  available: boolean;
  action(): void;
};

const NextStep: React.FC<PlayerAidProps> = ({
  isPoliceTurn,
  actualPlayer,
  police,
  policeActions,
  players,
}) => {
  const nextPlayer = useMemo(() => {
    if (isPoliceTurn) {
      return `${actualPlayer} turn`;
    }
    const currentPlayerIndex = players.listOfPlayers.findIndex(
      (player) => player.faction === actualPlayer,
    );
    const nextPlayerFaction = players.listOfPlayers[currentPlayerIndex + 1]?.faction;
    if (nextPlayerFaction) {
      return `${nextPlayerFaction} - Police Moviment`;
    }
    return 'Night Step';
  }, [actualPlayer, isPoliceTurn, players]);

  const nextAction: NextAction = useMemo(() => {
    if (isPoliceTurn) {
      return {
        available: police.currentCard.length >= police.cardsToDraw,
        action: policeActions.finishNightimeStep,
      };
    }
    return {
      available: false,
      action: () => false,
    };
  }, [isPoliceTurn, police, policeActions]);

  return (
    <BlocButton
      large
      onClick={() => nextAction.action()}
      disabled={!nextAction.available}
      className="self-start mt-4"
    >
      Next Step: {nextPlayer.toLocaleUpperCase()}
    </BlocButton>
  );
};

export default NextStep;
