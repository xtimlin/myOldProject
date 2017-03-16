var User = require('../models/user.js');
var jwt = require('jsonwebtoken');
var secret = 'youcannot';
var expiresTime = '1h';
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');


module.exports = function(router){

	var options = {
		//sendgrid ACCOUNT INFORMATION
	  auth: {
	    api_user: 'xhlin1217',
	    api_key: 'password123'
	  }
	}

	var client = nodemailer.createTransport(sgTransport(options));

	//http://localhost:3000/api/users
	//user regiteration
	router.post('/users',function(req,res){
		var user = new User();
		user.username = req.body.username;
		user.password = req.body.password;
		user.email = req.body.email;
		user.name = req.body.name;
		user.temporarytoken = jwt.sign({username: user.username, email: user.email}, secret,{expiresIn:'24h'});

		if( req.body.username == null || req.body.username == '' ||
			req.body.password == null || req.body.password == '' ||
			req.body.email == null || req.body.email == '' ||
			req.body.name == null || req.body.name == ''){
			//if no email or password or username
			res.json({success:false, message:'Ensure username, email, and password were provided!'});
		}else{
			user.save(function(err){
				if(err){
					//validation check in database
					if(err.errors != null){
						//validation input check in database
						if(err.errors.name){
							res.json({success:false, message:err.errors.name.message});
						}else if(err.errors.email){
							res.json({success:false, message:err.errors.email.message});
						}else if(err.errors.username){
							res.json({success:false, message:err.errors.username.message});
						}else if(err.errors.password){
							res.json({success:false, message:err.errors.password.message});
						}else{
							res.json({success: false, message: err})
						}
					}else if(err){
						// validation check beside formatting check

						if(err.code == 11000){
							if(err.errmsg[58] == "u"){
								res.json({success: false, message:'username already exist'});
							}else if(err.errmsg[58] == "e"){
								res.json({success: false, message:'email already exist'});
							}
						}else{
							res.json({success: false, message:err});
						}
					}
				} else{
					//pass validation check

				var email = {
				  from: 'Localhost Staff, staff@localhost.com',
				  to: user.email,
				  subject: 'Localhost Activation Link',

				  text: 'Hello ' + user.name + ', Thank you for registering at localhost. Please click on the link to complete your activation: http://localhost:3000/#!/activate/' + user.temporarytoken,
				  html: 'Hello<strong> ' + user.name + '</strong>, <br>Thank you for registering at localhost.com. Please click on the link below to complete your activation:<br><br><a href="http://localhost:3000/#!/activate/' + user.temporarytoken + '">http://localhost:3000/activate</a>'
				
				};

				client.sendMail(email, function(err, info){
				    if (err ){
				      console.log(err);
				    }
				    else {
				      console.log('Message sent: ' + info.response);
				    }
				});

				res.json({success:true, message:'Account created! Please check your email for activation link.'});
				}
			});
		}
	});





	router.post('/checkusername', function(req, res){
		User.findOne({username:req.body.username}).select('username').exec(function(err,user){
			if(err){
				throw err;
			}

			if(user){
				res.json({success:false, message:'Username already exist'});
			}else{
				res.json({success:true, message:'Valid username'});
			}
		});
	});


	router.post('/checkemail', function(req, res){
		User.findOne({email:req.body.email}).select('email').exec(function(err,user){
			if(err){
				throw err;
			}

			if(user){
				res.json({success:false, message:'Email already exist'});
			}else{
				res.json({success:true, message:'Valid email'});
			}
		});
	});



	 // Route for user logins
    router.post('/authenticate', function(req, res) {
        User.findOne({ username: req.body.username }).select('email username password active').exec(function(err, user) {
        	if(err){
        		throw err;
        	}

        	if(!user){
        		res.json({success:false, message: 'Could not authenticate user'});
        	}else if(user){
        		if(req.body.password){
        			var validPassword = user.comparePassword(req.body.password);
        		}else{
        			res.json({success:false, message: 'No password provided'});
        		}

        		if(!validPassword){
	        		res.json({success: false, message:'Could not authenticate password'});
	        	}else if(!user.active){
	        		res.json({success:false, message:'Account is not yet activated. Please check your email', expired: true});
	        	}else{
	        		var token = jwt.sign({username: user.username, email: user.email}, secret,{expiresIn:'24h'});
	        		res.json({success:true, message: 'User authenticate!', token: token});
	        	}
        	}
        });
    });



    router.put('/activate/:token', function(req,res){
    	User.findOne({temporarytoken: req.params.token}, function(err, user){
    		if(err){
    			throw err;
    		}

    		var token = req.params.token;
    		jwt.verify(token, secret, function(err, decoded){
				if(err){
					res.json({success:false, message: 'Activation link has expired'});
				}else if(!user){
					//if the token is good but account information not match in the datanase
					res.json({success:false, message: 'Activation link has expired'});
				}else{
					user.temporarytoken = false;
					user.active = true;

					user.save(function(err){
						if(err){
							console.log(err);
						}else{
							var email = {
							  from: 'Localhost Stuff, staff@localhost.com',
							  to: user.email,
							  subject: 'Localhost Account Activated',
							  text: 'Hello ' + user.name + ', Your account has been successfully activated',
							  html: 'Hello<strong> ' + user.name + '</strong>, <br>Your account has been successfully activated'
							
							};

							client.sendMail(email, function(err, info){
							    if (err ){
							      console.log(err);
							    }else {
							      console.log('Message sent: ' + info.response);
							    }
							});

							res.json({success:true, message: 'Account Activation'});
						}
					})
				}
			});
    	})
    });



       router.post('/resend', function(req, res) {
        User.findOne({ username: req.body.username }).select('username password active').exec(function(err, user) {
        	if(err){
        		throw err;
        	}

        	if(!user){
        		res.json({success:false, message: 'Could not authenticate user'});
        	}else if(user){
        		if(req.body.password){
        			var validPassword = user.comparePassword(req.body.password);
        		}else{
        			res.json({success:false, message: 'No password provided'});
        		}

        		if(!validPassword){
	        		res.json({success: false, message:'Could not authenticate password'});
	        	}else if(user.active){
	        		res.json({success:false, message:'Account is already activated.' });
	        	}else{
	        		res.json({success: true, user: user});
	        	}
        	}
        });
    });


    router.put('/resend', function(req, res) {
        User.findOne({ username: req.body.username }).select('username name email temporarytoken').exec(function(err, user) {
        	if(err){
        		throw err;
        	}

        	user.temporarytoken = jwt.sign({username: user.username, email: user.email}, secret, {expiresIn:'24h'});
        	user.save(function(err){
        		if(err){
        			console.log(err);
        		}else{
        			var email = {
					  from: 'Localhost Staff, staff@localhost.com',
					  to: user.email,
					  subject: 'Localhost Activation Link Request',

					  text: 'Hello ' + user.name + ', you recently requested a new account activation link, Please click on the link to complete your activation: http://localhost:3000/#!/activate/' + user.temporarytoken,
					  html: 'Hello<strong> ' + user.name + '</strong>, <br>recently requested a new account activation link. Please click on the link below to complete your activation:<br><br><a href="http://localhost:3000/#!/activate/' + user.temporarytoken + '">http://localhost:3000/activate</a>'
					
					};

					client.sendMail(email, function(err, info){
					    if (err){
					      console.log(err);
					    }else {
					      console.log('Message sent: ' + info.response);
					    }
					});
					res.json({success: true, message: 'Activation link has been sent to ' + user.email + '!'});
        		}
        	});

        });
    });


	router.use(function(req, res, next){
		var token = req.body.token || req.body.query || req.headers['x-access-token'];

		if(token){
			//verify token
			jwt.verify(token, secret, function(err, decoded){
				if(err){
					res.json({success:false, message: 'Token invalid'});
				}else{
					req.decoded = decoded;
					next();
				}
			});
		}else{
			res.json({sucess:false, message:'No token provided'});
		}
	})


	router.post('/me',function(req,res){
		res.send(req.decoded);
	});


	return router;
}
