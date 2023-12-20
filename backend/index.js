import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express()
app.use(express.json());
app.use(cors());
const db = mysql.createConnection({
   host:"localhost",
   user : "root",
   password: "sachin123",
   database:"gas_agency_data"

})

app.get("/", (req, res) =>{
  res.json("Hello Backend")

})

app.get("/alldata", (req, res) =>{
    const q = "SELECT * FROM customer_data"
    db.query(q,(err,data)=>{
    if(err){ 
        console.log(err)
        return res.json(err)
    }
        return res.json(data);
//    console.log(res.json(data))

    })
   
  
})

app.post("/details", (req, res) => {
    const q = "INSERT INTO `gas_agency_data`.`customer_data`(`Name`, `Address`, `Number`, `Phone`) VALUES (?)";
    console.log(req);
    const values = [
      req.body.Name,
      req.body.Address,
      req.body.Number,
      req.body.Phone
    ];
    console.log(values);
    db.query(q, [values], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });

  app.delete("/data/:Number", (req, res) => {
    const CustomerNo = req.params.Number;
    const q = "DELETE FROM customer_data WHERE Number = ? ";
  
    db.query(q, [CustomerNo], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });
  app.delete("/data", (req, res) => {
    const CustomerNo = req.params.Number;
    const q = "DELETE FROM customer_data ";

    db.query(q, [CustomerNo], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });
  
  app.put("/update/:Number", (req, res) => {
    const CustomerNo = req.params.Number;
    const q = "UPDATE customer_data SET `Name`= ?, `Address`= ?, `Number`= ?, `Phone`= ? WHERE Number = ?";
  
    const values = [
      req.body.Name,
      req.body.Address,
      req.body.Number,
      req.body.Phone
    ];
  
    db.query(q, [...values,CustomerNo], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });
app.listen(8800, ()=>{
console.log("Backend working")
})