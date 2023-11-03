import { NextPage } from "next";
import Game from "../../classes/game";
import { loadAllGames, loadGame } from "../../api/api";
import useGame from "../../hooks/useGame";
import { useEffect } from "react";
import useCity from "../../hooks/useCity";
import CityMap from "../../components/game/board/cityMap";
import usePolice from "../../hooks/usePolice";

export async function getStaticPaths() {
    const games = await loadAllGames();
    return {
        paths: games.map((game) => `/game/${game.room}`),
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const loadedGame = await loadGame(params.slug);
    return { props: { loadedGame } };
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