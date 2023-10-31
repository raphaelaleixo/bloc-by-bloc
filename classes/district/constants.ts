import { Faction } from "../../utils/constants";

export interface DistrictConfiguration {
  districtType: Faction | OtherDistrictTypes;
  difficulty: number;
  metroStation: boolean;
  id: number;
  code: "A" | "B" | "C";
  image: string | [string, string];
  title?: string;
  roads?: boolean[];
}

export enum OtherDistrictTypes {
  State = "STATE",
  Public = "PUBLIC",
  Commercial = "COMMERCIAL",
  Highway = "HIGHWAY",
}
