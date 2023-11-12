import Player from '../../../../classes/Player';
import {
  Faction,
  SelectedDice,
  TailwindProperty,
} from '../../../../utils/constants';
import getColor from '../../../../utils/getColor';

const DiceSelector: React.FC<{
  currentPlayer: Player;
  setSelectedDice: Function;
  selectedDice: SelectedDice;
  actualPlayer: Faction;
}> = ({
  currentPlayer, setSelectedDice, selectedDice, actualPlayer,
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
  return (
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
  );
};
export default DiceSelector;
