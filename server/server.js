const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "..", "public");
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app); // express calls this line behind the scene
const io = socketIO(server); // create a new socket.io server

app.use(express.static(publicPath));

io.on("connection", (socket) => {
    console.log("New user connected");

    //socket.emit is to send a message to the socket only
    // socket.emit("newMessage", {
    //     from: "Mich Mich",
    //     text: "Coucou bb",
    //     createdAt: 4567
    // });

    socket.on("createMessage", (newMessage) => {
        console.log("createMessage", newMessage);
        //io.emit is to send a message to everybody
        io.emit("newMessage", {
            from: newMessage.from,
            text: newMessage.text,
            createdAt: new Date().getTime()
        });
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

// change app.listen to server.listen
server.listen(port, () => {
    console.log("Server launched on port", port);
});