import { useEffect, useState } from "react";
import { createNewCity } from "../classes/city/createNewCity";
import City from "../classes/city";
import { getGameRef, saveCity } from "../api/api";
import { onValue } from "firebase/database";
import { instanceToPlain, plainToInstance } from "class-transformer";

function useCity(roomId: string) {
    const [city, setCity] = useState<City | undefined>();

    useEffect(() => {
        const gameRef = getGameRef(roomId);
        onValue(gameRef, (snapshot) => {
            const newCityData = snapshot.val()?.city;
            const currentCityData = JSON.stringify(instanceToPlain(city));
            if (newCityData && newCityData !== currentCityData) {
                setCity(plainToInstance(City, JSON.parse(newCityData)));
            } else if (city === undefined) {
                saveCity(createNewCity(), roomId);
            }
        });
    }, [roomId, city]);

    return { city };
}

export default useCity;