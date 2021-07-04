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

const getAll = (data, itemID) => {
    return new Promise((res, rej) => {
        let placeholders = Object.keys(data[itemID]).map(x => "?").join(",")

        attr_db.all(`SELECT Name FROM Attributes WHERE ID IN (${placeholders})`, Object.keys(data[itemID]), (err, result) => {
          if (err) rej(err)
          res(result)
        })
    })
}


//EXPORT ASYNC FUNCTION



async function getInfoObj(name) {

  let enID = await getenID(name)
  let zhName = await getzhName(enID)
  let itemID = await getitemID(zhName)
  let dataLoc = await getdataLoc(itemID)

  let f = fs.readFileSync(dataLoc)
  let data = JSON.parse(f)

  let receivedAttr = await getAll(data, itemID)

  let listAttr = receivedAttr.map(x => x.Name)
  let listKeys = []

  for (keys in data[itemID]) {
    listKeys.push(data[itemID][keys])
  }


  let resObj = Object.fromEntries(
    listAttr.map(
      (_, i) => [listAttr[i], listKeys[i]]
    )
  )


  return(resObj)

};

module.exports = getInfoObj

//getInfoObj(yargs.argv.o)
//  .then(x => console.log(x))

/*
attr_db.close()
en_db.close()
zh_db.close()
*/
