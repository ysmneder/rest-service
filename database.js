var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = './mydbdeneme.sqlite3'

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run( `CREATE TABLE IF NOT EXISTS books ( id INTEGER PRIMARY KEY AUTOINCREMENT, bookName text)` ,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
              
            }
        });
        db.run( 'CREATE TABLE IF NOT EXISTS authors ( id INTEGER PRIMARY KEY AUTOINCREMENT, authorname text )',
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
              
            }
        });
        db.run('CREATE TABLE IF NOT EXISTS match ( bookID INTEGER , authorID INTEGER )',
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
            
                


            }
        });
        

        
          
    }
});


module.exports = db