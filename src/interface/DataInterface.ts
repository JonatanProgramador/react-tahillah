import LettersInterface from "./LettersInterface";

interface DataInterface {
    id:number,
    title:string,
    tone:string,
    type:string,
    letters:LettersInterface[]
}

export default DataInterface;