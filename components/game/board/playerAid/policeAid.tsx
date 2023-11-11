import PoliceOpsDeck from '../../police/policeOpsDeck';
import PlayerAidProps from './PlayerAidProps';

const PoliceAid: React.FC<PlayerAidProps> = ({
  city,
  police,
  policeActions,
  players,
  actualPlayer,
}) => {
  const { cardsToDraw } = police;
  return (
    <div className="w-full bg-cyan-100 p-6 flex flex-col gap-6 rounded-sm">
      <div className="leading-none">
        <p className="uppercase font-bold text-xs -mb-1">{`${actualPlayer} turn`}</p>
        <h2 className="m-0 font-extrabold uppercase text-2xl">
          Police Squad Moviment
        </h2>
        <h3 className="uppercase font-medium text-xs -mt-1">{`Drawing ${cardsToDraw} ${
          cardsToDraw === 1 ? 'card' : 'cards'
        }`}</h3>
      </div>
      <PoliceOpsDeck
        city={city}
        players={players}
        police={police}
        policeActions={policeActions}
      />
    </div>
  );
};

export default PoliceAid;
