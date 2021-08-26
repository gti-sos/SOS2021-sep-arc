var express = require("express");
var path = require("path");
var bodyParser = require("body-parser"); // F04
var BASE_API_PATH = "/api/v1"; // F04
var app = express();

app.use(bodyParser.json());
app.use(express.json());
var Datastore = require("nedb");
var datafile = path.join(__dirname, 'schizophrenia-stats.db');
var db = new Datastore({ filename: datafile, autoload: true });
var schizophrenia_stats_data = [];

module.exports.register = (app, BASE_API_PATH) => {
    //var cool =  require("cool-ascii-faces");

    var schizophrenia_stats_data = []
    
    app.get(BASE_API_PATH + "/schizophrenia-stats/loadInitialData", (req, res) => {
        schizophrenia_stats_data = [
            {
                "country": 'Andalucia',
                "year": 2008,
                "schizophrenia_men": 2.37,
                "schizophrenia_women": 1.59,
                "schizophrenia_population":1.98
            },
            {
                "country": 'Aragon',
                "year": 2008,
                "schizophrenia_men": 2.14,
                "schizophrenia_women": 1.09,
                "schizophrenia_population": 1.62
            },
            {
                "country": 'Asturias',
                "year": 2008,
                "schizophrenia_men": 3.04,
                "schizophrenia_women": 1.75,
                "schizophrenia_population":2.54
            },
            {
                "country": 'Baleares',
                "year": 2008,
                "schizophrenia_men": 1.39,
                "schizophrenia_women": 1.45,
                "schizophrenia_population": 1.42
            },
            {
                "country": 'Canarias',
                "year": 2008,
                "schizophrenia_men": 5.46,
                "schizophrenia_women": 2.00,
                "schizophrenia_population": 3.73
            },
            {
                "country": 'Cantabria',
                "year": 2008,
                "schizophrenia_men": 3.18,
                "schizophrenia_women": 2.43,
                "schizophrenia_population": 2.80
            }
       ];
       
     //  console.log(`Loaded Initial Data: <${JSON.stringify(schizophrenia_stats_data, null, 2)}>`);
      // return res.sendStatus(200);
    
      db.find({ $or: [{ country: "Andalucia" }, { country: "Aragon" }] }, { _id: 0 }, function (err, data) {
        if (err) {
            console.error("ERROR accesing DB in GET");
            res.sendStatus(500);
        } else {
            if (data.length == 0) {
                db.insert(schizophrenia_stats_data);
                console.log(`Loaded initial data: <${JSON.stringify(schizophrenia_stats_data, null, 2)}>`);
                res.sendStatus(201);
            } else {
                console.error(`initial data already exists`);
                res.sendStatus(409);
            }
        }
    });
    })
    app.get(BASE_API_PATH + "/schizophrenia-stats", (req,res)=>{
    
        var query = req.query;
    
    //Aquí se obtienen offset y limit con query, si son null, le hacemos un delete.
    var limit = parseInt(query.limit);
    var offset = parseInt(query.offset);
    
    //offset y limit.
    delete query.offset;
    delete query.limit;
    
    //Parseamos el año a Integer, mis otras 3 propiedades numéricas también son necesarias.
    if (query.hasOwnProperty("year")) {
        query.year = parseInt(query.year);
        console.log(query.year);
    }
    if (query.hasOwnProperty("schizophrenia_women")) {
        query.schizophrenia_women = parseFloat(query.schizophrenia_women);
        console.log(query.schizophrenia_women);
    }
    if (query.hasOwnProperty("schizophrenia_men")) {
        query.schizophrenia_men = parseFloat(query.schizophrenia_men);
        console.log(query.schizophrenia_men);
    }
    if (query.hasOwnProperty("schizophrenia_population")) {
        query.schizophrenia_population = parseFloat(query.schizophrenia_population);
        console.log(query.schizophrenia_population);
    }
    
    console.log(query);
    
    db.find(query).skip(offset).limit(limit).exec((error, schizophrenia_stats) => {
        schizophrenia_stats.forEach((n) => {
            delete n._id;
        });
    
        if (schizophrenia_stats.length < 0) {
            res.sendStatus(400, "Bad request");
            console.log("Requested data is INVALID");
        }
        else {
            res.send(JSON.stringify(schizophrenia_stats, null, 2));
            console.log("Data sent:" + JSON.stringify(schizophrenia_stats, null, 2));
    
        }
    });
    });
    
    
     app.post(BASE_API_PATH + "/schizophrenia-stats", (req, res) => {
        var data = req.body;
        var country = req.body.country;
        var year = req.body.year;
    
        db.find({ "country": country, "year": year }).exec((error, schizophrenia_stats) => {
            if (schizophrenia_stats.length > 0) {
                res.sendStatus(409);
                console.log("There's an object with those primary keys");
                return;
            }
            if ((data == null)
                    || (data.country == null)
                    || (data.year == null)
                    || (data.schizophrenia_men == null)
                    || (data.schizophrenia_women == null)
                    || (data.schizophrenia_population == null)
                    || ((Object.keys(data).length != 5))) {
    
                    res.sendStatus(400, "Falta uno o más campos");
                    console.log(data);
                    console.log("POST not created");
                    return;
                }
                db.insert(data);
    
                res.sendStatus(201, "Post created");
                console.log(JSON.stringify(data, null, 2));
            });
    });
    
    app.get(BASE_API_PATH + "/schizophrenia-stats/:country/:year", (req, res) => {
       var country = req.params.country;
       var year = parseInt(req.params.year);
       db.find({ "country": country, "year": year }).exec((err, param) => {
        if (param.length == 1) {
            delete param[0]._id;
      res.send(JSON.stringify(param[0], null, 2));
      console.log("/GET - Recurso Específico /country/year: " + JSON.stringify(param[0]), null, 2);
    }
    else {
      res.sendStatus(404, "Not found");
    }
    });
    
    });
    
    
    app.delete(BASE_API_PATH + "/schizophrenia-stats/:country/:year", (req, res) => {
        var country = req.params.country;
        var year = parseInt(req.params.year);
               db.remove({ "country": country, "year": year }, { multi: true }, (err, paramsDeleted) => {
                if (paramsDeleted == 0) {
                    res.sendStatus(404, "Not found");
           }
       else {
        res.sendStatus(200);
    }
    });
    });
    
    
    app.put(BASE_API_PATH + "/schizophrenia-stats/:country/:year", (req, res) => {
     
               var countryData = req.params.country; //Pillar el contenido después de los dos puntos.
               var countryD = req.body.country;
       
               var yearData = parseInt(req.params.year);
               var yearD = parseInt(req.body.year);
       
               var body = req.body;
               if (countryData != countryD || yearData != yearD) {
                   res.sendStatus(409);
                   console.warn("There is a conflict!");
           }
           else {
            db.update({ "country": countryData, "year": yearData }, body, (err, paramsUpdated) => {
                if (paramsUpdated == 0) {
                    res.sendStatus(404, "Not found");
                }
                else {
                    res.sendStatus(200);
                    console.log("PUT Correcto");
                }
            });
        }
    });
    
    
    app.post(BASE_API_PATH + "/schizophrenia-stats/:country/:date", (req, res) => {
       console.log("POST no valido/encontrado");
       return res.sendStatus(405);
    
    });
    
    
    app.put(BASE_API_PATH + "/schizophrenia-stats", (req, res) => {
       console.log("PUT no valido/encontrado");
       return res.sendStatus(405);
    
    });
    
    
    app.delete(BASE_API_PATH + "/schizophrenia-stats", (req, res) => { 
       db.remove({}, { multi: true }, (error, schizophrenia_stats_deleted) => {
        console.log(schizophrenia_stats_deleted + " schizophrenia_stats deleted");
    });
    res.sendStatus(200, "OK");
    
    });
    
    };