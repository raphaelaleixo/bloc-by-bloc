import Players from '../classes/Players';
import { GameStates } from './constants';

const isSetupStep = (players: Players) => players.listOfPlayers
  .every((player) => player.setupFinished) === false;

export default function computeGameStep(players: Players): GameStates {
  if (isSetupStep(players)) {
    return GameStates.Setup;
  }
  return GameStates.Night;
}
