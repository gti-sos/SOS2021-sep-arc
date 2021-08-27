var express = require("express");
var bodyParser = require("body-parser"); // F04
var schizophrenia_stats_api = require("./src/back/schizophrenia-stats/v1"); // M I L E S T O N E Nº 5
var schizophrenia_stats_api_v2 = require("./src/back/schizophrenia-stats/v2"); 
var port = (process.env.PORT || 10000);
var BASE_API_PATH = "/api/v1"; // F04
var BASE_API_PATH_v2 = "/api/v2"; // F10
var app = express();
app.use(bodyParser.json());
app.use(express.json());
schizophrenia_stats_api.register(app, BASE_API_PATH);
schizophrenia_stats_api_v2.register(app, BASE_API_PATH_v2);

var path = require("path");

var cors = require("cors");
var request = require("request");

app.use("/", express.static(path.join(__dirname, "public")));

app.use(cors());

app.listen(port, () => {
    console.log(`Server ready listening on ${port}`);
});
//INTEGRACIONES

app.use("/proxySchizophrenia", function(req, res) {
    var apiServerHost = "https://2021-sep-arc.herokuapp.com"
    
    console.log(`apiServerHost= <${apiServerHost}>`);
    console.log(`baseURL = <${req.baseUrl}>`);
    console.log(`url = <${req.url}>`);
    var url = apiServerHost + req.url;
    console.log(`piped: ${req.baseUrl}${req.url} -> ${url}`);
    req.pipe(request(url)).pipe(res);
    });