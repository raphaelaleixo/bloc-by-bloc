import { useMemo, useState } from 'react';
import { FaCheck } from 'react-icons/fa6';
import SetupHeader from './header';
import Players from '../../../../classes/Players';
import { PlayerActions } from '../../../../hooks/usePlayers';
import findFactionDistricts from '../../../../utils/findFactionDistricts';
import Selection from './selection';
import {
  DistrictConfiguration,
  TailwindProperty,
} from '../../../../utils/constants';
import getColor from '../../../../utils/getColor';

const SetupPlayer: React.FC<{
  players: Players;
  playerActions: PlayerActions;
  setHighlightedTiles: Function;
}> = ({
  players, playerActions, setHighlightedTiles,
}) => {
  const [selectedDistrict, setSelectedDistrict] = useState<
  number | undefined
  >();

  const allSelections = useMemo(() => {
    let selections: DistrictConfiguration[] = [];
    players.listOfPlayers.forEach((player) => {
      const occupations = player.occupations.filter(
        (occupation) => occupation.active,
      );
      const possibleDistricts = findFactionDistricts(player.faction);
      selections = [
        ...selections,
        ...possibleDistricts.filter((district) => occupations.some(
          (occupation) => occupation.districtId === district.id,
        )),
      ];
    });
    return selections;
  }, [players]);

  const currentPlayerSelection = useMemo(() => {
    const selectedPlayer = players.listOfPlayers.find(
      (player) => player.setupFinished === false,
    );
    const selectedIndex = players.listOfPlayers.indexOf(selectedPlayer);
    const possibleDistricts = selectedPlayer
      ? findFactionDistricts(selectedPlayer.faction)
      : [];
    const isLast = selectedIndex === players.listOfPlayers.length - 1;
    return {
      selectedPlayer,
      selectedIndex,
      possibleDistricts,
      isLast,
    };
  }, [players]);

  return (
    <div className="w-full bg-stone-200 text-stone-900 p-6 flex flex-col gap-6 max-h-[700px] overflow-y-auto">
      <SetupHeader />
      <div className="flex flex-col gap-1">
        {allSelections.map((selection) => (
          <div key={selection.id} className="flex gap-2 text-sm items-center">
            <FaCheck
              className={`${getColor(
                selection.districtType,
                TailwindProperty.Text,
              )}`}
            />
            {selection.title}
          </div>
        ))}
      </div>
      {currentPlayerSelection.selectedPlayer ? (
        <Selection
          playerActions={playerActions}
          selectedDistrict={selectedDistrict}
          setHighlightedTiles={setHighlightedTiles}
          setSelectedDistrict={setSelectedDistrict}
          currentPlayerSelection={currentPlayerSelection}
        />
      ) : (
        false
      )}
    </div>
  );
};

export default SetupPlayer;
