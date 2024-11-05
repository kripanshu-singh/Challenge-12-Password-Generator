import { wordArray } from "./constant";

export function randomizeWord(word) {
    let result = "";
    for (let char of word) {
        let lowerChar = char.toLowerCase();
        if (wordArray[lowerChar]) {
            let randomReplacement =
                wordArray[lowerChar][
                    Math.floor(Math.random() * wordArray[lowerChar]?.length)
                ];
            result += randomReplacement;
        } else {
            result += char;
        }
    }
    return result;
}

export const generator = ({
    isNum = false,
    isChar = false,
    length,
    selectedValue,
    word,
}) => {
    length -= word.length;
    word = word.replace(/\s+/g, "");

    let pass = "";
    let string = "QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuioplkjhgfdsazxcvbnm";

    if (isNum) string += "1234567890";
    if (isChar) {
        word = randomizeWord(word);
        string += "!@#$%^&*()-_=+[]{}|;:,.<>?";
    }

    let len = string.length;

    for (let i = 0; i < length; i++) {
        let random = Math.floor(Math.random() * len);
        pass += string.charAt(random);
    }

    if (word.length) {
        for (let i = 0; i < word.length / 2; i++) {
            let ranNum = Math.floor(Math.random() * word.length);
            let charToReplace = word[ranNum];
            word =
                word.substring(0, ranNum) +
                charToReplace.toUpperCase() +
                word.substring(ranNum + 1);
        }
    }

    let ranPassWord = Math.floor(Math.random() * pass.length);
    pass = pass.substring(0, ranPassWord) + word + pass.substring(ranPassWord);

    if (selectedValue === "option2") {
        pass = pass.toUpperCase();
    } else if (selectedValue === "option3") {
        pass = pass.toLowerCase();
    }

    return pass;
};
