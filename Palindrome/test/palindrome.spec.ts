import { palindrome } from "@/palindrome";
import { describe, expect, test } from "vitest";

describe("Palindrome", () => {
  test("Verify word", () => {
    expect(palindrome("")).toEqual([]);
    expect(palindrome("AA")).toEqual(["AA"]);
    expect(palindrome("A")).toEqual([]);
    expect(palindrome("AB")).toEqual([]);
    expect(palindrome("ABA")).toEqual(["ABA"]); //refacto
    expect(palindrome("ABBA")).toEqual(["ABBA"]);
    expect(palindrome("kayak")).toEqual(["kayak"]);
  });

  test("Verify sentence", () => {
    expect(palindrome("aa bb")).toEqual(["aa", "bb"]);
  });
});
