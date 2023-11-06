import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { loadGame } from '../../api/api';
import useGame from '../../hooks/useGame';
import useCity from '../../hooks/useCity';
import CityMap from '../../components/game/board/cityMap';
import usePolice from '../../hooks/usePolice';

async function getLoadedGame(roomId: string) {
  const game = await loadGame(roomId);
  return game;
}

const GamePage: NextPage = () => {
  const router = useRouter();
  const room = router.query.slug.toString();
  const { game, gameActions } = useGame();

  const { city } = useCity(game);
  const { police, policeActions } = usePolice(game);

  if (!game) {
    gameActions.loadSavedGame(getLoadedGame(room));
    return (
            <div className="text-white">
                <h1 className="text-4xl font-black uppercase">No game found</h1>
                <p className="text-sm text-zinc-300">{`There is no game with the code "${room?.toUpperCase()}".`}</p>
            </div>
    );
  }

  return city && police ? (
        <CityMap city={city} police={police} policeActions={policeActions} />
  ) : false;
};

export default GamePage;
