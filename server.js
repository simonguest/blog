const express = require("express");
const app = express();
const PORT = 8000;

app.get("/*", express.static("./dist"));
console.log(`Server now listening on port ${PORT}`);
server = app.listen(PORT);