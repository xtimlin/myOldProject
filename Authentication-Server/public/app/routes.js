var app = angular.module('appRoute',['ngRoute'])

.config(function($routeProvider){
	$routeProvider

	.when('/',{
		templateUrl:'app/views/pages/home.html'
	})

	.when('/about',{
		templateUrl:'app/views/pages/about.html'
	})

	.when('/register',{
		templateUrl :'app/views/pages/users/register.html',
		controller : 'regCtrl',
		controllerAs : 'register',
		authenticated : false
	})

	.when('/login',{
		templateUrl :'app/views/pages/users/login.html',
		authenticated : false
	})

	.when('/logout',{
		templateUrl :'app/views/pages/users/logout.html',
		authenticated : true
	})

	.when('/profile',{
		templateUrl :'app/views/pages/users/profile.html',
		authenticated : true
	})

	 // Route: Activate Account Through E-mail
    .when('/activate/:token', {
        templateUrl: 'app/views/pages/users/activation/activate.html',
        controller: 'emailCtrl',
        controllerAs: 'email',
        authenticated: false
    })

    .when('/resend', {
        templateUrl: 'app/views/pages/users/activation/resend.html',
        controller: 'resendCtrl',
        controllerAs: 'resend'
    })

	
	.otherwise({redirectTo:'/'});
	
});

app.run(['$rootScope', 'Auth', '$location', function($rootScope, Auth, $location){
	$rootScope.$on('$routeChangeStart', function(event, next, current){

		if(next.$$route.authenticated == true){
			// not allow access for the page without authenticated
			// console.log('needs to be authenticated');
			if(!Auth.isLoggedIn()){
				event.preventDefault();
				$location.path('/');
			}
		}else if(next.$$route.authenticated == false){
			//not allow access login and register page for user already login
			// console.log('should not be authenticated');
			if(Auth.isLoggedIn()){
				event.preventDefault();
				$location.path('/profile');
			}
		}
		// console.log(next.$$route.authenticated);
	});
}]);

	