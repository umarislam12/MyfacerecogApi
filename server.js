const express=require('express');
const bodyParser=require('body-parser');
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');
var knex = require('knex');

const register=require('./controllers/register');
const signin=require('./controllers/signin');
const profile=require('./controllers/profile');
const image=require('./controllers/image');
const db=knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '',
    database : 'facerecognitiondb'
  }
});
//	postgre.select('*').from ('users').then(data=>{console.log(data)});
const app=express();
app.use(cors())
app.use(bodyParser.json());

//Database
/*const database = {
	users: [
	  {
	  	id:'123',
	  	name: 'john',
	  	email: 'john@gmail.com',
	  	password:'cookies',
	  	entries:0,
	  	joined: new Date()
	  },
	  {
	  	id:'124',
	  	name:'sally',
	  	email:'sally@gmail.com',
	  	password:'bananas',
	  	entries:0,
	  	joined: new Date()
	  }
	],
	login:[
		{
			id :'987',
			has:'',
			email:'john@gmail.com'

		}


	]
}*/
app.get('/',(req, res)=>{
	res.send(database.users);
})

app.post('/signin',(req,res)=>{signin.handleSignin( req, res,db,bcrypt)})
app.post('/register', (req,res )=>{register.handleRegister(req, res, db, bcrypt)})
//res.json(database.users[database.users.length-1]);
//When postgres db was not created

/*database.users.push({
		id:'125',
	  	name:name,
	  	email:email,
	  	
	  	entries:0,
	  	joined: new Date()
	})*/
app.get('/profile/:id', (req, res)=>{profile.handleProfileGet(req, res, db)})
app.put('/image',(req,res)=>{image.handleImage(req, res, db)})
app.post('/imageurl',(req,res)=>{image.handleApiCall(req, res)})


//without postgres
	/*let found=false;
	database.users.forEach(user=>{
		if(user.id===id){
			found=true;
			user.entries++
			return res.json(user.entries);
		}
	})
	if(!found){
		res.status(400).json('not found');
	}*/


app.listen(3000, ()=>{
	console.log('app is running 3000');


})


/*
/-->root working
/signin-->POST(sending password throught HTTPS) = success/fail
/register--->POST = user
/profile/:userId-->GET= user
/image-->PUT--->user
*/

/*bcrypt.hash("bacon", null, null, function(err, hash) {
    // Store hash in your password DB.
});

// Load hash from your password DB.
bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
});
bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
});
*/
/*bcrypt.hash(password, null, null, function(err, hash) {
    console.log(hash);
    // Store hash in your password DB.
});*/