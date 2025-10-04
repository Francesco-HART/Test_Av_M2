const convertToRoman = (num: number): string => {
  const values = [
    { value: 1000, numeral: "M" },
    { value: 900, numeral: "CM" },
    { value: 500, numeral: "D" },
    { value: 400, numeral: "CD" },
    { value: 100, numeral: "C" },
    { value: 90, numeral: "XC" },
    { value: 50, numeral: "L" },
    { value: 40, numeral: "XL" },
    { value: 10, numeral: "X" },
    { value: 9, numeral: "IX" },
    { value: 5, numeral: "V" },
    { value: 4, numeral: "IV" },
    { value: 1, numeral: "I" },
  ];

  let result = "";

  for (const { value, numeral } of values) {
    while (num >= value) {
      result += numeral;
      num -= value;
    }
  }

  return result;
};

const record = {
  100: "C",
  // 90: "XC",
  50: "L",
  // 40: "XL",
  10: "X",
  // 9: "IX",
  5: "V",

  1: "I",
  // 4: "IV",
};
