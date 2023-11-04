import { NextPage } from "next";
import { loadGame } from "../../api/api";
import useGame from "../../hooks/useGame";
import useCity from "../../hooks/useCity";
import CityMap from "../../components/game/board/cityMap";
import usePolice from "../../hooks/usePolice";
import { useSearchParams } from "next/navigation";


async function getLoadedGame(roomId: string) {
    const game = await loadGame(roomId)
    return game;
}

const GamePage: NextPage = () => {
    const searchParams = useSearchParams()
    const room = searchParams.get('room');
    const { game, gameActions } = useGame();

    gameActions.loadSavedGame(getLoadedGame(room));

    const { city } = useCity(game);
    const { police, policeActions } = usePolice(game);

    return city && police ? (
        <CityMap city={city} police={police} policeActions={policeActions} />
    ) : false;
};

export default GamePage;