import { useEffect, useState } from "react";
import Player, { OccupationTypes } from "../classes/player";
import { Faction } from "../utils/constants";

function usePlayers() {
    const [players, setPlayers] = useState<Player[] | undefined>();

    useEffect(() => {
        const newPlayer = new Player(0, Faction.Neighbors).initialize().createOccupation(OccupationTypes.factionStart, 8);
        setPlayers([newPlayer]);
    }, []);

    return { players };
}

export default usePlayers;