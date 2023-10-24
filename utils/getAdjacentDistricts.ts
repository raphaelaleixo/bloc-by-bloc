import City, { CityBlock } from "../classes/city";

export const findAdjacentDistricts = (city: City, targetId: string | number) => {
    const targetCoordinates = city.getDistrictCoordinates().find(coordinate => coordinate.id === targetId);
    const targetBlock: CityBlock = city.blocks.flat().find(block => block.tile.id === targetId);
    console.log(targetBlock);
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
        adjacentTiles.push(city.blocks[y][x - 1]);
    }
    // Right
    if (x < 4) {
        adjacentTiles.push(city.blocks[y][x + 1]);
    }
    // Up
    if (y > 0) {
        adjacentTiles.push(city.blocks[y - 1][x]);
    }
    // Down
    if (y < 4) {
        adjacentTiles.push(city.blocks[y + 1][x]);
    }
    // You can add diagonal checks here if needed
    return adjacentTiles;
}