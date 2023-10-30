import { instanceToPlain } from "class-transformer"
import { ref, set } from "firebase/database";
import database from "./firebase.api";
import Police from "../classes/police";
import City from "../classes/city";


export const savePolice = (police: Police) => {
    const jsonString = JSON.stringify(instanceToPlain(police));
    set(ref(database, 'test/police'), jsonString);
}

export const saveCity = (city: City) => {
    const jsonString = JSON.stringify(instanceToPlain(city));
    set(ref(database, 'test/city'), jsonString);
}