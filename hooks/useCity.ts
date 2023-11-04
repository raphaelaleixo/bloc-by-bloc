import { useEffect, useState } from "react";
import { createNewCity } from "../classes/city/createNewCity";
import City from "../classes/city";
import { getGameRef, saveCity } from "../api/api";
import { onValue } from "firebase/database";
import { instanceToPlain, plainToInstance } from "class-transformer";
import Game from "../classes/game";

function useCity(game: Game) {
    const [city, setCity] = useState<City | undefined>();

    useEffect(() => {
        if (game?.room) {
            const gameRef = getGameRef(game.room);
            onValue(gameRef, (snapshot) => {
                const newCityData = snapshot.val()?.city;
                const currentCityData = JSON.stringify(instanceToPlain(city));
                if (newCityData && newCityData !== currentCityData) {
                    setCity(plainToInstance(City, JSON.parse(newCityData)));
                } else if (city === undefined) {
                    saveCity(createNewCity(), game.room);
                }
            });
        }
    }, [game?.room, city]);

    return { city };
}

export default useCity;