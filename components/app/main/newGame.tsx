import { Button, Segmented } from "antd"
import useGame, { GameActions } from "../../../hooks/useGame";
import Game from "../../../classes/game";
import { createRoomId } from "../../../utils/randomizers";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const options = [{
    label: 'Players',
    value: [1, 2, 3, 4]
},
{
    label: 'Difficulty level',
    value: [{
        label: 'Easy',
        value: 1,
    }, {
        label: 'Medium',
        value: 2,
    },
    {
        label: 'Hard',
        value: 3,
    }, {
        label: 'Expert',
        value: 4,
    }]
}
]

const NewGameOptions: React.FC<{ createGame(game: Game): void }> = ({ createGame }) => {
    const [playerNumber, setPlayerNumber] = useState<number>(1);
    const [difficulty, setDifficulty] = useState<number>(1);
    const roomId = createRoomId();

    return (
        <div className="flex flex-col gap-4 w-80 p-2 pb-4 items-start">
            {
                options.map(option => (
                    <div key={option.label} className="flex flex-col gap-2 normal-case w-full">
                        <label className="text-white font-medium">
                            {option.label}
                        </label>
                        <Segmented
                            block options={option.value}
                            value={option.label === 'Players' ? playerNumber : difficulty}
                            onChange={(value) => {
                                option.label === 'Players' ? setPlayerNumber(value as number) : setDifficulty(value as number)
                            }}
                        />
                    </div>
                ))
            }
            <Button
                ghost
                type="primary"
                className="uppercase mt-2"
                onClick={() => createGame(new Game(playerNumber, difficulty, roomId))}
            >
                Start
            </Button>
        </div>
    )
}

export default NewGameOptions;