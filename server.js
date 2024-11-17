const express = require("express");
const path = require("path");
const app = express();

app.get("/login.html", (req, res) => {
    res.sendFile(path.join(__dirname + "/login.html"));
})

app.get("/linkWallet.html", (req, res) => {
    res.sendFile(path.join(__dirname + "/linkWallet.html"));
})

app.get("/subscription.html", (req, res) => {
    res.sendFile(path.join(__dirname + "/subscription.html"));
})


app.get("/search.html", (req, res) => {
    res.sendFile(path.join(__dirname + "/search.html"));
})

app.get("/scan.html", (req, res) => {
    res.sendFile(path.join(__dirname + "/scan.html"));
})

app.get("/segment.html", (req, res) => {
    res.sendFile(path.join(__dirname + "/segment.html"));
})

app.get("/detail.html", (req, res) => {
    res.sendFile(path.join(__dirname + "/detail.html"));
})

app.get("/logout.html", (req, res) => {
    res.sendFile(path.join(__dirname + "/logout.html"));
})



app.get("/css/saino.css", (req, res) => {
    res.type('.css');
    res.sendFile(path.join(__dirname + "/css/saino.css"));
})


app.get("/css/styles1.css", (req, res) => {
    res.type('.css');
    res.sendFile(path.join(__dirname + "/css/styles1.css"));
})

app.get("/css/styles2.css", (req, res) => {
    res.type('.css');
    res.sendFile(path.join(__dirname + "/css/styles2.css"));
})

app.get("/scripts.js", (req, res) => {
    res.type('.js');
    res.sendFile(path.join(__dirname + "/scripts.js"));
})

const server = app.listen(5000);
const portNumber = server.address().port;
console.log(`port is open on ${portNumber}`);

app.get("/contract.js", (req, res) => {
    res.type('.js');
    res.sendFile(path.join(__dirname + "/contract.js"));
})