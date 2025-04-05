import LetterInterface from "./LetterInterface";

interface PraiseInterface {
    id:number,
    title:string,
    tone:string,
    type:string,
    letters:LetterInterface[]
}

export default PraiseInterface;