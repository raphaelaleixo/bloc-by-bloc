import { Button, Segmented } from "antd"
import useGame from "../../../hooks/useGame";
import Game from "../../../classes/game";
import { createRoomId } from "../../../utils/randomizers";

const options = [{ label: 'Players', value: [1, 2, 3, 4] }, { label: 'Difficulty level', value: ["Easy", "Medium", "Hard", "Expert"] }]

const NewGameOptions: React.FC = ({ }) => {
    const { game, gameActions } = useGame();
    const gameData = () => new Game(1, 1, createRoomId());

    return (
        <div className="flex flex-col gap-4 w-80 p-2 pb-4 items-start">
            {
                options.map(option => (
                    <div key={option.label} className="flex flex-col gap-2 normal-case w-full">
                        <label className="text-white font-medium">{option.label}</label>
                        <Segmented block options={option.value} />
                    </div>
                ))
            }
            <Button ghost type="primary" className="uppercase mt-2" onClick={()=> gameActions.createNewGame(gameData())}>Start</Button>
        </div>
    )
}

export default NewGameOptions;