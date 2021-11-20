const bonus = require('./bonus');

test("check for equality =>", () => {
    expect({}).toEqual({});
});
test("check for equality =>", () => {
    expect([]).toEqual([])
});
test("check for equality =>", () => {
    expect([1, 2, 3]).toEqual([1, 2, 3])
});
test("check for equality =>", () => {
    expect({ a: 1, b: { c: 1, d: 2 } }).toEqual({ a: 1, b: { c: 1, d: 2 } })
});
test("check for equality =>", () => {
    expect([1, 2, [1, 2]]).toEqual([1, 2, [1, 2]])
});
test("check for equality =>", () => {
    expect({ a: 1, b: { c: 1, d: 2 } }).toEqual({ a: 1, b: { e: 1, d: 2 } })
});
test("check for equality =>", () => {
    expect(bonus({ a: 1, b: 2 })).toEqual({ a: 1, b: 2 });
});
test("check for equality =>", () => {
    expect([1, 2, [1, 3]]).toEqual([1, 2, [1, 2]])
});