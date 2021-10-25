const express = require("express");
const app = express();
const path = require("path");
const PORT = 8000;

app.get("/*(.js|.css|.md|.jpg|.png)", express.static("."));
app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname + "/index.html"));
});
console.log(`Server now listening on port ${PORT}`);
server = app.listen(PORT);