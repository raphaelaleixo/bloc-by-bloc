import { instanceToPlain } from "class-transformer"
import { ref, set } from "firebase/database";
import database from "./firebase.api";
import Police from "../police";


export const savePolice = (police: Police) => {
    const jsonString = JSON.stringify(instanceToPlain(police));
    set(ref(database, 'test/police'), jsonString);
}