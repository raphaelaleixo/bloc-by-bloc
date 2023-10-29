import { Faction } from "../../utils/constants";
import { OtherDistrictTypes } from "../district/constants";

export enum policeOpsCardTypes {
    moviment,
    reinforcement,
    rotation,
}

export enum policeOpsMovimentTypes {
    district,
    priority,
    bloc,
    occupation,
}

export enum priority {
    highest,
    lowest,
}

export enum reinforcement {
    light,
    heavy,
}

export interface moviment {
    movimentType: policeOpsMovimentTypes;
    target?: Faction | OtherDistrictTypes | priority;
}

export type PoliceOpsCard = {
    title: string,
    contentAfter?: string,
    type: policeOpsCardTypes;
    increaseMorale?: boolean,
    moviment?: moviment;
    reinforcement?: reinforcement;
}

export const stateDistricts = [12, 13, 14, 15];

type MoraleTrackItem = {
    text: string,
    value: number,
}

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