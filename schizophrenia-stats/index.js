var express = require("express");
var path = require("path");
var bodyParser = require("body-parser"); // F04
var BASE_API_PATH = "/api/v1"; // F04
var app = express();

app.use(bodyParser.json());
app.use(express.json());

module.exports.register = (app, BASE_API_PATH) => {
    //var cool =  require("cool-ascii-faces");

/*
//BASE DE DATOS 
app.get(BASE_API_PATH + "/info/schizophrenia_stats", (request,response)=>{

        response.send(`<!DOCTYPE html>
                    <html>
                        <head>
                            <title>schizophrenia_stats</title>
                            <style>
                                table, tr, td, th {
                                    border: 1px solid black;
                                    border-collapse: collapse;
                                }
                                tr, td {
                                    padding: 5px;
                                    text-align: center;    
                                }
                            </style>
                        </head>
                        <body>
                            <h3>Esquizofrenia - Datos en las comunidades autónomas de España</h3>
                             </br>
                             <table class="default" style="width:100%">
                            <tr>
                                <th>country</th>
                                <th>year</th>
                                <th>schizophrenia_men</th>
                                <th>schizophrenia_women</th>
                                <th>schizophrenia_population</th>
                            </tr>
                            <tr>
                                <td>Andalucia</td>
                                <td>2008</td>
                                <td>2,37</td>
                                <td>1,59</td>
                                <td>1,98</td>
                            </tr>
                            <tr>
                                <td>Aragón</td>
                                <td>2008</td>
                                <td>2,14</td>
                                <td>1,09</td>
                                <td>1,62</td>
                            </tr>
                            <tr>
                                <td>Asturias</td>
                                <td>2008</td>
                                <td>3,04</td>
                                <td>1,75</td>
                                <td>2,54</td>
                            </tr>
                            <tr>
                                <td>Baleares</td>
                                <td>2008</td>
                                <td>1,39</td>
                                <td>1,45</td>
                                <td>1,42</td>
                            </tr>
                            <tr>
                                <td>Canarias</td>
                                <td>2008</td>
                                <td>5,46</td>
                                <td>2,00</td>
                                <td>3,73</td>
                            </tr>
                            <tr>
                                <td>Cantabria</td>
                                <td>2008</td>
                                <td>3,18</td>
                                <td>2,43</td>
                                <td>2,80</td>
                            </tr>
                            </table>
                        </body>
                        </html>`
                        );
    
    });	 */

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
    
        console.log(`Loaded Initial Data: <${JSON.stringify(schizophrenia_stats_data, null, 2)}>`);
        return res.sendStatus(200);
    });

// 6.1 GET a la lista de recursos (p.e. “/api/v1/stats”) devuelve una lista con todos los recursos (un array de objetos en JSON)
    app.get(BASE_API_PATH + "/schizophrenia-stats", (req,res)=>{
        if (schizophrenia_stats_data.length != 0) {
            console.log('schizophrenia_stats requested');
          return res.send(JSON.stringify(schizophrenia_stats_data, null, 2));
        } else {
          console.log("No data found");
          return res.sendStatus(404);
        }
         return res.sendStatus(200);
      });

//6.2 POST 

app.post(BASE_API_PATH + "/schizophrenia-stats", (req, res) => {
	var data = req.body;
	schizophrenia_stats_data.push(data);
	console.log(`new data pushed: <${JSON.stringify(schizophrenia_stats_data, null, 2)}>`);
	res.sendStatus(201);
});

//6.3 GET a un recurso 

app.get(BASE_API_PATH + "/schizophrenia-stats/:country/:year", (req, res) => {
	var country = req.params.country;
	var year = parseInt(req.params.year);

	console.log(`GET stat by country: <${country}> and year: <${year}>`);
	for (var stat of schizophrenia_stats_data) {
		if (stat.country === country && stat.year === year) {
			return res.status(200).json(stat);
		}
	}

	return res.sendStatus(404);
});

//6.4 DELETE a un recurso 

app.delete(BASE_API_PATH + "/schizophrenia-stats/:country/:year", (req, res) => {
	var country = req.params.country;
	var year = parseInt(req.body.year);

	console.log(`DELETE by country <${country}> and year: <${year}>`);

	for (var i = 0; i < schizophrenia_stats_data.length; i++) {
		if (schizophrenia_stats_data[i]["country"] === country && schizophrenia_stats_data[i]["year"] === year) {
			schizophrenia_stats_data.splice(i, 1);
			return res.sendStatus(200);
		}
	}

	return res.sendStatus(404);
});

//6.5 PUT a un recurso  

app.put(BASE_API_PATH + "/schizophrenia-stats/:country/:year", (req, res) => {
	var country = req.params.country;
	var year = parseInt(req.params.year);
	var newDatSchizophrenia = req.body;

	console.log(`PUT ${newDatSchizophrenia.country} OVER ${country} `);
	console.log(`PUT ${newDatSchizophrenia.year} OVER ${year} `);

	if (schizophrenia_stats_data.length == 0) {
		console.log("No Valido")
		return res.sendStatus(404);
	} else {
		for (var i = 0; i < schizophrenia_stats_data.length; i++) {
			var stat = schizophrenia_stats_data[i];
			if (stat.country === country && stat.year === year) {
				schizophrenia_stats_data[i] = newDatSchizophrenia;
				return res.send('PUT success');
			}
		}
	}
});

//6.6 POST a un recurso 

app.post(BASE_API_PATH + "/schizophrenia-stats/:country/:date", (req, res) => {
	console.log("POST no valido/encontrado");
	return res.sendStatus(405);

});

//6.7 PUT a la lista de recursos 

app.put(BASE_API_PATH + "/schizophrenia-stats", (req, res) => {
	console.log("PUT no valido/encontrado");
	return res.sendStatus(405);

});

//6.8 DELETE a la lista de recursos 

app.delete(BASE_API_PATH + "/schizophrenia-stats", (req, res) => {
	schizophrenia_stats_data.length = 0;
	console.log('schizophrenia deleted');
	return res.sendStatus(200);

});

};