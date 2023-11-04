import { useEffect, useState } from "react";
import Game from "../classes/game";
import { getGameRef, saveGame } from "../api/api";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { onValue } from "firebase/database";

function useGame(loadedGame?: Game) {
    const [game, setGame] = useState<Game | undefined>();

    useEffect(() => {
        if (!game) {
            const gameRef = getGameRef(loadedGame?.room);
            onValue(gameRef, (snapshot) => {
                const newGameData = JSON.stringify(snapshot.val()?.game);
                const currentGameData = JSON.stringify(instanceToPlain(game));
                if (newGameData && newGameData !== currentGameData) {
                    setGame(plainToInstance(Game, JSON.parse(newGameData)));
                }
            });
        }
    }, [game, loadedGame]);

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