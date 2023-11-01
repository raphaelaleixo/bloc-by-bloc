import { useEffect, useState } from "react";
import Player, { OccupationTypes } from "../classes/player";
import { Faction } from "../utils/constants";

function usePlayers() {
    const [players, setPlayers] = useState<Player[] | undefined>();

    useEffect(() => {
        const player1 = new Player(0, Faction.Workers).initialize().createOccupation(OccupationTypes.factionStart, 5).createBlock(9);
        const player2 = new Player(1, Faction.Neighbors).initialize().createOccupation(OccupationTypes.factionStart, 7).createBlock(9);
        const player3 = new Player(2, Faction.Students).initialize().createOccupation(OccupationTypes.factionStart, 6).createBlock(9);
        const player4 = new Player(3, Faction.Prisoners).initialize().createOccupation(OccupationTypes.factionStart, 4).createBlock(9);
        player4.createBlock(9);
        setPlayers([player1, player2, player3, player4]);
    }, []);

    return { players };
}

export default usePlayers;