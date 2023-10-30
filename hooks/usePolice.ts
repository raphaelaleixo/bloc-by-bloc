import { useEffect, useState } from "react";
import Police from "../classes/police";
import City from "../classes/city";
import { savePolice } from "../classes/api/api";
import { onValue, ref } from "firebase/database";
import database from "../classes/api/firebase.api";
import { instanceToPlain, plainToInstance } from "class-transformer";

function usePolice(): { police: Police, policeActions: { drawPoliceCard: (city: City) => void } } {
    const [police, setPolice] = useState<Police | undefined>();

    useEffect(() => {
        const policeRef = ref(database, 'test/police');
        onValue(policeRef, (snapshot) => {
            const newPoliceData = snapshot.val();
            const currentPoliceData = JSON.stringify(instanceToPlain(police));
            if (newPoliceData && newPoliceData !== currentPoliceData) {
                setPolice(plainToInstance(Police, JSON.parse(newPoliceData)));
            } else if (police === undefined) {
                setPolice(new Police().initialize());
            }
        });
    }, [police]);

    const drawPoliceCard = (city: City) => {
        const newPolice = police.clone();
        newPolice.drawPoliceCard(city);
        savePolice(newPolice);
    }

    return {
        police,
        policeActions: {
            drawPoliceCard,
        }
    }
}

export default usePolice;