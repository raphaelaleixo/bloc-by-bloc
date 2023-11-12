import Police from '../../../classes/Police';
import City from '../../../classes/City';
import PoliceOpsDeckCard from './policeOpsDeckCard';
import Players from '../../../classes/Players';
import { PoliceActions } from '../../../hooks/usePolice';
import { getRandomIntInclusive } from '../../../utils/randomizers';
import BlocButton from '../../app/blocButton';

const policeOpsInfo = (
  <div className="text-xs flex flex-col px-2 gap-3">
    <p>
      <b>2 or more squads</b> in the same district are a group
    </p>
    <p>
      <b>Groups of squads</b> follow orders to advance into adjacent districts &
      leave 1 solo squad behind
    </p>
    <p>
      <b>Solo squads</b> hold their position
    </p>
    <p>
      <b>Squads in districts with occupations</b> hold their position
    </p>
  </div>
);

const PoliceOpsDeck: React.FC<{
  city: City;
  police: Police;
  players: Players;
  policeActions: PoliceActions;
}> = ({
  city, police, players, policeActions,
}) => {
  const shouldDrawCard = police.currentCard.length < police.cardsToDraw;

  return (
    <div className="flex flex-wrap gap-4 items-start relative">
      <div className="min-w-[160px] h-[240px] border-2 border-dashed border-cyan-500 rounded-md p-4 flex items-center" />
      <div className="flex flex-col gap-4 items-start max-w-[240px]">
        <BlocButton
          isPolice
          primary
          disabled={!shouldDrawCard}
          onClick={() => {
            policeActions.drawPoliceCard(city, players);
          }}
          className=""
        >
          Draw police ops card
        </BlocButton>
        { policeOpsInfo }
      </div>
      {police.currentCard.map((card) => (
        <div
          key={card.title}
          className="absolute top-0 left-0"
          style={{
            rotate: `${getRandomIntInclusive(5)}deg`,
          }}
        >
          <PoliceOpsDeckCard policeOpsCard={card} />
        </div>
      ))}
    </div>
  );
};

export default PoliceOpsDeck;
