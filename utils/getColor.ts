import { OtherDistrictTypes, Faction, TailwindProperty } from './constants';

const getColor = (districtType: Faction | OtherDistrictTypes, property: TailwindProperty) => {
  if (property === TailwindProperty.Text) {
    switch (districtType) {
      case (Faction.Neighbors):
        return 'text-green-500';
      case (Faction.Prisoners):
        return 'text-orange-500';
      case (Faction.Workers):
        return 'text-yellow-500';
      case (Faction.Students):
        return 'text-purple-500';
      case (OtherDistrictTypes.Public):
        return 'text-fuchsia-300';
      case (OtherDistrictTypes.State):
        return 'text-white';
      default:
        return 'text-zinc-300';
    }
  }
  if (property === TailwindProperty.Border) {
    switch (districtType) {
      case (Faction.Neighbors):
        return 'border-green-500';
      case (Faction.Prisoners):
        return 'border-orange-500';
      case (Faction.Workers):
        return 'border-yellow-500';
      case (Faction.Students):
        return 'border-purple-500';
      case (OtherDistrictTypes.Public):
        return 'border-fuchsia-300';
      case (OtherDistrictTypes.State):
        return 'border-white';
      default:
        return 'border-zinc-300';
    }
  }
  if (property === TailwindProperty.Background) {
    switch (districtType) {
      case (Faction.Neighbors):
        return 'bg-green-500';
      case (Faction.Prisoners):
        return 'bg-orange-500';
      case (Faction.Workers):
        return 'bg-yellow-500';
      case (Faction.Students):
        return 'bg-purple-500';
      case (OtherDistrictTypes.Public):
        return 'bg-fuchsia-300';
      case (OtherDistrictTypes.State):
        return 'bg-white';
      default:
        return 'bg-zinc-300';
    }
  }
  if (property === TailwindProperty.LightBackground) {
    switch (districtType) {
      case (Faction.Neighbors):
        return 'bg-green-100';
      case (Faction.Prisoners):
        return 'bg-orange-100';
      case (Faction.Workers):
        return 'bg-yellow-100';
      case (Faction.Students):
        return 'bg-purple-100';
      case (OtherDistrictTypes.Public):
        return 'bg-fuchsia-300';
      case (OtherDistrictTypes.State):
        return 'bg-white';
      default:
        return 'bg-zinc-300';
    }
  }
  return '';
};

export default getColor;
