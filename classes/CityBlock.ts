import { Type } from 'class-transformer';
import { Code } from '../utils/constants';
import District from './District';
import Highway from './Highway';

export default class CityBlock {
  code: Code;

  @Type(() => District, {
    discriminator: {
      property: '__type',
      subTypes: [
        { value: District, name: 'district' },
        { value: Highway, name: 'highway' },
      ],
    },
  })
    tile: District | Highway;

  constructor(code: Code) {
    this.code = code;
  }

  addTile(tile: District | Highway) {
    this.tile = tile;
    return this;
  }
}
