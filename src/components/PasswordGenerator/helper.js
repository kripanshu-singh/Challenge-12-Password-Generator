import { wordArray } from "./constant";

function randomizeWord(inputWord) {
    let result = "";
    for (let char of inputWord) {
        const lowerChar = char.toLowerCase();
        if (wordArray[lowerChar]) {
            const randomReplacement =
                wordArray[lowerChar][
                    Math.floor(Math.random() * wordArray[lowerChar].length)
                ];
            result += randomReplacement;
        } else {
            result += char;
        }
    }
    return result;
}

const generatePassword = ({
    includeNumbers = false,
    includeSpecialChars = false,
    isUppercase = true,
    isLowercase = true,
    passwordLength = 8,
    inputWord = "",
}) => {
    const wordLength = inputWord.length;
    const length = passwordLength - wordLength;
    let word = inputWord.replace(/\s+/g, () =>
        Math.random() < 0.5 ? "-" : "_"
    );
    let password = "";
    let charSet = "QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuioplkjhgfdsazxcvbnm";

    if (includeNumbers) charSet += "1234567890";
    if (includeSpecialChars) {
        const specialChars = "!@#$%^&*()-_=+[]{}|;:,.<>/?";
        charSet += specialChars;
        word = randomizeWord(word);
    }

    const charSetLength = charSet.length;

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charSetLength);
        password += charSet.charAt(randomIndex);
    }

    if (wordLength) {
        for (let i = 0; i < wordLength / 2; i++) {
            const randomIndex = Math.floor(Math.random() * wordLength);
            const charToReplace = word[randomIndex];
            word =
                word.substring(0, randomIndex) +
                charToReplace.toUpperCase() +
                word.substring(randomIndex + 1);
        }
    }

    const insertIndex = Math.floor(Math.random() * password.length);
    password =
        password.substring(0, insertIndex) +
        word +
        password.substring(insertIndex);

    if (isUppercase && !isLowercase) {
        password = password.toUpperCase();
    }
    if (isLowercase && !isUppercase) {
        password = password.toLowerCase();
    }

    return password;
};

export default generatePassword;