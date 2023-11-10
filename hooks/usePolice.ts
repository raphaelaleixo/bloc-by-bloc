import { useEffect, useState } from 'react';
import { onValue } from 'firebase/database';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import Police from '../classes/Police';
import City from '../classes/City';
import { getGameRef, savePolice } from '../api/api';
import PoliceOpsDeck from '../classes/PoliceOpsDeck';
import Game from '../classes/Game';
import Players from '../classes/Players';

export type PoliceActions = {
  drawPoliceCard: (city: City, players: Players) => void;
  finishNightimeStep: () => void;
};

function usePolice(game: Game): {
  police: Police;
  policeActions: PoliceActions;
} {
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
  }, [game?.room]);

  const drawPoliceCard = (city: City, players: Players) => {
    const newPolice = police.clone();
    newPolice.drawPoliceCard(policeOpsDeck, city, players);
    savePolice(newPolice, game.room);
  };

  const finishNightimeStep = () => {
    const newPolice = police.clone();
    newPolice.finishNightimeStep();
    savePolice(newPolice, game.room);
  };

  return {
    police,
    policeActions: {
      drawPoliceCard,
      finishNightimeStep,
    },
  };
}

export default usePolice;
