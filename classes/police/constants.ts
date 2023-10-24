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
    type: policeOpsCardTypes;
    moviment?: moviment;
    reinforcement?: reinforcement;
}

export const stateDistricts = [12, 13, 14, 15];