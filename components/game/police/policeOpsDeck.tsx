import Police from '../../../classes/Police';
import City from '../../../classes/City';
import PoliceOpsDeckCard from './policeOpsDeckCard';
import Players from '../../../classes/Players';
import { PoliceActions } from '../../../hooks/usePolice';
import { moraleTrack } from '../../../utils/constants';

const PoliceOpsDeck: React.FC<{
  city: City;
  police: Police;
  players: Players;
  policeActions: PoliceActions;
}> = ({
  city, police, players, policeActions,
}) => {
  const shouldDrawCard = police.currentCard.length < moraleTrack[police.moraleIndex].value;

  return (
    <div className="flex flex-wrap gap-2 items-start">
      {shouldDrawCard ? (
        <button
          onClick={() => {
            policeActions.drawPoliceCard(city, players);
          }}
          className="bg-cyan-300 rounded-sm text-xs uppercase leading-none p-2 font-bold"
        >
          Draw police ops card
        </button>
      ) : (
        <button
          onClick={() => {
            policeActions.finishNightimeStep();
          }}
          className="bg-cyan-300 rounded-sm text-xs uppercase leading-none p-2 font-bold"
        >
          Go to player actions
        </button>
      )}
      <div className="w-[160px] h-[240px]">
        {police.currentCard.map((card) => (
          <PoliceOpsDeckCard key={card.title} policeOpsCard={card} />
        ))}
      </div>
    </div>
  );
};

export default PoliceOpsDeck;
