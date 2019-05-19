var supertest = require("supertest");



// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:8000");

// UNIT test begin

describe("SAMPLE unit test",function(){

  // #1 should return home page

  it("should return home page",function(done){

    // calling home page api
    server
    .get("/")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      
      if (err) throw err;

      done();
    });
  });

});


describe("GET /api/authors",function(){
  it("respond with json containing a list of all authors",function(done){

    // calling home page api
    server
    .get("/api/authors")
    .set('Accept', 'application/json')
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      
      if (err) throw err;

      done();
    });
  });

});
describe("GET /api/books",function(){
  it("respond with json containing a list of all books",function(done){

    // calling home page api
    server
    .get("/api/books")
    .set('Accept', 'application/json')
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      
      if (err) throw err;

      done();
    });
  });

});
//Testing get a user endpoint by giving an existing user
describe("GET /api/listauthor/:bookName",function(){

  it("respond with json containing a single book",function(done){

    // calling home page api
    server
    .get("/api/listauthor/devlet")
    .set('Accept', 'application/json')
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      
      if (err) throw err;

      done();
    });
  });

});
describe("GET /api/listbook/:authorname",function(){

  it("respond with json containing a single author",function(done){

    // calling home page api
    server
    .get("/api/listbook/platon")
    .set('Accept', 'application/json')
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      
      if (err) throw err;

      done();
    });
  });

});
describe("POST /api/author/",function(){
let data ={
     "name":"dummy"
}


  it("respond with 201 created ",function(done){

    // calling home page api
    server
    .post("/api/author/")
    .send(data)
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      
      if (err) throw err;

      done();
    });
  });

});
 describe("POST /api/book/",function(){
var data ={
     "name":"dummy",
     "authorname":"dummy"
}


  it("respond with 201 created ",function(done){

    // calling home page api
    server
    .post("/api/book/")
    .send(data)
    .expect("Content-type",/json/)
    .expect(201) // THis is HTTP response
    .end(function(err,res){
      
      if (err) throw err;

      done();
    });
  });

});
