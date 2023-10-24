import City, { CityBlock } from "../classes/city";
import District from "../classes/district";

enum directions {
    right,
    down,
    left,
    up,
}

export const findAdjacentDistricts = (city: City, targetId: string | number) => {
    const targetCoordinates = city.getDistrictCoordinates().find(coordinate => coordinate.id === targetId);
    const targetBlock = city.blocks.flat().find(block => block.tile.id === targetId).tile as District;
    if (!targetCoordinates) {
        return [];
    }
    const { x, y } = targetCoordinates;
    const adjacentTiles: CityBlock[] = [];
    //TODO: Add street rules
    //TODO: Add highway rules
    //TODO: Add barricade rules
    // Left
    if (x > 0) {
        const adjacent = city.blocks[y][x - 1].tile as District;
        if (adjacent.roads && targetBlock.roads && adjacent.roads[directions.right] && targetBlock.roads[directions.left]) {
            adjacentTiles.push(city.blocks[y][x - 1]);
        }
    }
    // Right
    if (x < 4) {
        const adjacent = city.blocks[y][x + 1].tile as District;
        if (adjacent.roads && targetBlock.roads && adjacent.roads[directions.left] && targetBlock.roads[directions.right]) {
            adjacentTiles.push(city.blocks[y][x + 1]);
        }
    }
    // Up
    if (y > 0) {
        const adjacent = city.blocks[y - 1][x].tile as District;
        if (adjacent.roads && targetBlock.roads && adjacent.roads[directions.down] && targetBlock.roads[directions.up]) {
            adjacentTiles.push(city.blocks[y - 1][x]);
        }
    }
    // Down
    if (y < 4) {
        const adjacent = city.blocks[y + 1][x].tile as District;
        if (adjacent.roads && targetBlock.roads && adjacent.roads[directions.up] && targetBlock.roads[directions.down]) {
            adjacentTiles.push(city.blocks[y + 1][x]);
        }
    }
    return adjacentTiles;
}