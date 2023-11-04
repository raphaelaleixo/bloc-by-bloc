import { useEffect, useState } from "react";
import Police from "../classes/police";
import City from "../classes/city";
import { getGameRef, savePolice } from "../api/api";
import { onValue } from "firebase/database";
import { instanceToPlain, plainToInstance } from "class-transformer";
import Player from "../classes/player";
import PoliceOpsDeck from "../classes/police/policeOpsDeck";
import Game from "../classes/game";

function usePolice(game: Game): { police: Police, policeActions: { drawPoliceCard: (city: City, players: Player[]) => void } } {
    const [police, setPolice] = useState<Police | undefined>();
    const policeOpsDeck = new PoliceOpsDeck();

    useEffect(() => {
        if (game?.room) {
            const gameRef = getGameRef(game.room);
            onValue(gameRef, (snapshot) => {
                const newPoliceData = snapshot.val()?.police;
                const currentPoliceData = JSON.stringify(instanceToPlain(police));
                if (newPoliceData && newPoliceData !== currentPoliceData) {
                    setPolice(plainToInstance(Police, JSON.parse(newPoliceData)));
                } else if (police === undefined) {
                    savePolice(new Police().initialize(), game.room);
                }
            });
        }
    }, [game?.room, police]);

    const drawPoliceCard = (city: City, players: Player[]) => {
        const newPolice = police.clone();
        newPolice.drawPoliceCard(policeOpsDeck, city, players);
        savePolice(newPolice, game.room);
    }

    return {
        police,
        policeActions: {
            drawPoliceCard,
        }
    }
}

export default usePolice;