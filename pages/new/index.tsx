import { Button, Popover } from "antd";
import NewGameOptions from "../../components/app/main/newGame";
import Attribution from "../../components/app/main/attribution";

export default function New() {
    return (
        <div>
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
                            <NewGameOptions />
                        )}>
                        <Button type="primary" size="large" className="uppercase">New game</Button>
                    </Popover>
                    <Button type="link" size="large" className="uppercase">Join game</Button>
                </div>
            </div>
            <Attribution />
        </div>
    );
}