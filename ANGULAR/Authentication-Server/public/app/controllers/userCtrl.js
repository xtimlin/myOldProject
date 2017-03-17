angular.module('userControllers',['userServices'])

.controller('regCtrl', function($http, $location, $timeout, User){

	var app = this;

	this.regUser = function(regData, valid){
		app.loading = true;	// Activate bootstrap loading icon
		app.errorMessage = false; // Clear errorMsg each time user submits


		if(valid){
			User.create(app.regData).then(function(data){
				if(data.data.success){
					app.loading = false;
					//create success message
					app.successMessage = data.data.message + '...Redirecting';
					//go back to home page
					$timeout(function(){
						$location.path('/');
					}, 2000)
					
				}else{
					app.loading = false;	// Stop bootstrap loading icon
					//creat an error message
					app.errorMessage = data.data.message;

				}
			});
		}else{
			app.loading = false;	// Stop bootstrap loading icon
			//creat an error message
			app.errorMessage = 'Please ensure form is filled out';	// Display error if valid returns false
		}
	};

	this.checkUsername = function(regData){
		app.checkingUsername = true;
		app.usernameMsg = false;
		app.usernameInvalid = false;
		User.checkUsername(app.regData).then(function(data){
			if(data.data.success){
				app.checkingUsername = false;
				app.usernameInvalid = false;
				app.usernameMsg = data.data.message;
			}else{
				app.checkingUsername = false;
				app.usernameInvalid = true;
				app.usernameMsg = data.data.message;
			}
		})
	}


	this.checkEmail = function(regData){
		app.checkingEmail = true;
		app.emailMsg = false;
		app.emailInvalid = false;
		User.checkEmail(app.regData).then(function(data){
			if(data.data.success){
				app.checkingEmail = false;
				app.emailInvalid = false;
				app.emailMsg = data.data.message;
			}else{
				app.checkingEmail = false;
				app.emailInvalid = true;
				app.emailMsg = data.data.message;
			}
		})
	}

})

.directive('match',function(){
	return{
		restrict:'A',
		controller: function($scope){
			$scope.confirmed = false;

			$scope.doConfirm = function(values){
				values.forEach(function(ele){
					if(ele == $scope.confirm){
						$scope.confirmed = true;
					}else{
						$scope.confirmed = false;
					}
				})
			}
		},
		link: function(scope, element, attrs){
			attrs.$observe('match',function(){
				scope.matches = JSON.parse(attrs.match);
				scope.doConfirm(scope.matches);
			});

			scope.$watch('confirm', function(){
				scope.matches = JSON.parse(attrs.match);
				scope.doConfirm(scope.matches);
			})
		}
	};
})
