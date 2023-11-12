import { useMemo } from 'react';
import getColor from '../../../../utils/getColor';
import PlayerAidProps from './PlayerAidProps';
import { TailwindProperty } from '../../../../utils/constants';
import BlocButton from '../../../app/blocButton';

const FactionAid: React.FC<PlayerAidProps> = ({
  playerActions,
  players,
  actualPlayer,
}) => {
  const currentPlayer = useMemo(
    () => players.listOfPlayers.find((player) => player.faction === actualPlayer),
    [players, actualPlayer],
  );

  const shouldRollDice = currentPlayer.diceValues.length === 0;

  return (
    <div
      className={`w-full ${getColor(
        actualPlayer,
        TailwindProperty.LightBackground,
      )} p-6 flex flex-col gap-6 rounded-sm`}
    >
      <div className="leading-none">
        <h2 className="m-0 font-extrabold uppercase text-3xl">
          {actualPlayer}
        </h2>
      </div>
      {shouldRollDice ? (
        <BlocButton
          className="self-start"
          onClick={() => playerActions.rollDice(currentPlayer.playerNumber)}
          primary
          faction={actualPlayer}
        >
          Form 1 Bloc & Roll Action Dice
        </BlocButton>
      ) : (
        false
      )}
      <div className="flex gap-3">
        {currentPlayer.diceValues.map((dice, index) => (
          <div
            key={index}
            className={`w-10 h-10 flex items-center justify-center font-black rounded-md ${getColor(
              actualPlayer,
              TailwindProperty.Background,
            )}`}
          >
            {dice}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FactionAid;
