import Players from '../../../../classes/Players';
import Police from '../../../../classes/Police';
import { PlayerActions } from '../../../../hooks/usePlayers';
import { PoliceActions } from '../../../../hooks/usePolice';
import City from '../../../../classes/City';
import { Faction } from '../../../../utils/constants';

type PlayerAidProps = {
  city: City;
  actualPlayer: Faction;
  playerActions: PlayerActions;
  policeActions: PoliceActions;
  police: Police;
  players: Players;
  isPoliceTurn: boolean;
};

export default PlayerAidProps;
