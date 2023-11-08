import { FaHandFist } from 'react-icons/fa6';
import City, { DistrictCoordinate } from '../../../classes/City';
import Player from '../../../classes/Player';
import Occupation from '../../../classes/Occupation';
import { TailwindProperty } from '../../../utils/constants';
import Block from '../../../classes/Block';
import getColor from '../../../utils/getColor';
import BlockPiece from '../board/block';
import { getObjectsInDistrict } from '../../../utils/getObjectsInDistricts';

const getPlayerItemCoordinate = (
  item: Occupation | Block,
  city: City,
  paddingAmmountX: number = 0,
  paddingAmmountY: number = 0,
) => {
  const coordinates = city.getDistrictCoordinates();
  const targetCoordinates: DistrictCoordinate = coordinates.find(
    (coordinate) => coordinate.id === item.districtId,
  );
  return {
    left: targetCoordinates.x,
    top: targetCoordinates.y,
    x: 140 * targetCoordinates.x + paddingAmmountX,
    y: 140 * targetCoordinates.y + paddingAmmountY,
  };
};

const coordinateAdjustments = [
  { x: 0, y: 0 },
  { x: 30, y: 0 },
  { x: 0, y: 30 },
  { x: 30, y: 30 },
];

const FactionMap: React.FC<{ city: City; player: Player }> = ({
  city,
  player,
}) => {
  const color = getColor(player.faction, TailwindProperty.Background);
  return (
    <>
      {player.occupations.map((occupation) => {
        if (occupation.active) {
          const coordinates = getPlayerItemCoordinate(occupation, city);
          const rotation = city.cityBlocks
            .flat()
            .find((block) => block.tile.id === occupation.districtId)
            ?.tile.rotation;
          return (
            <div
              key={occupation.id}
              className="w-[133px] h-[133px] absolute pointer-events-none"
              style={{
                top: coordinates.y + 2 * coordinates.top,
                left: coordinates.x + 2 * coordinates.left,
                rotate: `${rotation}deg`,
              }}
            >
              <div
                className={`${color} rounded-full absolute w-1/4 h-1/4 top-[8%] right-[8%] shadow-md border-2 border-black flex items-center justify-center`}
              >
                <FaHandFist size="1.2em" />
              </div>
            </div>
          );
        }
        return false;
      })}
      {player.blocks.map((block) => {
        const { x, y } = getPlayerItemCoordinate(block, city, 70, 70);
        const numberOfBlocks = getObjectsInDistrict(block.districtId, {
          player,
        }).blocks.length;
        return (
          <BlockPiece
            key={block.id}
            faction={player.faction}
            numberOfBlocks={numberOfBlocks}
            x={x + coordinateAdjustments[player.playerNumber].x}
            y={y + coordinateAdjustments[player.playerNumber].y}
          />
        );
      })}
    </>
  );
};

export default FactionMap;
