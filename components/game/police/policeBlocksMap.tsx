import { useMemo } from 'react';
import City, { DistrictCoordinate } from '../../../classes/City';
import Police from '../../../classes/Police';
import { PoliceBlockMap } from '../../../utils/constants';
import Block from '../../../classes/Block';
import PoliceVan from './policeVan';
import BlockPiece from '../board/block';

const getPoliceBlockCoordinate = (
  block: Block,
  city: City,
  paddingAmmountX: number = 20,
  paddingAmmountY: number = 20,
) => {
  const coordinates = city.getDistrictCoordinates();
  const targetCoordinates: DistrictCoordinate = coordinates.find(
    (coordinate) => coordinate.id === block.districtId,
  );
  return {
    x: 140 * targetCoordinates.x + paddingAmmountX,
    y: 140 * targetCoordinates.y + paddingAmmountY,
  };
};

const PoliceBlocksMap: React.FC<{ city: City; police: Police }> = ({
  city,
  police,
}) => {
  const blocksOnDistrict: PoliceBlockMap = useMemo(
    () => police?.getPoliceBlocksByDistrict(),
    [police],
  );

  return (
    <div className="absolute w-full h-full top-0 right-0 pointer-events-none">
      {police?.blocks.map((block) => {
        const { x, y } = getPoliceBlockCoordinate(block, city);
        const numberOfBlocks = blocksOnDistrict[block.districtId].policeBlocks;
        return (
          <BlockPiece
            key={block.id}
            numberOfBlocks={numberOfBlocks}
            x={x}
            y={y}
          />
        );
      })}
      {police?.vans.map((van) => {
        const { x, y } = getPoliceBlockCoordinate(van, city, 10, 40);
        return (
          <div key={van.id} className="absolute" style={{ top: y, left: x }}>
            <PoliceVan />
          </div>
        );
      })}
    </div>
  );
};

export default PoliceBlocksMap;
