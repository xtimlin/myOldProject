var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var titlize = require('mongoose-title-case');
var validate = require('mongoose-validator');

//name format validation in database
var nameValidator = [
  validate({
    validator: 'matches',
    arguments: /^(([a-zA-Z]{3,20})+[ ]+([a-zA-Z]{3,20})+)+$/,
    message: 'Name: Character must between 2 to 30, no special characters, and much have space in between'
  }),
  validate({
    validator: 'isLength',
    arguments: [3, 20],
    message: 'Email should be between {ARGS[0]} and {ARGS[1]} characters'
  }),
];

//email format validation in database
var emailValidator = [
  validate({
    validator: 'isEmail',
    message: 'Not a valid Email'
  }),
  validate({
    validator: 'isLength',
    arguments: [3, 50],
    message: 'Email should be between {ARGS[0]} and {ARGS[1]} characters'
  }),
];


//username format validation in database
var usernameValidator = [
  validate({
    validator: 'isLength',
    arguments: [3, 25],
    message: 'Email should be between {ARGS[0]} and {ARGS[1]} characters'
  }),
  validate({
    validator: 'isAlphanumeric',
    message: 'Username must contain letters and numbers only'
  }),
];


//password format validation in database
var passwordValidator = [
  validate({
    validator: 'matches',
    arguments: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,30}$/,
    message: 'Password: between 8~30 cahracters, at least one lowercase, one uppercase, one number, and one special character'
  }),
  validate({
    validator: 'isLength',
    arguments: [8, 30],
    message: 'Password should be between {ARGS[0]} and {ARGS[1]} characters'
  }),
];




var UserSchema = new Schema({
  name:{type:String, require:true, validate: nameValidator},
	username:{type:String, lowercase:true, require:true, unique:true, validate: usernameValidator},
	password:{type:String, unique:true, validate: passwordValidator, select:false},
	email:{type:String, lowercase:true, require:true, unique:true, validate: emailValidator},
  active: { type: Boolean, required: true, default: false },
  temporarytoken: { type: String, required: true }
  
});

UserSchema.pre('save', function(next) {
	var user = this;

  if(!user.isModified('password')){
    return next();
  }

	bcrypt.hash(user.password, null, null, function(err, hash){
		if(err){ 
			return next(err);
		};
		user.password = hash;
		next();
	});
});

UserSchema.plugin(titlize,{
  paths: ['name', {path: 'name.last', trim: false}],

});

UserSchema.methods.comparePassword = function(password){
  return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('user', UserSchema);



