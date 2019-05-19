// Create express app
var express = require("express")
var app = express()
var db = require("./database.js")
var md5 = require("md5")

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Server port
var HTTP_PORT = process.env.PORT || 8000 
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});
//endpoint to list books according to given author
app.get("/api/listbook/:authorname", (req, res, next) => {

    var sql="select books.bookName from authors JOIN books ON authors.id=books.authorID where authors.authorname= ?"
    var params = [req.params.authorname]
    db.all(sql, params, (err, rows) => {
      
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        
        res.json({
            "message":"success",
            "data":rows
        })
      });
});
app.get("/api/listauthor/:bookName", (req, res, next) => {

    var sql="select authors.authorname from books JOIN authors ON authors.id=books.authorID where books.bookName= ?"
    var params = [req.params.bookName]
    db.all(sql, params, (err, rows) => {
      
        if (err) {
          res.status(400).json('user not found');
          return;
        }
        
        res.json({
            "message":"success",
            "data":rows
        })
      });
});
//endpoint to create book 
app.post("/api/book/",(req, res, next) => {
   
    var data = {
        name: req.body.name ,
        authorname: req.body.authorname 
    }
    sqlzero='INSERT OR IGNORE  INTO authors(authorname) VALUES(?)'
    var params=[data.authorname]
    db.run(sqlzero, params, function (err, result){
           
         if (err){
            res.status(400).json({"error": err.message})
            return;
        }

    });

    var sql ='INSERT INTO books(bookName, authorID) VALUES (?,(SELECT authors.id from authors where authorname= ? ))'
    var params =[data.name, data.authorname]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
} );




//endpoint to create new author
app.post("/api/author/",(req, res, next) => {
   
    var data = {
        name: req.body.name  
    }
    var sql ='INSERT  OR IGNORE INTO authors(authorname) VALUES (?)'
    var params =[data.name]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        
        res.json({
            "data": data,
            "id" : this.lastID
        })

    });
} );



//endpoint to list all authors
app.get("/api/authors", (req, res, next) => {
  
    var sql = "select * from authors"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});
//endpoint to list all books 
app.get("/api/books", (req, res, next) => {
    var sql = "select * from books"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});


// Root endpoint
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

// Insert here other API endpoints

// Default response for any other request
app.use(function(req, res){
    res.status(404);
});

