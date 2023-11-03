import { NextPage } from "next";
import Game from "../../classes/game";
import { loadGame } from "../../api/api";
import useGame from "../../hooks/useGame";
import { useEffect } from "react";
import useCity from "../../hooks/useCity";
import CityMap from "../../components/game/board/cityMap";
import usePolice from "../../hooks/usePolice";
import { useSearchParams } from "next/navigation";


async function getLoadedGame(roomId: string) {
    const game = await loadGame(roomId)
    return game;
}

const GamePage: NextPage<> = () => {
    const searchParams = useSearchParams()
    const room = searchParams.get('room');
    const { gameActions } = useGame();

    useEffect(() => {
        if (room) {
            gameActions.loadSavedGame(getLoadedGame(room))
        }
    }, [room, gameActions]);

    const { city } = useCity(room);
    const { police, policeActions } = usePolice(room);

    return city && police ? (
        <CityMap city={city} police={police} policeActions={policeActions} />
    ) : false;
};

export default GamePage;