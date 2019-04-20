const handleRegister=(req, res, db, bcrypt)=>{

const{name, email, password}=req.body;
if(!email|| !name|| !password){
	return res.status(400).json('incorrect form submission')
}
const hash = bcrypt.hashSync(password);
//TRAnsaction
db.transaction(trx=>{
	trx.insert({
		hash:hash,
		email:email
	})
	.into('login')
	.returning('email')
	.then(loginEmail=>{
	 
		//USers table
	 return trx('users')

		.returning('*')
		.insert({
			email: loginEmail[0],
			name: name,
			joined: new Date()
			
		})
		.then(user=>{
			res.json(user[0]);
		})
	})
	.then(trx.commit)
	.catch(trx.rollback)
})
//hash concept 
/*bcrypt.hash(password, null, null, function(err, hash) {
    console.log(hash)*/

	
	.catch(err=>res.status(400).json('uable to register'))
	}


	module.exports={
		handleRegister:handleRegister
	};