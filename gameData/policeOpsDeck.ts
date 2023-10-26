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
    title: 'MOVE BY PRIORITY',
    moviment: {
        movimentType: policeOpsMovimentTypes.priority,
    }
},
{
    type: policeOpsCardTypes.moviment,
    title: 'MOVE BY PRIORITY',
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
    reinforcement: reinforcement.light
},
{
    title: 'HEAVY REINFORCEMENT',
    type: policeOpsCardTypes.reinforcement,
    reinforcement: reinforcement.heavy
},
{
    title: 'STRATEGIC ROTATION',
    type: policeOpsCardTypes.rotation
}
]