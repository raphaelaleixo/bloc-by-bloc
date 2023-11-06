import City, { DistrictCoordinate } from '../classes/City';
import CityBlock from '../classes/CityBlock';
import District from '../classes/District';
import Highway from '../classes/Highway';
import { Directions } from './constants';

const getAllPossibleConnections = (
  originBlock: District | Highway,
  originCoordinates: DistrictCoordinate,
  originDirection?: Directions,
) => {
  const connections = [];
  const leftIsPossible = originCoordinates.x > 0
      && ((originBlock instanceof District
          && originBlock.roads[Directions.left])
        || (originBlock instanceof Highway
        && originDirection === Directions.down
        && originBlock.connections === 0)
          || (originBlock instanceof Highway
              && originDirection === Directions.up
              && originBlock.connections === 1));
  const rightIsPossible = originCoordinates.x < 4
        && ((originBlock instanceof District && originBlock.roads[Directions.right])
        || (originBlock instanceof Highway
        && originDirection === Directions.up
        && originBlock.connections === 0)
          || (originBlock instanceof Highway
              && originDirection === Directions.down
              && originBlock.connections === 1));
  const topIsPossible = originCoordinates.y > 0
        && ((originBlock instanceof District
            && originBlock.roads[Directions.up])
        || (originBlock instanceof Highway
        && originDirection === Directions.right
        && originBlock.connections === 0)
            || (originBlock instanceof Highway
                && originDirection === Directions.left
                && originBlock.connections === 1));
  const bottomIsPossible = originCoordinates.y < 4
        && ((originBlock instanceof District
            && originBlock.roads[Directions.down])
        || (originBlock instanceof Highway
        && originDirection === Directions.left
        && originBlock.connections === 0)
            || (originBlock instanceof Highway
                && originDirection === Directions.right
                && originBlock.connections === 1));
  if (leftIsPossible) {
    connections.push(Directions.left);
  }
  if (rightIsPossible) {
    connections.push(Directions.right);
  }
  if (topIsPossible) {
    connections.push(Directions.up);
  }
  if (bottomIsPossible) {
    connections.push(Directions.down);
  }
  return connections;
};

const getOppositeDirection = (direction: Directions) => {
  switch (direction) {
    case Directions.left:
      return Directions.right;
    case Directions.right:
      return Directions.left;
    case Directions.up:
      return Directions.down;
    case Directions.down:
      return Directions.up;
    default:
      return direction;
  }
};

const addAdjacentBlock = (
  city: City,
  blockArray: CityBlock[],
  direction: Directions,
  originCoordinates: DistrictCoordinate,
) => {
  const { x, y } = originCoordinates;
  let targetBlock: CityBlock;

  if (direction === Directions.left) {
    targetBlock = city.cityBlocks[y][x - 1];
  }
  if (direction === Directions.right) {
    targetBlock = city.cityBlocks[y][x + 1];
  }
  if (direction === Directions.down) {
    targetBlock = city.cityBlocks[y + 1][x];
  }
  if (direction === Directions.up) {
    targetBlock = city.cityBlocks[y - 1][x];
  }

  if (!targetBlock) {
    return;
  }

  if (targetBlock.tile instanceof District) {
    const oppositeDirection = getOppositeDirection(direction);
    if (targetBlock.tile.roads[oppositeDirection]) {
      blockArray.push(targetBlock);
    }
  } else {
    const targetCoordinates = city.getDistrictCoordinates()
      .find((coordinate) => coordinate.id === targetBlock.tile.id);
    const newConnections = getAllPossibleConnections(
      targetBlock.tile,
      targetCoordinates,
      direction,
    );
    addAdjacentBlock(city, blockArray, newConnections[0], targetCoordinates);
  }
};

const getAdjacentDistricts = (city: City, originId: string | number) => {
  const originCoordinates = city.getDistrictCoordinates()
    .find((coordinate) => coordinate.id === originId);
  const originBlock = city.cityBlocks.flat().find((block) => block.tile.id === originId).tile;
  const adjacentTiles: CityBlock[] = [];
  const directions = getAllPossibleConnections(originBlock, originCoordinates);
  directions.forEach((direction) => {
    addAdjacentBlock(city, adjacentTiles, direction, originCoordinates);
  });
  return adjacentTiles;
};

export default getAdjacentDistricts;
