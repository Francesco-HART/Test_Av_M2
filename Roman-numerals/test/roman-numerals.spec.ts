import { beforeEach, describe, expect, test } from "vitest";

describe("Roman numerals", () => {
  beforeEach(() => {});

  test("0 is nothing", () => {
    expect(convertToRoman(0)).toBe("");
  });

  test("1 is I ", () => {
    expect(convertToRoman(1)).toBe("I");
  });
  test("2 is II", () => {
    expect(convertToRoman(2)).toBe("II");
  });

  test("3 is III", () => {
    expect(convertToRoman(3)).toBe("III");
  });

  test("4 is IV", () => {
    expect(convertToRoman(4)).toBe("IV");
  });

  test("5 is V", () => {
    expect(convertToRoman(5)).toBe("V");
  });

  test("6 is VI", () => {
    expect(convertToRoman(6)).toBe("VI");
  });

  test("7 is VII", () => {
    expect(convertToRoman(7)).toBe("VII");
  });
  test("9 is IX", () => {
    expect(convertToRoman(9)).toBe("IX");
  });
  test("10 is X", () => {
    expect(convertToRoman(10)).toBe("X");
  });

  test("12 is XII", () => {
    expect(convertToRoman(12)).toBe("XII");
  });

  test("13 is XIII", () => {
    expect(convertToRoman(13)).toBe("XIII");
  });

  test("15 is XV", () => {
    expect(convertToRoman(15)).toBe("XV");
  });

  test("16 is XVI", () => {
    expect(convertToRoman(16)).toBe("XVI");
  });

  test("17 is XVII", () => {
    expect(convertToRoman(17)).toBe("XVII");
  });

  test("20 is XX", () => {
    expect(convertToRoman(20)).toBe("XX");
  });

  test("25 is XXV", () => {
    expect(convertToRoman(25)).toBe("XXV");
  });

  test("40 is L", () => {
    expect(convertToRoman(40)).toBe("XL");
  });

  test("50 is L", () => {
    expect(convertToRoman(50)).toBe("L");
  });

  test("100 is C", () => {
    expect(convertToRoman(100)).toBe("C");
  });

  test("90 is XC", () => {
    expect(convertToRoman(90)).toBe("XC");
  });
});

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
