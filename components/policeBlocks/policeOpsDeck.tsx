import { useState } from "react";
import Police from "../../classes/police"
import { PoliceOpsCard } from "../../classes/police/constants";
import { instanceToInstance } from "class-transformer";
import City from "../../classes/city";

const PoliceOpsDeck: React.FC<{ city: City, police: Police, setPolice: Function }> = ({ city, police, setPolice }) => {
    const [policeOpsCard, setPoliceOpsCard] = useState<PoliceOpsCard | undefined>();
    
    return (
        <>
        <div className={`w-[160px] h-[240px] p-2 rounded-md flex items-center justify-center ${policeOpsCard ? 'bg-slate-100' : ''} text-center`}>
            {policeOpsCard?.title}
        </div>
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