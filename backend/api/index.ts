const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Express on Vercel"));
app.get("/test", (req, res) => res.json({hello: 'hello world!'}));

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;


// C:\Users\Luke\AppData\Roaming\npm\vercel.ps1