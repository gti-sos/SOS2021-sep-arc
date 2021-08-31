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

//Integración Interna G24

var pathEmployment='/api/v2/children-employment';
var apiServerHostEmployment= 'https://sos2021-24.herokuapp.com/';

app.use(pathEmployment, function(req, res) {
  var url = apiServerHostEmployment + req.url;
  console.log('piped: ' + req.url);
  req.pipe(request(url)).pipe(res);
});

//Integración Interna G24
var pathVIH='/api/v2/children-with';
var apiServerHostVIH= 'https://sos2021-24.herokuapp.com/';

app.use(pathVIH, function(req, res) {
  var url = apiServerHostVIH + req.url;
  console.log('piped: ' + req.url);
  req.pipe(request(url)).pipe(res);
});



//Integración Externa COVID-19
var pathCOVID='/v3/covid-19/states';
var apiServerHostCOVID= 'https://disease.sh';

app.use(pathCOVID, function(req, res) {
  var url = apiServerHostCOVID + req.url;
  console.log('piped: ' + req.url);
  req.pipe(request(url)).pipe(res);
});

app.listen(port, () => {
  console.log(`Server ready listening on ${port}`);
});

