//jshint esversion:6

const express=require("express");
const app=express();
const https=require("https"); // to call external server api

const bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){
  // console.log("posted successfully");
  // console.log(req.body.cityName);

  const city=req.body.cityName;
  const appid_key="35493e6def990e10e7d4fab1378ab3d1";
  const units_in="metric";
  const base_url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+appid_key+"&units="+units_in;
  // res.send("server working fine");

  https.get(base_url,function(res2){
    // console.log(res2);
    console.log(res2.statusCode);
    res2.on("data",function(data){
      // console.log(data);
      var weatherData=JSON.parse(data); //string to JSON
      // console.log(weatherData);

      // const myData={
      //   name:"arun",
      //   age:20
      // }
      // console.log(JSON.stringify(myData)); // JSON to string

      var temperature=weatherData.main.temp;
      var weatherDescription=weatherData.weather[0].description; // path copied from json awesome viewer extension
      var icon=weatherData.weather[0].icon;
      const img_url= "http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<p>The weather in "+city+" is "+weatherDescription); //this is not res2!
      res.write("<h2>The temperature is "+temperature+"degree celcius</h2>");//this is not res2!
      res.write("<img src="+img_url+">");
      res.send();//there can only be one res.send //this is not res2!
      // so to write multiple line use res.write()
    })
  })
})

app.listen(3000,function(){
  console.log("server running on port 3000");
})
