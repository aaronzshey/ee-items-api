const fs = require('fs')
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../db/attributes.db');


const yargs = require("yargs")
  .command("o", "Open a JSON file and analyze its contents")

//console.log(yargs.argv.o)

function populateAttributes(attrName, attrID) {
  let sql = `INSERT INTO attributes (Name, ID) VALUES(?, ?)`
  db.run(sql, [attrName, attrID], (err) => {
    if (err) throw err;
    console.log(`Inserted ${attrName} with id ${attrID}`)
  })
}

let file = fs.readFileSync(yargs.argv.o)
let data = JSON.parse(file)
let keys = Object.keys(data).map(x => Number(x))
keys.forEach(x => {
  //console.log(x, "|", data[x]["attribute_name"])
  populateAttributes(data[x]["attribute_name"], x)
})


db.close()
