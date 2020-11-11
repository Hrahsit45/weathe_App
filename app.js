const express = require('express');


const bodyparser =require('body-parser');

const https = require('https');

const app = express();


app.set('views', './views');
app.set ("view engine", "ejs")

app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));

let day="Delhi";
    let descrip ;
    let temp;
    let maxtemp;
    let mintemp;
    let humidity;
    let img;
    let imgurl;
    let place=""

app.get("/",(req,res)=>{

    

    res.render("main",{mainTitle : place, 
      description : descrip ,
      temperature : temp ,
      mint : mintemp ,
       maxt : maxtemp ,
        hum : humidity,
        imgg : imgurl
    });
})

app.post("/",(req,res)=>{

 place = req.body.name;
let apikey = "09379dbf3405b0d2191f02c64fcc7995";
let unit = "metric"
let url = "https://api.openweathermap.org/data/2.5/weather?q="+ place +"&appid=" + apikey +"&units="+unit+"";
 
    https.get( url , function(response) {

        response.on("data", function(data){

            const   weatherdata=JSON.parse(data);
            temp =  weatherdata.main.temp;
            descrip =   weatherdata.weather[0].description;
            maxtemp =weatherdata.main.temp_max;
             mintemp= weatherdata.main.temp_min;
            humidity= weatherdata.main.humidity;
             img = weatherdata.weather[0].icon;

             imgurl="http://openweathermap.org/img/wn/" + img + "@2x.png"

            
             res.redirect("/")
        })
    })
  

    
})

app.listen(3000,()=>{
    console.log("connected to port 3000");
})

// apikey=09379dbf3405b0d2191f02c64fcc7995;
// main.temp