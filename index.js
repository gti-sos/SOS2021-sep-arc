var express = require("express");
var bodyParser = require("body-parser"); // F04
var schizophrenia_stats_api = require("./src/back/schizophrenia-stats/v1"); // M I L E S T O N E Nº 5
var schizophrenia_stats_api_v2 = require("./src/back/schizophrenia-stats/v2"); 
var port = (process.env.PORT || 10000);
var BASE_API_PATH = "/api/v1"; // F04
var BASE_API_PATH_v2 = "/api/v2"; // F10
var app = express();
var path = require("path");
var cors = require("cors");
app.use(bodyParser.json());
var request = require("request");
app.use(express.json());
app.use(cors());

//MILESTONE Nº5
schizophrenia_stats_api.register(app, BASE_API_PATH);
schizophrenia_stats_api_v2.register(app, BASE_API_PATH_v2);

//D03

var schizophrenia_stats_api_INT = require("./src/back/schizophrenia-stats/integration");
schizophrenia_stats_api_INT.register(app, "/api/integration");

app.use("/", express.static(path.join(__dirname, "public")));


app.listen(port, () => {
    console.log(`Server ready listening on ${port}`);
});