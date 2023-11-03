import { NextPage } from "next";
import Game from "../../classes/game";
import { loadGame } from "../../api/api";
import useGame from "../../hooks/useGame";
import { useEffect } from "react";
import useCity from "../../hooks/useCity";
import CityMap from "../../components/game/board/cityMap";
import usePolice from "../../hooks/usePolice";


export async function getServerSideProps({ params }) {
    const loadedGame = await loadGame(params.slug);
    console.log(loadedGame);

    return {
        props: { loadedGame },
    };
}

const GamePage: NextPage<{ loadedGame: Game }> = ({ loadedGame }) => {

    const { game, gameActions } = useGame();
    useEffect(() => {
        if (!game) {
            gameActions.loadSavedGame(loadedGame);
        }
    }, [game, gameActions, loadedGame]);

    const { city } = useCity(loadedGame.room);
    const { police, policeActions } = usePolice(loadedGame.room);

    return (
        <CityMap city={city} police={police} policeActions={policeActions} />
    )
};

export default GamePage;