angular.module('emailController', ['userServices'])

// Controller: emailCtrl is used to activate the user's account    
.controller('emailCtrl', function($routeParams, User, $timeout, $location){

	app = this;
	// Check function that grabs token from URL and checks database runs on page load
	User.activeAccount($routeParams.token).then(function(data){
		app.successMessage = false;
		app.errorMessage = false;	// Clear errorMsg each time user submits

		// Check if activation was successful or not
		if(data.data.success){
			// If successful, grab message from JSON object and redirect to login page
			app.successMessage = data.data.message + '...Redirecting';
			// Redirect after 2000 milliseconds (2 seconds)
			$timeout(function(){
				$location.path('/login');
			},2000);
		}else{
			// If not successful, grab message from JSON object and redirect to login page
			app.errorMessage = data.data.message + '...Redirecting';
			// Redirect after 2000 milliseconds (2 seconds)
			$timeout(function(){
				$location.path('/login');
			},2000);
		}
	});
})


// Controller: resendCtrl is used to resend an activation link to the user's e-mail
.controller('resendCtrl', function(User, $timeout, $location){
	app = this;
	// Custom function that check's the user's credentials against the database
	app.checkCredentials = function(loginData){
		app.errorMessage = false;
		app.successMessage = false;
		// Runs custom function that check's the user's credentials against the database
		User.checkCredentials(app.loginData).then(function(data){
			// Check if credentials match
			if(data.data.success){
				// Custom function that sends activation link
				User.resendLink(app.loginData).then(function(data){
					// Check if sending of link is successful
					if(data.data.success){
						// If successful, grab message from JSON object
						app.successMessage = data.data.message;

						// Redirect after 2000 milliseconds (2 seconds)
						$timeout(function(){
							$location.path('/login');
						},2000);
					}
				})
			}else{
				app.errorMessage = data.data.message; // If credentials do not match, display error from JSON object
			}
		})

	};

});
