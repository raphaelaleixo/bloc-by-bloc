import { useEffect, useState } from 'react';
import { onValue } from 'firebase/database';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import createNewCity from '../utils/createNewCity';
import City from '../classes/City';
import { getGameRef, saveCity } from '../api/api';
import Game from '../classes/Game';

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
  }, [game?.room]);

  return { city };
}

export default useCity;
