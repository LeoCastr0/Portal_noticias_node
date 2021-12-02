const express = require("express")
const consign = require("consign")
const bodyParser = require("body-parser")
const expressValidator = require("express-validator")

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(expressValidator())

app.use(express.static("./app/public"))
app.set("view engine", "ejs")
app.set("views", "./app/views")

consign()
    .include("app/routes")
    .then("config/dbConnection.js")
    .then("app/models")
    .then("app/controllers")
    .into(app)

module.exports = app
