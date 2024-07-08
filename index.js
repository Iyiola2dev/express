import express from "express";
import data from "./data/data.json" assert {type: "json"};
const app = express();
const PORT = 3001;
app.use(express.json())

app.get("/", (req, res) => { 
  res.send("Hello World!");
});
app.get("/users", (req, res) => {
  res.send("Lexicon");
});
// app.get("/iyi", (req, res) => {
//   res.send("iyi");
// });
app.get("/ab?cd", (req, res)=>{
  res.send("path for ab?cd")
})



app.get("/ab+cd", (req, res)=>{
  res.send("path for ab?cd")
})
app.get("/ab*cd", (req, res)=>{
  res.send("path for ab*cd")
})
// app.get(/a/, (req, res)=>{
//   res.send("path for /a/")
// })
app.get(/.*fly$/, (req, res)=>{
  res.send("path for /.*fly$/")
})

app.get("/users/:name", (req, res) => {
  if(req.params.name.length < 5) res.status(400).send(`<h1> 404 NOT FOUND</h1>`)
  res.status(200);
  res.set('Content-Type','text/html')
  res.send(`<html>
    <body>
    <h1 style = 'color:Red'>Hello ${req.params.name}</h1>
    </body>
    </html>`);

});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
console.log("tunde is a ");


app.get("/user/:id?", (req,res)=>{
  if(req.params.id){
    res.send(`User ID: ${req.params.id}`)
  }else{
    res.send("All users")
  }
})

// post request
app.post("/fruit", (req, res)=>{
  console.log(req.body)
  res.send("Data saved successfully")
})

app.get("/fruit/:fruitName?", (req, res)=>{
  const {fruitName} = req.params;

  if(fruitName){
    const fruit = data.find((f) => f.name === fruitName)
    if(!fruit){
      res.status(404).send("Fruit not found");
    }
    res.status(200).send(fruit);
  }else if(!fruitName){
    res.status(200).send(data)
  }else if(!data){
    res.status(500).send("server error")
  }
})