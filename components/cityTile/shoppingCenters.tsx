import District from "../../classes/district"
import { FaCartShopping } from "react-icons/fa6";

const ShoppingCenters: React.FC<{ tile: District }> = ({ tile }) => {

    const shoppingCenterPositions = ['left-[15%] bottom-[15%]', 'left-[15%] top-[15%]', 'right-[15%] top-[15%]', 'right-[15%] bottom-[15%]'];
    const rotations = [0, 90, 180, 270];

    return tile.shoppingCenters.map((shoppingCenter, index) => (
        <div key={shoppingCenter.id}
            className={`absolute w-1/5 h-1/5 rounded-sm ${shoppingCenterPositions[index]} bg-black flex items-center justify-center`}
            style={{rotate: `${rotations[index]}deg`}}
        >
            <FaCartShopping size="0.875rem" className="text-zinc-300" />
        </div>
    ))
}

export default ShoppingCenters;