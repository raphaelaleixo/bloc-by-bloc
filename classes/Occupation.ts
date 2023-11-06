import { OccupationTypes } from '../utils/constants';

let id = 0;
export default class Occupation {
  type: OccupationTypes;

  districtId: number;

  active: boolean = false;

  id: number;

  constructor(type: OccupationTypes) {
    this.type = type;
    this.id = id++;
  }

  create(districtId: number) {
    this.districtId = districtId;
    this.active = true;
    return this;
  }

  destroy() {
    this.districtId = null;
    this.active = false;
    return this;
  }
}
