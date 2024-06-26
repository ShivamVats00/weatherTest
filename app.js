const express = require("express");

const https = require("https");

const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req, res){

  const query = req.body.cityName
  const apiKey = "53c1f01e7ebe94741d7f0a3c16a3b396";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey +"&units=" + unit;

  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp
      const description = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imageURL = "http://openweathermap.org/img/wn/"+ icon + "@2x.png"
      res.write("<p>The weather is currently " + description + "</p>")
      res.write("<h1>The temperature in " + query + " is " + temp + " degree celsius</h1>")
      res.write("<img src=" + imageURL + ">");
      res.send()
      });
    })
});
app.listen(3000, function(){
  console.log("Server is running on port 3000.");
  console.log(__dirname)
});
