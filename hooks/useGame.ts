import { useState } from "react";
import Game from "../classes/game";
import { loadGame, saveGame } from "../api/api";

function useGame() {
    const [game, setGame] = useState<Game | undefined>();

    const createNewGame = (game: Game) => {
        saveGame(game);
        setGame(game);
    }

    const loadSavedGame = (roomId: string) => {
        setGame(loadGame(roomId));
    }

    return { game, gameActions: { createNewGame, loadSavedGame } };
}

export default useGame;