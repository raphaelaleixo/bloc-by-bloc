import { useEffect, useState } from "react";
import Police from "../classes/police";
import City from "../classes/city";
import { savePolice } from "../classes/api/savePolice";
import { onValue, ref } from "firebase/database";
import database from "../classes/api/firebase.api";
import { instanceToPlain, plainToInstance } from "class-transformer";

function usePolice() : { police: Police, policeActions: { drawPoliceCard: (city: City) => void }} {
    const [police, setPolice] = useState<Police | undefined>();

    useEffect(() => {
        setPolice(new Police().initialize());
    }, []);

    
    // TODO: Add DB rules
    // const policeRef = ref(database, 'test/police');
    // onValue(policeRef, (snapshot) => {
    //     const newPoliceData = snapshot.val();
    //     const currentPoliceData = JSON.stringify(instanceToPlain(police));
    //     if (newPoliceData && newPoliceData !== currentPoliceData) {
    //         setPolice(plainToInstance(Police, JSON.parse(newPoliceData)));
    //     }
    // });

    const drawPoliceCard = (city: City) => {
        const newPolice = police.clone();
        newPolice.drawPoliceCard(city);
        // savePolice(newPolice);
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