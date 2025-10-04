export const palindrome = (sentence: string): string[] => {
  let words = sentence.split(" ");
  return words.filter((word) => {
    return word && word.length > 1 && word === [...word].reverse().join("");
  });

  return words.filter((word) => {
    for (let i = 0; i < word.length; i++) {
      if (word[i] !== word[word.length - 1 - i]) return false;
    }
    return word && word.length > 1 ? true : false;
  });
};
