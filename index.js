var express = require("express");
var bodyParser = require("body-parser"); // F04
var schizophrenia_stats_api = require(".src/back/schizophrenia-stats"); // M I L E S T O N E Nº 5
var port = (process.env.PORT || 10000);
var BASE_API_PATH = "/api/v1"; // F04
var app = express();
app.use(bodyParser.json());
app.use(express.json());
schizophrenia_stats_api.register(app, BASE_API_PATH);

var path = require("path");

app.use("/", express.static(path.join(__dirname, "public")));

app.listen(port, () => {
    console.log(`Server ready listening on ${port}`);
});