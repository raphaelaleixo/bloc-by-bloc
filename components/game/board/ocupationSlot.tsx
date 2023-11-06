import { useMemo } from 'react';
import District from '../../../classes/District';
import { TailwindProperty } from '../../../utils/constants';
import getColor from '../../../utils/getColor';

const OcupationSlot: React.FC<{ tile: District }> = ({ tile }) => {
  const borderColor = useMemo(() => getColor(
    tile.districtType,
    TailwindProperty.Border,
  ), [tile.districtType]);

  if (tile.hasOccupationSlot === false) {
    return false;
  }

  return (
        <div className={`absolute w-1/4 h-1/4 rounded-full right-[8%] top-[8%] border-4 ${borderColor}`}></div>
  );
};

export default OcupationSlot;
