import { useEffect, useState } from "react";
import Police from "../classes/police";
import City from "../classes/city";
import { getGameRef, savePolice } from "../api/api";
import { onValue } from "firebase/database";
import { instanceToPlain, plainToInstance } from "class-transformer";
import Player from "../classes/player";

function usePolice(roomId: string): { police: Police, policeActions: { drawPoliceCard: (city: City, players: Player[]) => void } } {
    const [police, setPolice] = useState<Police | undefined>();

    useEffect(() => {
        const gameRef = getGameRef(roomId);
        onValue(gameRef, (snapshot) => {
            const newPoliceData = snapshot.val()?.police;
            const currentPoliceData = JSON.stringify(instanceToPlain(police));
            if (newPoliceData && newPoliceData !== currentPoliceData) {
                setPolice(plainToInstance(Police, JSON.parse(newPoliceData)));
            } else if (police === undefined) {
                savePolice(new Police().initialize(), roomId);
            }
        });
    }, [roomId, police]);

    const drawPoliceCard = (city: City, players: Player[]) => {
        const newPolice = police.clone();
        newPolice.drawPoliceCard(city, players);
        savePolice(newPolice, roomId);
    }

    return {
        police,
        policeActions: {
            drawPoliceCard,
        }
    }
}

export default usePolice;