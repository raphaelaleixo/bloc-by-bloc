export enum Faction {
    Workers = "WORKERS",
    Students = "STUDENTS",
    Neighbors = "NEIGHBORS",
    Prisoners = "PRISONERS"
}
export type Code = "A" | "B" | "C";

let id: number = 0;
export class Block {
    districtId: number;
    id: number;

    constructor(districtId: number) {
        this.districtId = districtId;
        this.id = id++;
    }

    moveBlock(districtCode: number) {
        this.districtId = districtCode;
    }
}
