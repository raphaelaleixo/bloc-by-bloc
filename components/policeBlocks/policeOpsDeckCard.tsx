import { PoliceOpsCard, policeOpsMovimentTypes } from "../../classes/police/constants";

const PoliceOpsDeckCard: React.FC<{ policeOpsCard: PoliceOpsCard }> = ({ policeOpsCard }) => {

    if (!policeOpsCard) {
        return false;
    }

    const contentBefore = policeOpsCard.moviment?.movimentType === policeOpsMovimentTypes.district ? 'All groups of police squads advance into adjacent' : '';
    const title = policeOpsCard.moviment?.movimentType === policeOpsMovimentTypes.district ? `${policeOpsCard.title} districts` : policeOpsCard.title;
    const extraInfo = policeOpsCard.moviment ? 'Squads in districts with occupations hold their position' : '';
    const bannerInfo = policeOpsCard.moviment ? 'Squad Moviment' : ' ';
    const bannerColor = policeOpsCard.moviment ? 'bg-blue-600' : '';

    return  (
        <div className="w-[160px] h-[240px] p-2 rounded-md flex flex-col justify-top bg-slate-100 text-center">
            <div className={`${bannerColor} text-[0.6em] leading-none p-1 text-white rounded-sm mb-4`}>{bannerInfo}</div>
            <div className="text-[0.6rem] leading-none">{contentBefore}</div>
            <div className="font-bold leading-none text-md my-2 uppercase">{title}</div>
            <div className="text-[0.6rem] leading-none whitespace-pre-wrap">{policeOpsCard.contentAfter}</div>
            <div className="text-[0.6rem] leading-none mt-auto text-blue-600">{extraInfo}</div>
        </div>
    );
}

export default PoliceOpsDeckCard;