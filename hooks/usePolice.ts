import { useEffect, useState } from "react";
import Police from "../classes/police";
import City from "../classes/city";
import { savePolice } from "../api/api";
import { onValue, ref } from "firebase/database";
import database from "../api/firebase.api";
import { instanceToPlain, plainToInstance } from "class-transformer";
import Player from "../classes/player";

function usePolice(): { police: Police, policeActions: { drawPoliceCard: (city: City, players: Player[]) => void } } {
    const [police, setPolice] = useState<Police | undefined>();

    useEffect(() => {
        // const policeRef = ref(database, 'test/police');
        // onValue(policeRef, (snapshot) => {
        //     const newPoliceData = snapshot.val();
        //     const currentPoliceData = JSON.stringify(instanceToPlain(police));
        //     if (newPoliceData && newPoliceData !== currentPoliceData) {
        //         setPolice(plainToInstance(Police, JSON.parse(newPoliceData)));
        //     } else if (police === undefined) {
        //         setPolice(new Police().initialize());
        //     }
        // });
        setPolice(new Police().initialize());
    }, []);

    const drawPoliceCard = (city: City, players: Player[]) => {
        const newPolice = police.clone();
        newPolice.drawPoliceCard(city, players);
        setPolice(newPolice);
    }

    return {
        police,
        policeActions: {
            drawPoliceCard,
        }
    }
}

export default usePolice;