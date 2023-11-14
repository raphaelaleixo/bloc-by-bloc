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
  playerActions,
}) => {
  const currentPlayer = useMemo(
    () => players.listOfPlayers.find((player) => player.faction === actualPlayer),
    [players, actualPlayer],
  );

  const nextPlayer = useMemo(() => {
    const currentPlayerIndex = players.listOfPlayers.findIndex(
      (player) => player.faction === actualPlayer,
    );
    return players.listOfPlayers[currentPlayerIndex + 1];
  }, [players, actualPlayer]);

  const buttonLabel = useMemo(() => {
    if (isPoliceTurn) {
      return `${actualPlayer} turn`;
    }
    if (nextPlayer) {
      return `${nextPlayer.faction} - Police Moviment`;
    }
    return 'Night Step';
  }, [actualPlayer, isPoliceTurn, nextPlayer]);

  const nextAction: NextAction = useMemo(() => {
    if (isPoliceTurn) {
      return {
        available: police.currentCard.length >= police.cardsToDraw,
        action: () => {
          policeActions.finishNightTimeStep();
        },
      };
    }
    return {
      available:
        currentPlayer?.usedDice.length === currentPlayer?.diceValues.length,
      action: () => {
        playerActions.finishNightTimeStep(currentPlayer.playerNumber);
        policeActions.startNightTimeStep();
      },
    };
  }, [isPoliceTurn, police, policeActions, playerActions, currentPlayer]);

  return (
    <BlocButton
      large
      onClick={() => nextAction.action()}
      disabled={!nextAction.available}
      className="self-start mt-4"
    >
      Next Step: {buttonLabel}
    </BlocButton>
  );
};

export default NextStep;
