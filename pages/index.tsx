import { Button, Popover, Spin } from "antd";
import NewGameOptions from "../components/app/main/newGame";
import Attribution from "../components/app/main/attribution";
import useGame from "../hooks/useGame";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Game from "../classes/game";

export default function Homepage(): JSX.Element {
    const { game, gameActions } = useGame();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const createGame = async (game: Game) => {
        setIsLoading(true);
        gameActions.createNewGame(game);
    }

    if (game?.room) {
        router.push(`/game?room=${game.room}`)
    }

    return (
        <Spin spinning={isLoading}>
            <div className="text-white uppercase flex flex-col">
                <h1 className="flex items-center font-black leading-none">
                    <span className="text-5xl">Bloc</span>
                    <span className="text-zinc-300 font-[cursive] lowercase">&nbsp;by&nbsp;</span>
                    <span className="text-5xl">Bloc</span>
                </h1>
                <div className="font-saira_stencil text-xl leading-none tracking-[0.5em]">Uprising</div>
                <p className="my-4 normal-case text-sm">A web-version of Greg Loring-Albright&apos;s and T.L. Simons&apos;s insurrection game.</p>
                <div className="flex gap-4">
                    <Popover
                        trigger="click"
                        getPopupContainer={(triggerNode: HTMLElement) => triggerNode.parentElement}
                        content={(
                            <NewGameOptions createGame={createGame} />
                        )}>
                        <Button type="primary" size="large" className="uppercase">New game</Button>
                    </Popover>
                    <Button type="link" size="large" className="uppercase">Join game</Button>
                </div>
            </div>
            <Attribution />
        </Spin>
    );
}