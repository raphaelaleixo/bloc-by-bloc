import { Code, DistrictType } from '../utils/constants';

export default class Tile {
  code: Code;

  rotation: 0 | 90 | 180 | 270 = 0;

  districtType: DistrictType;

  constructor(code: Code, type: DistrictType) {
    this.code = code;
    this.districtType = type;
  }
}
