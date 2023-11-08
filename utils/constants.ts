export enum Faction {
  Workers = 'WORKERS',
  Students = 'STUDENTS',
  Neighbors = 'NEIGHBORS',
  Prisoners = 'PRISONERS',
}
export type Code = 'A' | 'B' | 'C';

export enum TailwindProperty {
  Text,
  Border,
  Background,
}
export type DistrictType = OtherDistrictTypes | Faction;
export const rotations = [0, 90, 180, 270];
export type DistrictImage = [string, string];
export enum HighwayConnections {
  ldtr,
  ltdr,
}
export interface DistrictConfiguration {
  districtType: Faction | OtherDistrictTypes;
  difficulty: number;
  metroStation: boolean;
  id: number;
  code: 'A' | 'B' | 'C';
  image: string | [string, string];
  title?: string;
  roads?: boolean[];
}

export enum OtherDistrictTypes {
  State = 'STATE',
  Public = 'PUBLIC',
  Commercial = 'COMMERCIAL',
  Highway = 'HIGHWAY',
}
export enum OccupationTypes {
  factionStart,
  assemblyHall,
  mutualAidCenter,
}
export const availableOccupations = [
  OccupationTypes.factionStart,
  OccupationTypes.assemblyHall,
  OccupationTypes.assemblyHall,
  OccupationTypes.mutualAidCenter,
  OccupationTypes.mutualAidCenter,
];
export interface BlockMap {
  [key: string | number]: {
    blocks?: number;
  };
}
export type PlayerNumber = 0 | 1 | 2 | 3;
export enum PoliceOpsCardTypes {
  moviment,
  reinforcement,
  rotation,
}

export enum PoliceOpsMovimentTypes {
  district,
  priority,
  bloc,
  occupation,
}

export enum Priority {
  highest,
  lowest,
}

export enum Reinforcement {
  light,
  heavy,
}

export interface Moviment {
  movimentType: PoliceOpsMovimentTypes;
  target?: Faction | OtherDistrictTypes | Priority;
}

export type PoliceOpsCard = {
  title: string;
  contentAfter?: string;
  type: PoliceOpsCardTypes;
  increaseMorale?: boolean;
  moviment?: Moviment;
  reinforcement?: Reinforcement;
};

export const stateDistricts = [12, 13, 14, 15];
type MoraleTrackItem = {
  text: string;
  value: number;
};

export const moraleTrack: MoraleTrackItem[] = [
  {
    text: 'Timid',
    value: 1,
  },
  {
    text: 'Alert',
    value: 2,
  },
  {
    text: 'Bold',
    value: 2,
  },
  {
    text: 'Brutal',
    value: 2,
  },
  {
    text: 'Deadly',
    value: 3,
  },
];
export interface PoliceBlockMap {
  [key: string | number]: {
    policeBlocks?: number;
    policeVans?: number;
  };
}
export type PoliceBlockMoviment = {
  blockId: number;
  targetDistrictId: number;
};

export enum LootStatus {
  None = 'NONE',
  Burned = 'BURNED',
  Graffiti = 'GRAFFITI',
}

export enum Directions {
  right,
  down,
  left,
  up,
}

export enum GameStates {
  Setup,
  Night,
  Day,
}
