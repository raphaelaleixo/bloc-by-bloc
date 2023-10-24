import { OtherDistrictTypes } from "../classes/district/constants"
import { PoliceOpsCard, policeOpsCardTypes, policeOpsMovimentTypes, reinforcement } from "../classes/police/constants"
import { Faction } from "../utils/constants"

export const policeOpsDeck: PoliceOpsCard[] = [{
    type: policeOpsCardTypes.moviment,
    moviment: {
        movimentType: policeOpsMovimentTypes.district,
        target: Faction.Neighbors
    }
},
{
    type: policeOpsCardTypes.moviment,
    moviment: {
        movimentType: policeOpsMovimentTypes.district,
        target: Faction.Students
    }
},
{
    type: policeOpsCardTypes.moviment,
    moviment: {
        movimentType: policeOpsMovimentTypes.district,
        target: Faction.Prisoners,
    }
}, {
    type: policeOpsCardTypes.moviment,
    moviment: {
        movimentType: policeOpsMovimentTypes.district,
        target: Faction.Workers
    }
},
{
    type: policeOpsCardTypes.moviment,
    moviment: {
        movimentType: policeOpsMovimentTypes.district,
        target: OtherDistrictTypes.Commercial
    }
},
{
    type: policeOpsCardTypes.moviment,
    moviment: {
        movimentType: policeOpsMovimentTypes.district,
        target: OtherDistrictTypes.Public,
    }
},
{
    type: policeOpsCardTypes.moviment,
    moviment: {
        movimentType: policeOpsMovimentTypes.district,
        target: OtherDistrictTypes.State,
    }
},
{
    type: policeOpsCardTypes.moviment,
    moviment: {
        movimentType: policeOpsMovimentTypes.priority,
    }
},
{
    type: policeOpsCardTypes.moviment,
    moviment: {
        movimentType: policeOpsMovimentTypes.priority,
    }
},
{
    type: policeOpsCardTypes.moviment,
    moviment: {
        movimentType: policeOpsMovimentTypes.bloc,
    }
},
{
    type: policeOpsCardTypes.moviment,
    moviment: {
        movimentType: policeOpsMovimentTypes.occupation,
    }
},
{
    type: policeOpsCardTypes.reinforcement,
    reinforcement: reinforcement.light
},
{
    type: policeOpsCardTypes.rotation
}]