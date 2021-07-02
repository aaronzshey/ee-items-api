/*
Search en_db for name from args and get ID
search id in zh_db and get zh name
match zh name in items.db and get ID
send ID to locations, and generate info
*/


const fs = require('fs')
const sqlite3 = require('sqlite3').verbose();
const attr_db = new sqlite3.Database("db/attributes.db")
const en_db = new sqlite3.Database("db/en_descriptions.db")
const zh_db = new sqlite3.Database("db/zh_descriptions.db")
const item_db = new sqlite3.Database("db/items.db")
const loc_db = new sqlite3.Database("db/loc.db")
const yargs = require("yargs")
  .command("o", "Open a JSON file and analyze its contents")

let sql = "SELECT Name FROM Attributes WHERE ID=?;"


const getenID = (name) => {
  return new Promise( (res, rej) => {
    en_db.all("SELECT ID FROM Descriptions WHERE Content=?;", [name], (err, data) => {
      if (err) rej(err)
      return res(data[0].ID)
    })
  })
}



const getzhName = (id) => {
  return new Promise( (res, rej) => {
    zh_db.all("SELECT Content FROM Descriptions WHERE ID=?;", [id], (err, data) => {
        if (err) rej(err)
        return res(data[0].Content)
    })
  })
}




const getitemID = (zhName) => {
  return new Promise( (res, rej) => {
    item_db.all("SELECT ID FROM Items WHERE Name=?", [zhName], (err, data) => {
      if (err) rej(err)
      return res(data[0].ID)
    })
  })
}

const getdataLoc = (itemID) => {
  return new Promise( (res, rej) => {

    loc_db.all("SELECT PATH FROM Locations WHERE ID=?", [itemID], (err, data) => {
          if (err) rej(err)
          return res(data[0].Path)
    })

  })
}

(async () => {

  let enID = await getenID(yargs.argv.o)
  let zhName = await getzhName(enID)
  let itemID = await getitemID(zhName)
  let dataLoc = await getdataLoc(itemID)

  let f = fs.readFileSync(dataLoc)
  let data = JSON.parse(f)

  for (let keys in data[itemID]) {
    let sql = "SELECT Name FROM Attributes WHERE ID=?;"

    attr_db.all(sql, [keys], (err, result) => {
      console.log(result[0].Name, "|", data[itemID][keys])
    })
  }


})();



  /*
  .then(x => {
    let y = fs.readFileSync((async () => {return await getdataLoc(x)})())
    for (let keys in y[x]) {
      let sql = "SELECT Name FROM Attributes WHERE ID=?;"

      attr_db.all(sql, [keys], (err, data) => {
        console.log(data[0].Name, "|", mockData["11028000004"][keys])
      })
    }
  })

//  .then(x => console.log(x))
  .catch(e => console.log(e))



/*
attr_db.close()
en_db.close()
zh_db.close()


const getdataLoc = (itemID) => {
  return new Promise( (res, rej) => {

  })
}

*/
