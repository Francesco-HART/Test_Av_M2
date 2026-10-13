import { fizzbuzz } from "@/fizzbuzz";
import { describe, expect, test } from "vitest";

describe("FizzBuzz", () => {
  describe("Stage 1", () => {
    test("should return 1 for 1", () => {
      expect(fizzbuzz(1)).toBe("1");
    });

    test("should return 2 for 2", () => {
      expect(fizzbuzz(2)).toBe("2");
    });

    test("should return Fizz for 6", () => {
      expect(fizzbuzz(6)).toBe("Fizz");
    });

    test("should return Buzz for 10", () => {
      expect(fizzbuzz(10)).toBe("Buzz");
    });

    test("should return FizzBuzz for 60", () => {
      expect(fizzbuzz(60)).toBe("FizzBuzz");
    });
  });

  describe("Stage 2", () => {
    test("should return Fizz for 13", () => {
      expect(fizzbuzz(13)).toBe("Fizz");
    });

    test("should return Fizz for 31", () => {
      expect(fizzbuzz(31)).toBe("Fizz");
    });

    test("should return Fizz for 131", () => {
      expect(fizzbuzz(131)).toBe("Fizz");
    });

    test("should return Buzz for 52", () => {
      expect(fizzbuzz(52)).toBe("Buzz");
    });

    test("should return FizzBuzz for 53", () => {
      expect(fizzbuzz(53)).toBe("FizzBuzz");
    });

    test("should return FizzBuzzBuzz for 35", () => {
      expect(fizzbuzz(35)).toBe("FizzBuzzBuzz");
    });
  });
});
