import { useEffect, useState } from "react";
import { createNewCity } from "../classes/city/createNewCity";
import City from "../classes/city";
import { saveCity } from "../api/api";
import database from "../api/firebase.api";
import { onValue, ref } from "firebase/database";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { LootStatus } from "../classes/shoppingCenter/constants";

function useCity() {
    const [city, setCity] = useState<City | undefined>();

    useEffect(() => {
        // const cityRef = ref(database, 'test/city');
        // onValue(cityRef, (snapshot) => {
        //     const newCityData = snapshot.val();
        //     const currentPoliceData = JSON.stringify(instanceToPlain(city));
        //     if (newCityData && newCityData !== currentPoliceData) {
        //         setCity(plainToInstance(City, JSON.parse(newCityData)));
        //     } else if (city === undefined) {
        //         setCity(createNewCity());
        //     }
        // });
        const newCity = createNewCity();
        newCity.lootAction(5, LootStatus.Burned);
        newCity.lootAction(20, LootStatus.Graffiti);
        setCity(newCity);
    }, [])

    return { city };
}

export default useCity;