import { POLICE } from '../../../../utils/constants';
import PoliceOpsDeck from '../../police/policeOpsDeck';
import PlayerAidProps from './PlayerAidProps';

const PoliceAid: React.FC<PlayerAidProps> = ({
  city,
  police,
  policeActions,
  players,
  actualPlayer,
}) => (
  <div className="w-full bg-cyan-100 p-6 flex flex-col gap-6">
    <h2 className="m-0 font-extrabold uppercase text-2xl">Police</h2>
    {actualPlayer === POLICE ? (
      <PoliceOpsDeck
        city={city}
        players={players}
        police={police}
        policeActions={policeActions}
      />
    ) : (
      false
    )}
  </div>
);

export default PoliceAid;
