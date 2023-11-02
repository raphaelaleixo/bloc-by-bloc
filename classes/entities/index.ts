import { Block } from "../../utils/constants";
import { Type, instanceToInstance, instanceToPlain } from "class-transformer";

export default class Entity {
    blockCount: number;
    @Type(() => Block)
    blocks: Block[] = [];

    clone(): Entity {
        return instanceToInstance(this);
    }

    export(): string {
        return JSON.stringify(instanceToPlain(this));
    }

    getBlocksInDistrict(districtId: number): Block[] {
        return this.blocks.filter(block => block.districtId === districtId);
    }

    getDistrictsWithBlocks(): Array<number> {
        return Array.from(new Set(this.blocks.map((block) => block.districtId)));
    }

    removeBlock(blockId: number): Entity {
        const targetBlock = this.blocks.find(block => block.id === blockId);
        if (targetBlock) {
            this.blocks = this.blocks.filter(block => block.id !== targetBlock.id);
            this.blockCount++;
        }
        return this;
    }

    createBlock(districtCode: number): Entity {
        if (this.blockCount > 0) {
            this.blocks.push(new Block(districtCode));
            this.blockCount--;
        }
        return this;
    }

}