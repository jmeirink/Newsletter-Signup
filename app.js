
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);


// Might need to replace <dc> with us20
  const url = "https://<dc>.api.mailchimp.com/3.0/lists/f238cb0a12"

  const options = {
    method: "POST",
    auth: "jmeirink1:d3c15d13cad1054d4426c1aa531e319d-us20"
  }

  const request = https.request(url, options, function(response){
    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  })

  request.write(jsonData);
  request.end();

});

app.listen(3000, function(){
  console.log("Server is running on port 3000")
});

// API Key
// d3c15d13cad1054d4426c1aa531e319d-us20

// List ID
// f238cb0a12
