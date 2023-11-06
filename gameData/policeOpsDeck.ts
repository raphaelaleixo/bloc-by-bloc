import {
  OtherDistrictTypes,
  PoliceOpsCard,
  PoliceOpsCardTypes,
  PoliceOpsMovimentTypes,
  Reinforcement,
  Faction,
} from '../utils/constants';

const policeOpsDeck: PoliceOpsCard[] = [
  {
    title: Faction.Neighbors,
    type: PoliceOpsCardTypes.moviment,
    moviment: {
      movimentType: PoliceOpsMovimentTypes.district,
      target: Faction.Neighbors,
    },
  },
  {
    type: PoliceOpsCardTypes.moviment,
    title: Faction.Students,
    moviment: {
      movimentType: PoliceOpsMovimentTypes.district,
      target: Faction.Students,
    },
  },
  {
    type: PoliceOpsCardTypes.moviment,
    title: Faction.Prisoners,
    moviment: {
      movimentType: PoliceOpsMovimentTypes.district,
      target: Faction.Prisoners,
    },
  }, {
    type: PoliceOpsCardTypes.moviment,
    title: Faction.Workers,
    moviment: {
      movimentType: PoliceOpsMovimentTypes.district,
      target: Faction.Workers,
    },
  },
  {
    type: PoliceOpsCardTypes.moviment,
    title: OtherDistrictTypes.Commercial,
    moviment: {
      movimentType: PoliceOpsMovimentTypes.district,
      target: OtherDistrictTypes.Commercial,
    },
  },
  {
    type: PoliceOpsCardTypes.moviment,
    title: OtherDistrictTypes.Public,
    moviment: {
      movimentType: PoliceOpsMovimentTypes.district,
      target: OtherDistrictTypes.Public,
    },
  },
  {
    type: PoliceOpsCardTypes.moviment,
    title: OtherDistrictTypes.State,
    moviment: {
      movimentType: PoliceOpsMovimentTypes.district,
      target: OtherDistrictTypes.State,
    },
  },
  {
    type: PoliceOpsCardTypes.moviment,
    title: 'DISTRICT PATROLS',
    contentAfter: 'All groups of police squads advance into adjacent districts with the highest police ID',
    moviment: {
      movimentType: PoliceOpsMovimentTypes.priority,
    },
  },
  {
    type: PoliceOpsCardTypes.moviment,
    title: 'DISTRICT PATROLS',
    contentAfter: 'All groups of police squads advance into adjacent districts with the highest police ID',
    moviment: {
      movimentType: PoliceOpsMovimentTypes.priority,
    },
  },
  {
    type: PoliceOpsCardTypes.moviment,
    title: 'SNATCH SQUADS',
    increaseMorale: true,
    contentAfter: '+1 police morale.\n\nAll groups of police squads advance into adjacent districts with blocs',
    moviment: {
      movimentType: PoliceOpsMovimentTypes.bloc,
    },
  },
  {
    type: PoliceOpsCardTypes.moviment,
    title: 'PARAMILITARY RAIDS',
    increaseMorale: true,
    contentAfter: '+1 police morale.\n\nAll groups of police squads advance into adjacent districts with occupations',
    moviment: {
      movimentType: PoliceOpsMovimentTypes.occupation,
    },
  },
  {
    title: 'LIGHT REINFORCEMENT',
    type: PoliceOpsCardTypes.reinforcement,
    increaseMorale: true,
    contentAfter: '+1 police morale.\n\nAll police vans deploy 1 police squad.',
    reinforcement: Reinforcement.light,
  },
  {
    title: 'LIGHT REINFORCEMENT',
    type: PoliceOpsCardTypes.reinforcement,
    increaseMorale: true,
    contentAfter: '+1 police morale.\n\nAll police vans deploy 1 police squad.',
    reinforcement: Reinforcement.light,
  },
  {
    title: 'HEAVY REINFORCEMENT',
    type: PoliceOpsCardTypes.reinforcement,
    increaseMorale: true,
    contentAfter: '+1 police morale.\n\nAll police vans deploy 1 police squad.\n\nIf fewer than 4 police vans are stationed in the city: Deploy 1 van to the district with the highest police ID that has at least 1 police squad but no van',
    reinforcement: Reinforcement.heavy,
  },
  {
    title: 'STRATEGIC ROTATION',
    contentAfter: 'All groups of police squads reduce down to 5 max per district.\n\nExtra squads return to the staging area.',
    type: PoliceOpsCardTypes.rotation,
  },
];

export default policeOpsDeck;
