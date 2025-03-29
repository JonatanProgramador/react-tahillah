import LettersInterface from "../interface/LettersInterface";

class LettersModel {

    private letters: LettersInterface[];
    

    constructor() {
        this.letters = [];
    }

    getLetters() { return this.letters }

    createLetter(letter: LettersInterface) {
        letter.id = this.letters.length + 1;
        const arraySummary = letter.letter.split(" ");
        letter.summary = "";
        for (let i = 0; i < 5 && i < arraySummary.length; ++i) {
            letter.summary = letter.summary + arraySummary[i] + " ";
        }
        this.letters.push(letter);
    }

    deleteLetter(id: number) {
        const newLetters = this.letters.filter((letter) => letter.id !== id);
        for (let i = 0; i < newLetters.length; ++i) {
            newLetters[i].id = i + 1;
        }
        this.letters = newLetters;
    }

     editLetter(letter: LettersInterface) {
        letter.summary = "";
        const arraySummary = letter.letter.split(" ");
        for (let i = 0; i < 5 && i < arraySummary.length; ++i) {
            letter.summary = letter.summary + arraySummary[i] + " ";
        }
        const newLetters = this.letters.map((le) => le.id === letter.id ? letter : le);
        this.letters = newLetters;
    }
}

export default LettersModel;