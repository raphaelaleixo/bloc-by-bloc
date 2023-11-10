import { Tag } from 'antd';
import { FaCheck } from 'react-icons/fa6';
import Players from '../../../classes/Players';
import { PlayerActions } from '../../../hooks/usePlayers';
import findFactionDistricts from '../../../utils/findFactionDistricts';
import getColor from '../../../utils/getColor';
import { OccupationTypes, TailwindProperty } from '../../../utils/constants';

const SetupPlayer: React.FC<{
  players: Players;
  playerActions: PlayerActions;
  setHighlightedTiles: Function;
}> = ({ players, playerActions, setHighlightedTiles }) => (
  <div className="w-full bg-stone-200 text-stone-900 p-6 flex flex-col gap-6 max-h-[700px] overflow-y-auto">
    <div className="leading-none">
      <h2 className="m-0 font-extrabold uppercase text-2xl">Setup</h2>
      <p className="font-medium">Select starting districts</p>
      <p className="max-w-prose leading-snug my-2 text-xs">
        Each faction chooses one of its own district tiles as its starting
        district by placing its Faction Start occupation token in that
        district’s occupation circle. Each faction then places their starting
        blocs in the starting district. If a faction’s starting district is
        adjacent to any police vans, place 3 barricades between that district
        and each adjacent district with a van.
      </p>
    </div>
    <div className="flex flex-wrap">
      {players.listOfPlayers.map((player) => {
        const possibleDistricts = findFactionDistricts(player.faction);
        return (
          <div
            key={player.playerNumber}
            className="flex flex-col items-start gap-2 min-w-[200px] mr-4 mb-8"
          >
            <Tag
              bordered={false}
              className={`${getColor(
                player.faction,
                TailwindProperty.Background,
              )} font-extrabold`}
            >
              {player.faction}
            </Tag>
            {possibleDistricts.map((district) => {
              const occupationDistrict = player.occupations.find(
                (occupation) => occupation.active
                  && occupation.type === OccupationTypes.factionStart,
              );
              return (
                <button
                  className={`text-left ml-4 p-0 flex gap-2 items-center text-sm font-medium hover:opacity-80 ${
                    occupationDistrict?.districtId !== district.id
                      ? 'disabled:text-stone-500 disabled:pointer-events-none '
                      : ''
                  }`}
                  style={{
                    textDecoration:
                      player.setupFinished
                      && occupationDistrict?.districtId !== district.id
                        ? 'line-through'
                        : 'none',
                  }}
                  disabled={player.setupFinished}
                  key={district.id}
                  onClick={() => {
                    playerActions.setupPlayer(player.playerNumber, district.id);
                  }}
                  onMouseOver={() => setHighlightedTiles([district.id])}
                  onMouseOut={() => setHighlightedTiles([])}
                >
                  {occupationDistrict?.districtId === district.id ? (
                    <FaCheck
                      className={getColor(
                        player.faction,
                        TailwindProperty.Text,
                      )}
                    />
                  ) : (
                    false
                  )}
                  {district.title}
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  </div>
);

export default SetupPlayer;
