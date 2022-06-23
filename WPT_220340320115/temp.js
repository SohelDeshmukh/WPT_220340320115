
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');

app.use(express.static('abc'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
//whether you want nested objects support  or not

const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'test',
	port:3306
});


app.get('/fetchdetails',(req, res) =>{
		let bookid = req.query.bookid;
        console.log("reading input " + req.query.bookid);
		// let allbooks = $("#allbooks").html
    	let output ={ status: false, book: {bookid:"",bookname:"",bookprice:""}}; // allbooks:""
		
		connection.query("select * from book where bookid=?",[bookid],(error,result)=>{
			if(error){
				console.log(error);
			}
			else{
				if(result.length>0){
					console.log(result);
					output.status = true;
					output.book.bookname=result[0].bookname;
					output.book.bookprice=result[0].price;
					// let index="";
					// for(index=0,index<result.length,++index){
					// output.book.bookid=result[index].bookid;
					// output.book.bookname=result[index].bookname;
					// output.book.bookprice=result[index].price;
					// output.allbooks+= result.book[index];
					// }
				}
				else{
					console.log("No rows returned.");
				}
			}
		res.send(output);
		});
	});

	app.get('/addabook',(req, res) =>{
		let bookid = req.query.bookid;
		let bookname = req.query.bookname;
		let bookprice = req.query.bookprice;
        console.log("Book Id = " + req.query.bookid);
        console.log("Book Name = " + req.query.bookname);
        console.log("Book Price = " + req.query.bookprice);
		
    	let output ={ status: false, book: {bookid:"",bookname:"",bookprice:""} };

		connection.query("insert into book values (?,?,?)",[bookid,bookname,bookprice],(error,result)=>{
			if(error){
				console.log(error);
			}
			else{
				if(result.affectedRows>0){
					console.log("Added Succesfully!");
					output.status = true;
				}
				else{
					console.log("No rows returned.");
				}
			}
		res.send(output);
		});
	});


app.listen(8081, function () {
    console.log("server listening at port 8081...");
});