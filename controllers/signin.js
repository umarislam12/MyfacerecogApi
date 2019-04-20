const handleSignin=(req, res, db, bcrypt )=>{
const{email, password}=req.body;
if(!email||  !password){
	return res.status(400).json('incorrect form submission')
}

db.select('email','hash').from('login')
.where('email','=', email)
.then(data=>{
	const isValid=bcrypt.compareSync(password, data[0].hash);
	
	if(isValid){
		return db.select('*').from('users')
		.where('email','=', email)
		.then(user=>{
		    res.json(user[0])

		})
		.catch(err=>res.status(400).json('unable to get users'))
	}else{
		res.stats(400).json('wrong credentials')
	}
})

.catch(err=>res.status(400).json('wrong credential'))
/*// Load hash from your password DB.
bcrypt.compare("cookies", '$2a$10$4KRC9l8J3/6WEHr7RNjgXOavEaYRZIOf07Cd0V03rXkuWBFElVHp6', function(err, res) {
    console.log('first guess', res)
    // res == true
});
bcrypt.compare("veggies", '$2a$10$3kl2fOloBtvNFMBA/XhnfucMQEBoy.5ZpEdTCZEL7WUodpaykPtUS', function(err, res) {
    console.log('2nd guess', res)
    // res = false
});*/
          //When we DID NOT HAVE POSTGRES
	/*if(req.body.email===database.users[0].email &&
	 req.body.password===database.users[0].password){
		res.json(database.users[0]);
	}else{
		res.status(400).json('error logging in');
	}
	*/
}
module.exports={
	handleSignin:handleSignin
}