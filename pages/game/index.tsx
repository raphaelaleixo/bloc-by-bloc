import { NextPage } from 'next';
import { useSearchParams } from 'next/navigation';
import { loadGame } from '../../api/api';
import useGame from '../../hooks/useGame';
import useCity from '../../hooks/useCity';
import GameBoard from '../../components/game/board/gameBoard';
import usePolice from '../../hooks/usePolice';
import usePlayers from '../../hooks/usePlayers';

async function getLoadedGame(roomId: string) {
  const game = await loadGame(roomId);
  return game;
}

const GamePage: NextPage = () => {
  const searchParams = useSearchParams();
  const room = searchParams.get('room');
  const { game, gameActions } = useGame();

  const { city } = useCity(game);
  const { police, policeActions } = usePolice(game);
  const { players, playerActions } = usePlayers(game);

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
    <GameBoard
      city={city}
      police={police}
      policeActions={policeActions}
      players={players}
      playerActions={playerActions}
    />
  ) : (
    <div></div>
  );
};

export default GamePage;
