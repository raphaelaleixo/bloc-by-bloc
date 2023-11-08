import { Button, Checkbox, Segmented } from 'antd';
import { useState } from 'react';
import Game from '../../../classes/Game';
import { createRoomId } from '../../../utils/randomizers';
import { Faction } from '../../../utils/constants';

const NewGameOptions: React.FC<{ createGame(game: Game): void }> = ({
  createGame,
}) => {
  const [playersInGame, setPlayersInGame] = useState<Faction[]>([]);
  const [difficulty, setDifficulty] = useState<number>(1);
  const roomId = createRoomId();

  return (
    <div className="flex flex-col gap-4 w-80 p-2 pb-4 items-start">
      <div className="flex flex-col gap-2 normal-case w-full">
        <label className="text-white font-medium">Factions in game</label>
        <Checkbox.Group
          className="flex flex-col"
          onChange={(checkedValues) => setPlayersInGame(checkedValues as Faction[])}
          options={[
            Faction.Neighbors,
            Faction.Prisoners,
            Faction.Students,
            Faction.Workers,
          ]}
        />
      </div>
      <div className="flex flex-col gap-2 normal-case w-full">
        <label className="text-white font-medium">Difficulty level</label>
        <Segmented
          block
          options={[
            {
              label: 'Easy',
              value: 1,
            },
            {
              label: 'Medium',
              value: 2,
            },
            {
              label: 'Hard',
              value: 3,
            },
            {
              label: 'Expert',
              value: 4,
            },
          ]}
          value={difficulty}
          onChange={(value) => {
            setDifficulty(value as number);
          }}
        />
      </div>
      <Button
        ghost
        disabled={playersInGame.length < 2}
        type="primary"
        className="uppercase mt-2"
        onClick={() => createGame(new Game(playersInGame, difficulty, roomId))}
      >
        Start
      </Button>
    </div>
  );
};

export default NewGameOptions;
