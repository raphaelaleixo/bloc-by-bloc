let id: number = 0;
export default class Block {
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
