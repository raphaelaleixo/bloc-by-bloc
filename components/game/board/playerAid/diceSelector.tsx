import Player from '../../../../classes/Player';
import { PlayerActions } from '../../../../hooks/usePlayers';
import {
  Faction,
  SelectedDice,
  TailwindProperty,
} from '../../../../utils/constants';
import getColor from '../../../../utils/getColor';
import BlocButton from '../../../app/blocButton';

const DiceSelector: React.FC<{
  currentPlayer: Player;
  setSelectedDice: Function;
  selectedDice: SelectedDice;
  actualPlayer: Faction;
  playerActions: PlayerActions;
}> = ({
  currentPlayer, setSelectedDice, selectedDice, actualPlayer, playerActions,
}) => {
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

  const isDiceUsed = (diceIndex) => currentPlayer.usedDice.includes(diceIndex);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-3">
        {currentPlayer.diceValues.map((dice, index) => (
          <button
            onClick={() => handleDiceClick(dice, index)}
            key={index}
            disabled={isDiceUsed(index)}
            className={`w-10 h-10 flex items-center justify-center font-black rounded-md ${getColor(
              actualPlayer,
              TailwindProperty.Background,
            )} ${selectedDice.diceIndex.includes(index) ? 'outline' : ''}
            disabled:bg-zinc-300 disabled:text-zinc-400`}
          >
            {dice}
          </button>
        ))}
      </div>
      <BlocButton onClick={() => playerActions.skipActions(currentPlayer.playerNumber)} className='self-start' faction={actualPlayer}>
        Skip actions
      </BlocButton>
    </div>
  );
};
export default DiceSelector;
