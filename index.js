var schizophrenia_stats_api = require("./schizophrenia_stats"); // M I L E S T O N E Nº 5
schizophrenia_stats_api.register(app, BASE_API_PATH);

var express = require("express");
var path = require("path");
var bodyParser = require("body-parser"); // F04

var BASE_API_PATH = "/api/v1"; // F04
var app = express();
var port = (process.env.PORT || 10000);

app.use(bodyParser.json());
app.use(express.json());
app.use("/", express.static(path.join(__dirname, "public")));
app.listen(port, () => {
    console.log(`Server ready listening on ${port}`);
});