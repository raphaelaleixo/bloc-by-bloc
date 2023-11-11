import { Tooltip } from 'antd';
import { FaFire } from 'react-icons/fa6';
import { Faction, TailwindProperty } from '../../../../utils/constants';
import getColor from '../../../../utils/getColor';

const PlayerAidMenu: React.FC<{
  availablePlayers: Faction[];
  actualPlayer: Faction;
}> = ({ availablePlayers, actualPlayer }) => (
  <div className="flex gap-4 items-end">
    {availablePlayers.map((player) => (
      <div
        className={`py-2 text-xs flex flex-col gap-1 items-center leading-none relative font-bold ${
          actualPlayer === player
            ? getColor(player, TailwindProperty.Text)
            : 'text-zinc-100'
        }`}
        key={player}
      >
        {actualPlayer === player ? (
          <Tooltip title="Active player">
            <FaFire className="text-lg text-shadow text-yellow-500 flex items-center justify-center rounded-full -right-2 -top-2" />
          </Tooltip>
        ) : (
          false
        )}
        {player}
      </div>
    ))}
  </div>
);

export default PlayerAidMenu;
