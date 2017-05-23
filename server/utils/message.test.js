const expect = require("expect");

const {generateMessage} = require("./message");

describe("generateMessage", () => {
    it("should generate correct message object", () => {
        const message = {
            from: "Michel",
            text: "Hello there"
        };

        const generatedMessage = generateMessage(message.from, message.text);

        expect(generatedMessage.from).toBe(message.from);
        expect(generatedMessage.text).toBe(message.text);
        expect(generatedMessage.createdAt).toBeA("number");
    });
});