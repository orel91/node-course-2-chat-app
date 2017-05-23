const expect = require("expect");

const {generateMessage, generateLocationMessage} = require("./message");

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

describe("generateLocationMessage", () => {
    it("should generate correct location object", () => {
        const latitude = 1;
        const longitude = 4;
        const from = "Robert";
        const url = "https://www.google.com/maps?q=1,4";

        const message = generateLocationMessage(from, latitude, longitude);

        expect(message).toInclude({from, url});
        expect(message.createdAt).toBeA("number");
    });
});