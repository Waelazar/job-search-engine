var request = require('request'),
    mongoose = require("mongoose"),
    express = require('express'),
    app =   express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res){
   res.render("search"); 
});

app.get("/results", function(req, res){
    var jobs = req.query.description;
    var city = req.query.location;
    var url = 'https://jobs.github.com/positions.json?description='+ jobs +'&location='+ city + '&full_time=true';
    request(url, function(error, response, body){
       if (!error && response.statusCode == 200){
           // Convert into a an JSON object
            var data = JSON.parse(body);
            res.render("results", {data, data}); 
       }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server is running now!!!");
});