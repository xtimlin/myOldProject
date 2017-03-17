angular.module('mainController',['authServices'])

.controller('mainCtrl', function(Auth, $timeout, $location, $rootScope){

	var app = this;

	app.loadme = false;
	$rootScope.$on('$routeChangeStart', function(){
		if(Auth.isLoggedIn()){
			app.isLoggedIn = true;
			Auth.getUser().then(function(data){
				app.username = data.data.username;
				app.useremail = data.data.email;
				app.loadme = true;
			});
		}else{
			app.username = '';
			app.isLoggedIn = false;
			app.loadme = true;
		}
		if($location.hash()=='_=_'){
			$location.hash(null);
		}
	})


	this.dologin = function(loginData){
		app.loading = true;		// Start bootstrap loading icon
		app.errorMessage = false;	// Clear errorMsg whenever user attempts a login
		app.expired = false;	// Clear expired whenever user attempts a login 

		// Function that performs login
		Auth.login(app.loginData).then(function(data){
			// Check if login was successful 
			if(data.data.success){
				app.loading = false;	// Stop bootstrap loading icon
				//create success message
				app.successMessage = data.data.message + '...Redirecting';	// Create Success Message then redirect
				//go back to home page
				// Redirect to home page after two milliseconds (2 seconds)
				$timeout(function(){
					$location.path('/');// Redirect to home
					app.loginData = '';	// Clear login form
					app.success = false;// CLear success message
				}, 2000)
				
			}else{
				if(data.data.expired){
					//creat an error message
					app.expired = true;	// If expired, set variable to enable "Resend Link" on login page
					app.loading = false;	// Stop bootstrap loading icon
					app.errorMessage = data.data.message;	// Return error message to login page
				}else{
					//creat an error message
					app.loading = false;	// Stop bootstrap loading icon
					app.errorMessage = data.data.message;	// Return error message to login page
				}
			}
		});
	};

	// Function to logout the user
	this.logout = function(){
		Auth.logout();
		$location.path('/logout');
		$timeout(function(){
			$location.path('/');
		},2000);
	};
});


