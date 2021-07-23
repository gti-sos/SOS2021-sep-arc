//var cool =  require("cool-ascii-faces");
var express = require("express");
var path = require("path");
var app = express();


var port = (process.env.PORT || 10000);

app.use("/", express.static(path.join(__dirname, "public")));

app.get("/hello",(req,res) => {
    //response.send(cool());
    res.send("Hello from this tiny server");
    //console.log("New request has arrived");

});

app.post("/hello",(req,res) => {
    res.send("Hello from this tiny server");
});

app.listen(port, () => {
    console.log(`Server ready listening on ${port}`);
});
//console.log(cool());
//FORMA SÍNCRONA (PEOR)
//app.listen(port);
//console.log(`Server ready listening on ${port}`);

//BASE DE DATOS 
app.get("/info/schizophrenia_stats", (request,response)=>{

        response.send(`<!DOCTYPE html>
                    <html>
                        <head>
                            <title>schizophrenia_stats</title>
                            <style>
                                table, tr, td {
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
                                
                            <h3><td>country</td>
                                <td>year</td>
                                <td>schizophrenia_men</td>
                                <td>schizophrenia_women</td>
                                <td>schizophrenia_population</td></h3>
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
    
    });	
