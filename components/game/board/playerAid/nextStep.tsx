import { useMemo } from 'react';
import PlayerAidProps from './PlayerAidProps';

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
    <button
      onClick={() => nextAction.action()}
      disabled={!nextAction.available}
      className="text-sm text-zinc-100 uppercase font-medium p-2 px-4 border-2 border-zinc-100 rounded-md self-start disabled:border-zinc-700 disabled:text-zinc-600"
    >
      Next Step: {nextPlayer.toLocaleUpperCase()}
    </button>
  );
};

export default NextStep;
