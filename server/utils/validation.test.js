const expect = require("expect");

const {isRealString} = require("./validation");

describe("isRealString", () => {
    it("should reject non-string values", () => {
        const value = 1;
        const res = isRealString(value);
        expect(res).toBe(false);
    });

    it("should reject string with only spaces", () => {
        const value = "     ";
        const res = isRealString(value);
        expect(res).toBe(false);
    });

    it("should allow string with non-space characters", () => {
        const value = "  my value  ";
        const res = isRealString(value);
        expect(res).toBe(true);
    });
});