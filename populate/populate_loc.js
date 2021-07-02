// walk dogma
const fs = require('fs')
const sqlite3 = require('sqlite3').verbose();
const loc_db = new sqlite3.Database("../db/loc.db")


const yargs = require("yargs")
  .command("o", "Open a JSON file and analyze its contents")


let file = fs.readFileSync(yargs.argv.o)
let data = JSON.parse(file)
for (keys in data) {
  populateLocations(keys, yargs.argv.o)
}



function populateLocations(id, path) {
  let sql = "INSERT INTO Locations (ID, Path) VALUES (?, ?)"
  loc_db.run(sql, [id, path], (err) => {
    console.log(`${id} is in ${path}`)
  })
}
