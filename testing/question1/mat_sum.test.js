const sumMatrix = require('./mat_sum');
test('add mat 1 to mat2', () => {
    expect(sumMatrix(2, 2, [[1, 2], [1, 2]], [[2, 2], [2, 2]])).toEqual([[3, 4], [3, 4]]);
    expect(sumMatrix(3, 1, [[1], [2], [3]], [[-1], [-2], [-3]])).toEqual([[0], [0], [0]]);
    expect(sumMatrix(1, 1, [[1]], [[20000]])).toEqual([[20001]]);
});
test('add mat 1 to mat2', () => {
    expect(sumMatrix(3, 1, [[1], [2], [3]], [[-1], [-2], [-3]])).toEqual([[0], [0], [0]]);
});
test('add mat 1 to mat2', () => {
    expect(sumMatrix(1, 1, [[1]], [[20000]])).toEqual([[20001]]);
});