const validator = require('./validator');

test('valid or not', () => {
    expect(validator("Hello@123")).toBe("valid");
});
test('valid or not', () => {
    expect(validator("pawanH@123")).toBe("valid");
});
test('valid or not', () => {
    expect(validator("@!@#123As")).toBe("valid");
});
test('valid or not', () => {
    expect(validator("hello@123")).toBe("valid");
});
test('valid or not', () => {
    expect(validator("Hello@222")).toBe("valid");
});
test('valid or not', () => {
    expect(validator("hePlo@123")).toBe("valid");
});
test('valid or not', () => {
    expect(validator("hell))@123")).toBe("valid");
});
test('valid or not', () => {
    expect(validator("heLLlo@123")).toBe("valid");
});
test('valid or not', () => {
    expect(validator("hello@1553")).toBe("valid");
});
test('valid or not', () => {
    expect(validator("hello#123")).toBe("valid");
});