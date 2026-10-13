import { palindrome } from "@/palindrome";
import { describe, expect, test } from "vitest";

describe("Palindrome", () => {
  test("Should return empty array", () => {
    expect(palindrome("")).toEqual([]);
  });

  test("Should return a palindrome", () => {
    expect(palindrome("AA")).toEqual(["AA"]);
  });

  test("One letter is not a palindrome", () => {
    expect(palindrome("A")).toEqual([]);
  });

  test("One letter is not a palindrome", () => {
    expect(palindrome("AB")).toEqual([]);
  });

  test("One letter is not a palindrome", () => {
    expect(palindrome("ABCA")).toEqual([]);
  });

  test("One letter is not a palindrome", () => {
    expect(palindromeSentence("AA BB")).toEqual(["AA", "BB"]);
  });
});

function palindrome(n: string) {
  if (n.length <= 1) return [];
  const reversed = n.split("").reverse().join("");
  if (n === reversed) return [n];
  // if (n[0] === n[n.length - 1] && n[1] === n[n.length - 2]) return [n]; // refacto test 4
  return [];
}

function palindromeSentence(n: string): string[] {
  return n
    .split(" ")
    .map((word) => {
      if (word.length <= 1) return null;
      const reversed = word.split("").reverse().join("");
      return word === reversed ? word : null;
    })
    .filter((word): word is string => word !== null);
}
