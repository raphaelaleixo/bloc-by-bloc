import { randomSelect } from '../utils/randomizers';
import {
  Code, DistrictType, HighwayConnections, DistrictImage, rotations,
} from '../utils/constants';
import Tile from './Tile';

let highwayId = -1;
export default class Highway extends Tile {
  connections: HighwayConnections;

  id: number;

  constructor(code: Code, image: DistrictImage, type?: DistrictType) {
    super(code, type);
    this.id = highwayId--;
  }

  rotateDistrict() {
    const selectedRotation = randomSelect(rotations);
    this.rotation = selectedRotation;
    this.connections = this.rotation === 0
          || this.rotation === 180 ? HighwayConnections.ldtr : HighwayConnections.ltdr;
    return this;
  }
}
