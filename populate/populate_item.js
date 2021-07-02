const fs = require('fs')
const sqlite3 = require('sqlite3').verbose();
const items_db = new sqlite3.Database("../db/items.db")


const yargs = require("yargs")
  .command("o", "Open a JSON file and analyze its contents")


function populateItems(itemID, itemDesc, itemName) {
  let sql = "INSERT INTO Items (ID, Description, Name) VALUES(?, ?, ?)"
  items_db.run(sql, [itemID, itemDesc, itemName], (err) => {
    if (err) throw err;
    console.log(`Inserted ${itemID}`)
  })
}


let file = fs.readFileSync(yargs.argv.o)
let data = JSON.parse(file)
for (keys in data) {
  populateItems(keys, data[keys]["zh_desc"], data[keys]["zh_name"] )
}

items_db.close()
