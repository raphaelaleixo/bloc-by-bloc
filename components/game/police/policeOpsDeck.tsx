import Police from '../../../classes/Police';
import City from '../../../classes/City';
import PoliceOpsDeckCard from './policeOpsDeckCard';
import Player from '../../../classes/Player';

const PoliceOpsDeck: React.FC<{
  city: City, police: Police, players: Player[], drawPoliceCard: Function
}> = ({
  city, police, players, drawPoliceCard,
}) => (
    <>
      <div className="h-[240px]">
        <PoliceOpsDeckCard policeOpsCard={police.currentCard} />
      </div>
      <button
        onClick={() => {
          drawPoliceCard(city, players);
        }}
        className="bg-cyan-300 rounded-sm text-xs uppercase leading-none p-2 font-bold"
      >
        Draw police ops card
      </button>
    </>
);

export default PoliceOpsDeck;
