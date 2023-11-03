import { FaCreativeCommons } from "react-icons/fa6"
import Ludoratory from "../../ludoratory"

const Attribution: React.FC = () => {
    return (
        <div className="my-8 text-xs text-white max-w-prose">
            <div className="my-2 flex gap-2">
                <FaCreativeCommons className="text-xl" />
                <Ludoratory />
            </div>
            <p>Bloc by Bloc: Uprising is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
                It is attributed to Out of Order Games, and the orginal version can be found <a className="text-cyan-500 font-bold hover:underline" href="https://outlandishgames.com/blocbybloc/">here</a>.</p>
        </div>
    )
}

export default Attribution;