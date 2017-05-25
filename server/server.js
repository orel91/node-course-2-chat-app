const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const {generateMessage, generateLocationMessage} = require("./utils/message");
const {isRealString} = require("./utils/validation");
const {Users} = require("./utils/users");

const publicPath = path.join(__dirname, "..", "public");
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app); // express calls this line behind the scene
const io = socketIO(server); // create a new socket.io server
const users = new Users();

app.use(express.static(publicPath));

io.on("connection", (socket) => {
    console.log("New user connected");

    //socket.emit is to send a message to the socket only
    // socket.emit("newMessage", {
    //     from: "Mich Mich",
    //     text: "Coucou bb",
    //     createdAt: 4567
    // });

    socket.on("join", (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback("Name and room name are required.");
        }

        socket.join(params.room);
        // socket.leave(params.room);

        // io.emit -> io.to("My room").emit
        // socket.broadcast.emit -> socket.broadcast.to("My room").emit
        // socket.emit

        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit("updateUserList", users.getUserList(params.room));
        socket.emit("newMessage", generateMessage("Admin", "Welcome to the chat app"));
        socket.broadcast.to(params.room).emit("newMessage", generateMessage("Admin", `${params.name} has joined`));

        callback();
    });

    socket.on("createMessage", (newMessage, callback) => {
        console.log("createMessage", newMessage);
        //io.emit is to send a message to everybody
        io.emit("newMessage", generateMessage(newMessage.from, newMessage.text));
        callback();
    });

    socket.on("createLocationMessage", (coords) => {
        io.emit("newLocationMessage", generateLocationMessage("Admin", coords.latitude, coords.longitude));
    });

    socket.on("disconnect", () => {
        var user = users.removeUser(socket.id);

        if(user) {
            io.to(user.room).emit("updateUserList", users.getUserList(user.room));
            io.to(user.room).emit("newMessage", generateMessage("Admin", `${user.name} has left.`));
        }
    });
});

// change app.listen to server.listen
server.listen(port, () => {
    console.log("Server launched on port", port);
});