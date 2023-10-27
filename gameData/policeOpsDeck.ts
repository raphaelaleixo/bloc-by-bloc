import { OtherDistrictTypes } from "../classes/district/constants"
import { PoliceOpsCard, policeOpsCardTypes, policeOpsMovimentTypes, reinforcement } from "../classes/police/constants"
import { Faction } from "../utils/constants"

export const policeOpsDeck: PoliceOpsCard[] = [{
    title: Faction.Neighbors,
    type: policeOpsCardTypes.moviment,
    moviment: {
        movimentType: policeOpsMovimentTypes.district,
        target: Faction.Neighbors
    }
},
{
    type: policeOpsCardTypes.moviment,
    title: Faction.Students,
    moviment: {
        movimentType: policeOpsMovimentTypes.district,
        target: Faction.Students
    }
},
{
    type: policeOpsCardTypes.moviment,
    title: Faction.Prisoners,
    moviment: {
        movimentType: policeOpsMovimentTypes.district,
        target: Faction.Prisoners,
    }
}, {
    type: policeOpsCardTypes.moviment,
    title: Faction.Workers,
    moviment: {
        movimentType: policeOpsMovimentTypes.district,
        target: Faction.Workers
    }
},
{
    type: policeOpsCardTypes.moviment,
    title: OtherDistrictTypes.Commercial,
    moviment: {
        movimentType: policeOpsMovimentTypes.district,
        target: OtherDistrictTypes.Commercial
    }
},
{
    type: policeOpsCardTypes.moviment,
    title: OtherDistrictTypes.Public,
    moviment: {
        movimentType: policeOpsMovimentTypes.district,
        target: OtherDistrictTypes.Public,
    }
},
{
    type: policeOpsCardTypes.moviment,
    title: OtherDistrictTypes.State,
    moviment: {
        movimentType: policeOpsMovimentTypes.district,
        target: OtherDistrictTypes.State,
    }
},
{
    type: policeOpsCardTypes.moviment,
    title: 'DISTRICT PATROLS',
    contentAfter: 'All groups of police squads advance into adjacent districts with the highest police ID',
    moviment: {
        movimentType: policeOpsMovimentTypes.priority,
    }
},
{
    type: policeOpsCardTypes.moviment,
    title: 'DISTRICT PATROLS',
    contentAfter: 'All groups of police squads advance into adjacent districts with the highest police ID',
    moviment: {
        movimentType: policeOpsMovimentTypes.priority,
    }
},
// {
//     type: policeOpsCardTypes.moviment,
//     title: 'GO AFTER BLOCKS',
//     moviment: {
//         movimentType: policeOpsMovimentTypes.bloc,
//     }
// },
// {
//     type: policeOpsCardTypes.moviment,
//     title: 'GO AFTER OCCUPATIONS',
//     moviment: {
//         movimentType: policeOpsMovimentTypes.occupation,
//     }
// },
{
    title: 'LIGHT REINFORCEMENT',
    type: policeOpsCardTypes.reinforcement,
    increaseMorale: true,
    contentAfter: '+1 police morale.\n\nAll police vans deploy 1 police squad.',
    reinforcement: reinforcement.light
},
{
    title: 'LIGHT REINFORCEMENT',
    type: policeOpsCardTypes.reinforcement,
    increaseMorale: true,
    contentAfter: '+1 police morale.\n\nAll police vans deploy 1 police squad.',
    reinforcement: reinforcement.light
},
{
    title: 'HEAVY REINFORCEMENT',
    type: policeOpsCardTypes.reinforcement,
    increaseMorale: true,
    contentAfter: '+1 police morale.\n\nAll police vans deploy 1 police squad.\n\nIf fewer than 4 police vans are stationed in the city: Deploy 1 van to the district with the highest police ID that has at least 1 police squad but no van',
    reinforcement: reinforcement.heavy
},
{
    title: 'STRATEGIC ROTATION',
    contentAfter: 'All groups of police squads reduce down to 5 max per district.\n\nExtra squads return to the staging area.',
    type: policeOpsCardTypes.rotation
}
]