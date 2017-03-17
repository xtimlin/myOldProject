# Authentication-Server

### Software for develop
* Sublime Text 3, build 3126 (develop)
* Google Chrome, Version 57.0.2987.98 (64-bit) (testing Browser)
* Node, v7.4.0
* MongoDB, v3.4.2
* Robomongo 1.0.0-RC1, for MongoDB database data testing

### Operation System
* Microsoft Windows 10 Pro, 64 bit, Version	1607, OS build 14393.693

### Any design decisions or behavioral clarifications that illustrate how your program functions and why 
* Setting up backend server with Node, Express(server support), MongoDB(database support), and Morgan(log data from backend console)
* Creates Model and Routes for each views and controllers by using Angular components.
* Using Bootstrap open source library for styling each views.
* Creates angular Factory service and Animate to improve user experience.
* Create custom directive for checking match password on register user account.
* When user load-in or refresh page first check if any JWT object, and automatically pick up the JWT object if exist.
* Validity checking: when user setting up account front-end will check the data input format(such as email, password) and Back-end will check input data for user account(if any duplicate data such as username and email in current database).
* **Registration**: when user finish setup account front-end encrypt password (using bcrypt-nodejs) and create user object(including user data and account initial lock property) send to backend, and also generate an user activation email to user’s email address by using nodemailer and sendgrid (any email send out from this app might found in the **spam** email section). User need to activate account by click on the activation link from the email before they login they account. 
* Prompt user if any login data or register data is incorrect, auto-redirect page when user finished register, login, logout, or confirm email. by using ng-route and $location angular object service.
* **Login**: user login first check their username, password, and account activation (verify data getting from MongoDB), if their account is not activated provided option for resend activation email to their email address. Once user success login creates a JWT object save on client side.
* Create Schema for MongoDB and data validation check when user register account on the backend side and also format data 
* improve user experience by hiding not nessency element in DOM by using ng-if and ng-show

### External Libraries 
* [AngularJS](https://angularjs.org/), v1.6.2, MVC Framework create sign page application.

* [Bootstrap](http://getbootstrap.com/), v3.3.7, styling purpose

* [JQuery](https://jquery.com/), V3.1.1, animate support

* [Express](https://expressjs.com/), v4.5.12, server support

* [Nodemon](https://nodemon.io/), v1.11, keep watching if any file change or update

*  [Morgan](https://www.npmjs.com/package/morgan), v1.8.1, middleware to the server logging info on the server console

* [Mongoose](http://mongoosejs.com/), v4.8.7, for support for the mongodb database

* [Body-Parser](Https://github.com/expressjs/body-parser), v1.17.1, middleware for Parse incoming request

* [Bcrypt-nodejs](https://www.npmjs.com/package/bcrypt-nodejs), v0.0.3, for encrypt password on client

* [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken), v7.3.0, save and verify JWT object

* [mongoose-title-case](https://www.npmjs.com/package/mongoose-title-case), v0.0.4, for data format style on MongoBD

* [mongoose-validator](https://www.npmjs.com/package/mongoose-validator), v1.2.5, for data validation on MongoBD

* [nodemailer](https://nodemailer.com/about/), V. 3.1.5, for sending email to user account activation 

* [nodemailer-sendgrid-transport](https://sendgrid.com/), v0.2.0, for sending email to user account activation 



### Necessary tools/libraries 
* Node
* **MongoBD** v3.4.2 (version might affect on checking duplicate username or email when registering new user) 
* Database is not required as long as system install Mongo, but I will provided my testing database


# Application Executing
* Make sure you are connecting internet 
* MUST start the command line under Authentication-Server folderand execute follow 2 command in split cmd window

* First Tab:
```sh
$ mongod
```

* Second Tab:
```sh
$ nodemon server.js
```

* Server running on port 3000 in browser.

```sh
localhost:3000
```

### Following link has been implement
##### Before login:
* [Home](http://localhost:3000/#!/)
* [About](http://localhost:3000/#!/about)
* [Login](http://localhost:3000/#!/login)
* [Register](http://localhost:3000/#!/register)

##### After login : (not allow to visit before login)
* [Profile](http://localhost:3000/#!/profile)





