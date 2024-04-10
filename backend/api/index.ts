const express = require("express");
const app = express();
const port = 8085;

app.get("/", (req, res) => res.send("Express on Vercel"));
app.get("/test", (req, res) => res.json({hello: 'hello world!'}));

app.listen(port, () => console.log("Server ready on port " + port));

module.exports = app;


// C:\Users\Luke\AppData\Roaming\npm\vercel.ps1 dev  