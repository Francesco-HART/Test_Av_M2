export const fizzbuzz = (n: number): string => {
    const content = includes(n) + multiple(n)
    return content || n.toString()
}

const multiple = (n: number): string => {
    if (isMultipleOf(n, 15)) return "FizzBuzz"
    if (isMultipleOf(n, 3)) return "Fizz"
    if (isMultipleOf(n, 5)) return "Buzz"
    return ""
}

const includes = (n: number): string => {
    if (isIncluded(n, 3) && isIncluded(n, 5)) return "FizzBuzz"
    if (isIncluded(n, 3)) return "Fizz"
    if (isIncluded(n, 5)) return "Buzz"
    return ""
}

const isMultipleOf = (n: number, m: number): boolean => n % m === 0

const isIncluded = (n: number, m: number): boolean => n.toString().includes(m.toString())
