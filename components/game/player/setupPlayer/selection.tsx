import { Radio } from 'antd';
import getColor from '../../../../utils/getColor';
import {
  DistrictConfiguration,
  TailwindProperty,
} from '../../../../utils/constants';
import { PlayerActions } from '../../../../hooks/usePlayers';
import Player from '../../../../classes/Player';
import BlocButton from '../../../app/blocButton';

const Selection: React.FC<{
  currentPlayerSelection: {
    selectedPlayer: Player;
    possibleDistricts: DistrictConfiguration[];
    isLast: boolean;
  };
  setSelectedDistrict: Function;
  setHighlightedTiles: Function;
  selectedDistrict: number;
  playerActions: PlayerActions;
}> = ({
  currentPlayerSelection,
  setSelectedDistrict,
  setHighlightedTiles,
  selectedDistrict,
  playerActions,
}) => (
  <div className="flex flex-wrap">
    <div
      key={currentPlayerSelection.selectedPlayer.playerNumber}
      className="flex flex-col items-start gap-2 min-w-[200px] mr-4 mb-8"
    >
      <div
        className={`${getColor(
          currentPlayerSelection.selectedPlayer.faction,
          TailwindProperty.Text,
        )} font-extrabold text-xs`}
      >
        {currentPlayerSelection.selectedPlayer.faction}
      </div>
      <Radio.Group
        className="flex flex-col gap-2"
        onChange={(e) => {
          const district = e.target.value;
          setSelectedDistrict(district);
          setHighlightedTiles([district]);
        }}
      >
        {currentPlayerSelection.possibleDistricts.map((district) => (
          <Radio
            className="text-stone-900 text-sm leading-none"
            key={district.id}
            value={district.id}
          >
            {district.title}
          </Radio>
        ))}
      </Radio.Group>
      <BlocButton
        primary
        className='my-4'
        faction={currentPlayerSelection.selectedPlayer.faction}
        disabled={selectedDistrict === undefined}
        onClick={() => {
          playerActions.setupPlayer(
            currentPlayerSelection.selectedPlayer.playerNumber,
            selectedDistrict,
          );
        }}
      >
        {
            currentPlayerSelection.isLast ? 'Start game' : 'Select'
        }
      </BlocButton>
    </div>
  </div>
);

export default Selection;
