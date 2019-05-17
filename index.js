// Create express app
var express = require("express")
var app = express()
var db = require("./database.js")

// Server port
var HTTP_PORT = process.env.PORT || 8000 
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});
app.get("/", (req, res, next) => {
    res.redirect('/api/match/:bookID');
    var sql = "select books.bookName ,authors.authorname  from match JOIN authors ON authors.id=match.authorID JOIN books ON books.id=match.bookID where match.bookID= ?   "
    var params = [req.params.bookID]
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        console.log(rows)
        res.json({
            "message":"success",
            "data":rows
        })
      });
});
app.get("/", (req, res, next) => {
    res.redirect('/api/authors');  

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
app.get("/", (req, res, next) => {
    res.redirect('/api/books'); 
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

