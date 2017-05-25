const expect = require("expect");

const {Users} = require("./users");

describe("Users", () => {

    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [
            {id: "1", name: "Aurelien", room: "My first room"},
            {id: "2", name:"Robert", room: "My first room"},
            {id: "3", name: "Michel", room: "My second room"}
        ];
    });

    it("should add new user", () => {
        var users = new Users();
        var user = {
            id: "123",
            name: "Aurelien",
            room: "My room"
        };

        var resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });

    it("should remove a user", () => {
        const userId = "1";
        var removedUser = users.removeUser(userId);

        expect(removedUser.id).toBe(userId);
        expect(users.users.length).toEqual(2);
    });

    it("should not remove a user", () => {
        var removedUser = users.removeUser("123");

        expect(removedUser).toNotExist();
        expect(users.users.length).toEqual(3);
    });

    it("should find a user", () => {
        const userId = "2";
        var resUser = users.getUser(userId);
        
        expect(resUser.id).toBe (userId);
    });

    it("should not find a user", () => {
        var resUser = users.getUser("123");
        
        expect(resUser).toNotExist();
    });

    it("should return names for my first room", () => {
        var userList = users.getUserList("My first room");

        expect(userList).toEqual(["Aurelien", "Robert"]);
    });

    it("should return names for my second room", () => {
        var userList = users.getUserList("My second room");

        expect(userList).toEqual(["Michel"]);
    });
});