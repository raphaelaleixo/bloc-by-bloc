import City, { CityBlock, DistrictCoordinate } from "../classes/city";
import District, { Highway } from "../classes/district";

enum directions {
    right,
    down,
    left,
    up,
}

const getAllPossibleConnections = (originBlock: District | Highway, originCoordinates: DistrictCoordinate, originDirection?: directions) => {
    const connections = [];
    const leftIsPossible = originCoordinates.x > 0 && ((originBlock instanceof District && originBlock.roads[directions.left])
        || (originBlock instanceof Highway && originDirection === directions.down && originBlock.connections === 0)
        || (originBlock instanceof Highway && originDirection === directions.up && originBlock.connections === 1));
    const rightIsPossible = originCoordinates.x < 4 && ((originBlock instanceof District && originBlock.roads[directions.right])
        || (originBlock instanceof Highway && originDirection === directions.up && originBlock.connections === 0)
        || (originBlock instanceof Highway && originDirection === directions.down && originBlock.connections === 1));
    const topIsPossible = originCoordinates.y > 0 && ((originBlock instanceof District && originBlock.roads[directions.up])
        || (originBlock instanceof Highway && originDirection === directions.right && originBlock.connections === 0)
        || (originBlock instanceof Highway && originDirection === directions.left && originBlock.connections === 1));
    const bottomIsPossible = originCoordinates.y < 4 && ((originBlock instanceof District && originBlock.roads[directions.down])
        || (originBlock instanceof Highway && originDirection === directions.left && originBlock.connections === 0)
        || (originBlock instanceof Highway && originDirection === directions.right && originBlock.connections === 1));
    if (leftIsPossible) {
        connections.push(directions.left);
    }
    if (rightIsPossible) {
        connections.push(directions.right);
    }
    if (topIsPossible) {
        connections.push(directions.up);
    }
    if (bottomIsPossible) {
        connections.push(directions.down);
    }
    return connections;
}

const getOppositeDirection = (direction: directions) => {
    switch (direction) {
        case directions.left:
            return directions.right;
        case directions.right:
            return directions.left;
        case directions.up:
            return directions.down;
        case directions.down:
            return directions.up;
        default:
            return direction;
    }
};

const addAdjacentBlock = (city: City, blockArray: CityBlock[], direction: directions, originCoordinates: DistrictCoordinate) => {
    const { x, y } = originCoordinates;
    let targetBlock: CityBlock;

    if (direction === directions.left) {
        targetBlock = city.cityBlocks[y][x - 1];
    }
    if (direction === directions.right) {
        targetBlock = city.cityBlocks[y][x + 1];
    }
    if (direction === directions.down) {
        targetBlock = city.cityBlocks[y + 1][x];
    }
    if (direction === directions.up) {
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
        const targetCoordinates = city.getDistrictCoordinates().find(coordinate => coordinate.id === targetBlock.tile.id);
        const newConnections = getAllPossibleConnections(targetBlock.tile, targetCoordinates, direction);
        addAdjacentBlock(city, blockArray, newConnections[0], targetCoordinates);
    }
}



export const getAdjacentDistricts = (city: City, originId: string | number,) => {
    const originCoordinates = city.getDistrictCoordinates().find(coordinate => coordinate.id === originId);
    const originBlock = city.cityBlocks.flat().find(block => block.tile.id === originId).tile;
    const adjacentTiles: CityBlock[] = [];
    const directions = getAllPossibleConnections(originBlock, originCoordinates);
    directions.forEach(direction => {
        addAdjacentBlock(city, adjacentTiles, direction, originCoordinates);
    });
    return adjacentTiles;
}