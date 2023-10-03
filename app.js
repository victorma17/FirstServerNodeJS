 const express = require("express")

 const app = express();

app.get("/", function(req, res){
    res.send("hey!")
})

 app.listen(8080, '127.0.0.1')
 
 console.log("hello!")

 app.post("/addUser", function(req, res){
    res.status(200).send("Añadido!")
})