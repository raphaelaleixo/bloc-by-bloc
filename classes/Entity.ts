import { Type, instanceToInstance, instanceToPlain } from 'class-transformer';
import { Block } from '../utils/constants';

export default class Entity {
  blockCount: number;

  @Type(() => Block)
    blocks: Block[] = [];

  clone(): this {
    return instanceToInstance(this) as this;
  }

  export(): string {
    return JSON.stringify(instanceToPlain(this));
  }

  getBlocksInDistrict(districtId: number): Block[] {
    return this.blocks.filter((block) => block.districtId === districtId);
  }

  getDistrictsWithBlocks(): Array<number> {
    return Array.from(new Set(this.blocks.map((block) => block.districtId)));
  }

  removeBlock(blockId: number): this {
    const targetBlock = this.blocks.find((block) => block.id === blockId);
    if (targetBlock) {
      this.blocks = this.blocks.filter((block) => block.id !== targetBlock.id);
      this.blockCount++;
    }
    return this;
  }

  createBlock(districtCode: number): this {
    if (this.blockCount > 0) {
      this.blocks.push(new Block(districtCode));
      this.blockCount--;
    }
    return this;
  }
}
