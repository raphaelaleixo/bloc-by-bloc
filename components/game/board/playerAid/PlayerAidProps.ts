import Players from '../../../../classes/Players';
import Police from '../../../../classes/Police';
import { PlayerActions } from '../../../../hooks/usePlayers';
import { PoliceActions } from '../../../../hooks/usePolice';
import City from '../../../../classes/City';
import { AvailablePlayers } from '../../../../utils/constants';

type PlayerAidProps = {
  city: City;
  actualPlayer: AvailablePlayers;
  playerActions: PlayerActions;
  policeActions: PoliceActions;
  police: Police;
  players: Players;
};

export default PlayerAidProps;
