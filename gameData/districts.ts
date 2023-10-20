import {
    DistrictConfiguration,
    OtherDistrictTypes
  } from "../classes/district/constants";
  import { Faction } from "../utils/constants";
  
  export const districtList: Array<DistrictConfiguration> = [
    {
      districtType: OtherDistrictTypes.Commercial,
      difficulty: 3,
      metroStation: true,
      id: 1,
      code: "C",
      image: ""
    },
    {
      districtType: OtherDistrictTypes.Commercial,
      difficulty: 3,
      metroStation: false,
      id: 2,
      code: "B",
      image: ""
    },
    {
      districtType: OtherDistrictTypes.Commercial,
      difficulty: 3,
      metroStation: false,
      id: 3,
      code: "A",
      image: ""
    },
    {
      districtType: Faction.Workers,
      difficulty: 4,
      metroStation: true,
      id: 5,
      code: "C",
      image: "",
      title: "Garment Sweatshop"
    },
    {
      districtType: Faction.Prisoners,
      difficulty: 4,
      metroStation: true,
      id: 4,
      code: "C",
      image: "",
      title: "Overcrowded Jail"
    },
    {
      districtType: Faction.Students,
      difficulty: 4,
      metroStation: true,
      id: 6,
      code: "C",
      image: "",
      title: "Underfunded High School"
    },
    {
      districtType: Faction.Neighbors,
      difficulty: 4,
      metroStation: true,
      id: 7,
      code: "C",
      image: "",
      title: "Polluted Slum"
    },
    {
      districtType: Faction.Neighbors,
      difficulty: 5,
      metroStation: false,
      id: 8,
      code: "B",
      image: "",
      title: "The Projects"
    },
    {
      districtType: Faction.Students,
      difficulty: 5,
      metroStation: false,
      id: 9,
      code: "B",
      image: "",
      title: "Bankrupt Junior College"
    },
    {
      districtType: Faction.Prisoners,
      difficulty: 5,
      metroStation: false,
      id: 11,
      code: "B",
      image: "",
      title: "Immigration Detetention Center"
    },
    {
      districtType: Faction.Workers,
      difficulty: 5,
      metroStation: false,
      id: 10,
      code: "B",
      image: "",
      title: "Smartphone Factory"
    },
    {
      districtType: Faction.Prisoners,
      difficulty: 6,
      metroStation: false,
      id: 18,
      code: "A",
      image: "",
      title: "Supermax Prison"
    },
    {
      districtType: Faction.Workers,
      difficulty: 6,
      metroStation: false,
      id: 19,
      code: "A",
      image: "",
      title: "Global Shipping & Receiving Center"
    },
    {
      districtType: Faction.Neighbors,
      difficulty: 6,
      metroStation: false,
      id: 17,
      code: "A",
      image: "",
      title: "Gentrifying Residential Zone"
    },
    {
      districtType: Faction.Students,
      difficulty: 6,
      metroStation: false,
      id: 16,
      code: "A",
      image: "",
      title: "Privatized University"
    },
    {
      districtType: OtherDistrictTypes.Public,
      difficulty: 4,
      metroStation: false,
      id: 20,
      code: "B",
      image: "",
      title: "Street Market"
    },
    {
      districtType: OtherDistrictTypes.Public,
      difficulty: 4,
      metroStation: false,
      id: 21,
      code: "B",
      image: "",
      title: "Park"
    },
    {
      districtType: OtherDistrictTypes.Public,
      difficulty: 4,
      metroStation: false,
      id: 22,
      code: "B",
      image: "",
      title: "Plaza"
    },
    {
      districtType: OtherDistrictTypes.State,
      difficulty: 6,
      metroStation: false,
      id: 12,
      code: "A",
      image: "",
      title: "Financial District"
    },
    {
      districtType: OtherDistrictTypes.State,
      difficulty: 6,
      metroStation: false,
      id: 13,
      code: "A",
      image: "",
      title: "Telecom Network Hub"
    },
    {
      districtType: OtherDistrictTypes.State,
      difficulty: 6,
      metroStation: false,
      id: 14,
      code: "A",
      image: "",
      title: "International Airport"
    },
    {
      districtType: OtherDistrictTypes.State,
      difficulty: 6,
      metroStation: false,
      id: 15,
      code: "A",
      image: "",
      title: "Interior Ministry"
    }
  ];
  