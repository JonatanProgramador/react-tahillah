import LetterInterface from "./LetterInterface";

interface PraiseInterface {
    _id:string,
    title:string,
    tone:string,
    type:string,
    author:string,
    track:string,
    letters:LetterInterface[]
}

export default PraiseInterface;