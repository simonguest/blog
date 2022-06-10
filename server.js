const express = require("express");
const app = express();
const PORT = 8000;

app.get("/*", express.static("./dist", {
    setHeaders: res => {
        const hasExtension = /(\/.*\.)/.exec(res.req.url);
        if (hasExtension === null) {
            return res.setHeader('content-type', 'text/html');
        }
    }
}));
console.log(`Server now listening on port ${PORT}`);
server = app.listen(PORT);