import LetterInterface from "../interface/LetterInterface";

class LettersModel {

    static createLetter(letter:LetterInterface, letters:LetterInterface[]) {
        letter.id = letters.length + 1;
        const arraySummary = letter.letter.split(" ");
        letter.summary = "";
        for (let i = 0; i < 5 && i < arraySummary.length; ++i) {
            letter.summary = letter.summary + arraySummary[i] + " ";
        }
        letters.push(letter);
        return letters;
    }

    static deleteLetter(id: number, letters:LetterInterface[]) {
        const newLetters = letters.filter((letter) => letter.id !== id);
        for (let i = 0; i < newLetters.length; ++i) {
            newLetters[i].id = i + 1;
        }
        letters = newLetters;
        return letters
    }

    static editLetter(letter: LetterInterface, letters:LetterInterface[]) {
        letter.summary = "";
        const arraySummary = letter.letter.split(" ");
        for (let i = 0; i < 5 && i < arraySummary.length; ++i) {
            letter.summary = letter.summary + arraySummary[i] + " ";
        }
        const newLetters = letters.map((le) => le.id === letter.id ? letter : le);
        letters = newLetters;
        return letters;
    }
}

export default LettersModel;