import { useEffect, useState } from "react";
import Player, { OccupationTypes } from "../classes/player";
import { Faction } from "../utils/constants";

function usePlayers() {
    const [players, setPlayers] = useState<Player[] | undefined>();

    useEffect(() => {
        const newPlayer = new Player(0, Faction.Workers).initialize().createOccupation(OccupationTypes.factionStart, 5);
        setPlayers([newPlayer]);
    }, []);

    return { players };
}

export default usePlayers;