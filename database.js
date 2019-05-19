var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = './database.sqlite3'

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run( `CREATE TABLE IF NOT EXISTS books ( id INTEGER PRIMARY KEY AUTOINCREMENT, bookName text,authorID INTEGER)` ,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
              //var insert ='INSERT INTO books(bookName,authorID) VALUES (?,?) '
              //db.run(insert,["savas ve barıs",1 ])
              //db.run(insert,["devlet",2])
             // db.run(insert,["sölen",2])
             
            }
        });
        db.run( 'CREATE TABLE IF NOT EXISTS authors ( id INTEGER PRIMARY KEY AUTOINCREMENT, authorname text UNIQUE )',
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
              //var insert ='INSERT INTO authors(authorname) VALUES (?) '
              //db.run(insert,["insan ne ile yasar",1])
              //db.run(insert,["platon"])
              //db.run(insert,["tostoy"])
              
                            
            }
        });
    
        

        
          
    }
});


module.exports = db