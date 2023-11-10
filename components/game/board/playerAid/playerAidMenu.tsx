import { Tooltip } from 'antd';
import { FaFire } from 'react-icons/fa6';
import {
  AvailablePlayers,
  POLICE,
  TailwindProperty,
} from '../../../../utils/constants';
import getColor from '../../../../utils/getColor';

const PlayerAidMenu: React.FC<{
  availablePlayers: AvailablePlayers[];
  actualPlayer: AvailablePlayers;
}> = ({ availablePlayers, actualPlayer }) => (
  <div className="flex gap-4 items-end">
    {availablePlayers.map((player) => (
      <div
        className={'py-2 text-zinc-100 text-xs flex flex-col gap-1 items-center leading-none relative font-bold'}
        key={player}
      >
        {actualPlayer === player ? (
          <Tooltip title="Active player">
            <FaFire
              style={{
                filter: 'drop-shadow(-2px 0 0 black) drop-shadow(2px 0 0 black) drop-shadow(0 -2px 0 black) drop-shadow(0 2px 0 black)',
              }}
              className="text-lg text-shadow text-yellow-500 flex items-center justify-center rounded-full -right-2 -top-2" />
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
