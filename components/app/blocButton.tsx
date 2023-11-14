import { useMemo } from 'react';
import { Faction, TailwindProperty } from '../../utils/constants';
import getColor from '../../utils/getColor';

const BlocButton: React.FC<{
  className?: string;
  primary?: boolean;
  faction?: Faction;
  disabled?: boolean;
  isPolice?: boolean;
  children: React.ReactNode;
  large?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}> = ({
  className, primary, faction, children, isPolice = false, onClick, disabled, large,
}) => {
  const buttonClass = useMemo(() => {
    const size = large ? 'text-sm p-4' : 'text-xs p-2';
    let baseClass = `${size} uppercase font-bold px-4 rounded-md leading-none hover:opacity-80 `;
    if (primary) {
      if (isPolice) {
        baseClass
          += 'bg-cyan-500 text-white disabled:bg-zinc-300';
      } else if (faction) {
        baseClass
        += `${getColor(faction, TailwindProperty.Background)} text-white disabled:bg-zinc-300`;
      } else {
        baseClass
        += `${getColor(faction, TailwindProperty.Background)} text-white disabled:bg-zinc-300`;
      }
    } else if (isPolice) {
      baseClass
              += 'bg-cyan-300 text-white disabled:bg-cyan-200 disabled:text-cyan-300';
    } else if (faction) {
      baseClass
            += `${getColor(faction, TailwindProperty.Border)} ${getColor(faction, TailwindProperty.Text)} border-2 disabled:border-zinc-300 disabled:text-zinc-300`;
    } else {
      baseClass
            += 'border-2 border-white text-white disabled:border-zinc-700 disabled:text-zinc-700';
    }
    return baseClass;
  }, [primary, faction, isPolice, large]);

  return <button disabled={disabled} onClick={onClick} className={`${buttonClass} ${className}`}>{children}</button>;
};

export default BlocButton;
