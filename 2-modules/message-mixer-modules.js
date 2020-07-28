//     module.exports exports the module for use in another program.
//     require() imports the module for use in the current program.
//     ES6 introduced a more flexible, easier syntax to export modules:
//     default exports use export default to export JavaScript objects, functions, and primitive data types.
//     named exports use the export keyword to export data in variables.
//     named exports can be aliased with the as keyword.
//     import is a keyword that imports any object, function, or data type.

let MessageMixer = {};
const countCharacter = (inputString, inputCharacter) => {
  let count = 0;
  let string = inputString.toLowerCase();
  let character = inputCharacter.toLowerCase();
  for (let i = 0; i < string.length; i++) {
    if (string[i] === character) {
      count++;
    }
  }
  return count;
};

const capitalizeFirstCharacterOfWords = (string) => {
  let arr = string.split(' ');
  for (let i = 0; i < arr.length; i++) {
    let word = arr[i];
    arr[i] = word[0].toUpperCase() + word.substring(1);
  }
  return arr.join(' ');
};

const reverseWord = (word) => {
  return word.split('').reverse().join('');
};

const reverseAllWords = (sentence) => {
  let words = sentence.split(' ');
  for (let i = 0; i < words.length; i++) {
    words[i] = reverseWord(words[i]);
  }
  return words.join(' ');
};

const replaceFirstOccurrence = (string, toBeReplaced, replaceWith) => {
  return string.replace(toBeReplaced, replaceWith);
};

const replaceAllOccurrences = (string, toBeReplaced, replaceWith) => {
  return string.split(toBeReplaced).join(replaceWith);
};

const encode = (string) => {
  let replacementObject = { a: '@', s: '$', i: '!', o: '0' };
  for (let key in replacementObject) {
    string = replaceAllOccurrences(string, key, replacementObject[key]);
  }
  return string;
};

const palindrome = (str) => {
  return str + ' ' + reverseWord(str);
};

const pigLatin = (sentence, character) => {
  return sentence.split(' ').join(character + ' ');
};
export {
  countCharacter,
  capitalizeFirstCharacterOfWords,
  reverseWord,
  reverseAllWords,
  replaceFirstOccurrence,
  replaceAllOccurrences,
  encode,
  palindrome,
  pigLatin,
};
