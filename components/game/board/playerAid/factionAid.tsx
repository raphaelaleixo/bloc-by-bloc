import { useMemo, useState } from 'react';
import getColor from '../../../../utils/getColor';
import PlayerAidProps from './PlayerAidProps';
import { TailwindProperty } from '../../../../utils/constants';
import BlocButton from '../../../app/blocButton';

type SelectedDice = {
  totalValue: number;
  diceIndex: number[];
};

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

  const handleDiceClick = (value: number, index: number) => {
    const newDice = { ...selectedDice };
    if (newDice.diceIndex.includes(index)) {
      let newValue = 0;
      newDice.diceIndex = newDice.diceIndex.filter((die) => die !== index);
      newDice.diceIndex.forEach((i) => {
        newValue += currentPlayer.diceValues[i];
      });
      newDice.totalValue = newValue;
    } else {
      newDice.diceIndex.push(index);
      newDice.totalValue += value;
    }
    setSelectedDice(newDice);
  };

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
      <div className="flex gap-3">
        {currentPlayer.diceValues.map((dice, index) => (
          <div
            onClick={() => handleDiceClick(dice, index)}
            key={index}
            className={`w-10 h-10 flex items-center justify-center font-black rounded-md ${getColor(
              actualPlayer,
              TailwindProperty.Background,
            )} ${selectedDice.diceIndex.includes(index) ? 'outline' : ''}`}
          >
            {dice}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FactionAid;
