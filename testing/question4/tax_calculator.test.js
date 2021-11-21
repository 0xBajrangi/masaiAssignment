const tax = require('./tax_calculator')

test("tax to be paid", () => {
    expect(tax(10000, 20000)).toBe("No tax");
});
test("tax to be paid", () => {
    expect(tax(30000, 20000)).toBe("No tax");
});
test("tax to be paid", () => {
    expect(tax(40000, 70000)).toBe("No tax");
});
test("tax to be paid", () => {
    expect(tax(500000, 20000)).toBe(102800);
});
test("tax to be paid", () => {
    expect(tax(600000, 200000)).toBe(150000);
});
test("tax to be paid", () => {
    expect(tax(700000, 700000)).toBe(405000);
});
test("tax to be paid", () => {
    expect(tax(800000, 20000)).toBe(162800);
});
test("tax to be paid", () => {
    expect(tax(9000000, 700000)).toBe(2895000);
});
