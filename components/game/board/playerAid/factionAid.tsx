import { useMemo, useState } from 'react';
import getColor from '../../../../utils/getColor';
import PlayerAidProps from './PlayerAidProps';
import { TailwindProperty, SelectedDice } from '../../../../utils/constants';
import BlocButton from '../../../app/blocButton';
import DiceSelector from './diceSelector';

const FactionAid: React.FC<PlayerAidProps> = ({
  playerActions,
  players,
  actualPlayer,
}) => {
  const [selectedDice, setSelectedDice] = useState<SelectedDice>({
    totalValue: 0,
    diceIndex: [],
  });
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
        { selectedDice.totalValue }
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
      <DiceSelector
        currentPlayer={currentPlayer}
        setSelectedDice={setSelectedDice}
        selectedDice={selectedDice}
        actualPlayer={actualPlayer}
      />
    </div>
  );
};

export default FactionAid;
