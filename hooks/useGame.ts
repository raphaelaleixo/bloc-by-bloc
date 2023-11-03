import { useState } from "react";
import Game from "../classes/game";
import { saveGame } from "../api/api";
import { plainToInstance } from "class-transformer";

function useGame() {
    const [game, setGame] = useState<Game | undefined>();

    const createNewGame = (game: Game) => {
        saveGame(game);
        setGame(game);
    }

    const loadSavedGame = (localGame: Promise<Game>) => {
        localGame.then((value) => {
            setGame(plainToInstance(Game, value));
        })
    }

    return { game, gameActions: { createNewGame, loadSavedGame } };
}

export default useGame;