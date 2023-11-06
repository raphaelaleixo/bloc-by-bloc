import { useState } from 'react';
import { plainToInstance } from 'class-transformer';
import Game from '../classes/Game';
import { saveGame } from '../api/api';

export type GameActions = {
  createNewGame(game: Game): void;
  loadSavedGame(localGame: Promise<Game>): void;
};

function useGame(): { game: Game, gameActions: GameActions } {
  const [game, setGame] = useState<Game | undefined>();

  const createNewGame = (newGame: Game) => {
    saveGame(newGame);
    setGame(newGame);
  };

  const loadSavedGame = (localGame: Promise<Game>) => {
    localGame.then((value) => {
      setGame(plainToInstance(Game, value));
    });
  };

  return { game, gameActions: { createNewGame, loadSavedGame } };
}

export default useGame;
