import District from "../../../classes/district"
import { FaCartShopping } from "react-icons/fa6";
import { GiSmallFire, GiAnarchy } from "react-icons/gi";
import { LootStatus } from "../../../classes/shoppingCenter/constants";

const getColor = (lootStatus: LootStatus) => {
    switch (lootStatus) {
        case (LootStatus.Burned):
            return 'bg-amber-700';
        case (LootStatus.Graffiti):
            return 'bg-rose-700';
        default:
            return 'bg-black';
    }
}

const ShoppingCenters: React.FC<{ tile: District }> = ({ tile }) => {

    const shoppingCenterPositions = ['left-[15%] bottom-[15%]', 'left-[15%] top-[15%]', 'right-[15%] top-[15%]', 'right-[15%] bottom-[15%]'];
    const rotations = [0, 90, 180, 270];

    return tile.shoppingCenters.map((shoppingCenter, index) => {
        const outline = shoppingCenter.lootStatus === LootStatus.None ? '' : 'outline outline-2 outline-black';
        return (
            <div key={shoppingCenter.id}
                className={`absolute w-1/5 h-1/5 rounded-sm ${shoppingCenterPositions[index]} ${getColor(shoppingCenter.lootStatus)} ${outline} flex items-center justify-center`}
                style={{ rotate: `${rotations[index]}deg` }}
            >
                {
                    shoppingCenter.lootStatus === LootStatus.Burned
                        ? (<GiSmallFire size="1.25rem" className="text-yellow-500" />)
                        : shoppingCenter.lootStatus === LootStatus.Graffiti
                            ? (<GiAnarchy size="1.25rem" className="text-zinc-300" />)
                            : (<FaCartShopping size="0.875rem" className="text-zinc-300" />)
                }
            </div>
        )
    })
}

export default ShoppingCenters;