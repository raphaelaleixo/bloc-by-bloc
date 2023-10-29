import { useState } from "react";
import Police from "../../classes/police"
import { PoliceOpsCard } from "../../classes/police/constants";
import City from "../../classes/city";
import PoliceOpsDeckCard from "./policeOpsDeckCard";

const PoliceOpsDeck: React.FC<{ city: City, police: Police, setPolice: Function }> = ({ city, police, setPolice }) => {
  const [policeOpsCard, setPoliceOpsCard] = useState<PoliceOpsCard | undefined>();

  return (
    <>
      <div className="h-[240px]">
        <PoliceOpsDeckCard policeOpsCard={policeOpsCard} />
      </div>
      <button
        onClick={() => {
          const newPolice = police.clone();
          setPoliceOpsCard(newPolice.drawPoliceCard(city));
          setPolice(newPolice);
        }}
        className="bg-cyan-300 rounded-sm text-xs uppercase leading-none p-2 font-bold"
      >
        Draw police ops card
      </button>
    </>
  )
}

export default PoliceOpsDeck;