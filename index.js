// get attr
const fs = require('fs')
const sqlite3 = require('sqlite3').verbose();
const attr_db = new sqlite3.Database("./db/attributes.db")


//const yargs = require("yargs")
//  .command("o", "Open a JSON file and analyze its contents")


let file = fs.readFileSync("./apk/assets/res/staticdata/dogma/type_attributes_86.json")
//above would be derived from a database

let mockData = JSON.parse(file)

console.log(mockData["11028000004"])



//this let is important!
for (let keys in mockData["11028000004"]) {
//console.log(mockData["11028000004"][keys])


  let sql = "SELECT Name FROM Attributes WHERE ID=?;"

  attr_db.all(sql, [keys], (err, data) => {
    console.log(data[0].Name, "|", mockData["11028000004"][keys])
  })

}


attr_db.close()
