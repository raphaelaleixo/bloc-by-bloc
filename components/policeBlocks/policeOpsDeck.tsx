import { useState } from "react";
import Police from "../../classes/police"
import { PoliceOpsCard } from "../../classes/police/constants";
import { instanceToInstance } from "class-transformer";
import City from "../../classes/city";
import PoliceOpsDeckCard from "./policeOpsDeckCard";

const PoliceOpsDeck: React.FC<{ city: City, police: Police, setPolice: Function }> = ({ city, police, setPolice }) => {
    const [policeOpsCard, setPoliceOpsCard] = useState<PoliceOpsCard | undefined>();
    
    return (
        <>
        <PoliceOpsDeckCard policeOpsCard={policeOpsCard} />
        <button
            onClick={() => {
              setPoliceOpsCard(police.drawPoliceCard(city));
              const newPolice = instanceToInstance(police);
              setPolice(newPolice);
            }}
            className="bg-white"
          >
            Draw police ops card
          </button>
        </>
    )
}

export default PoliceOpsDeck;