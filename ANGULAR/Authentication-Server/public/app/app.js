angular.module('myApp',['appRoute', 'userControllers', 'ngAnimate', 'mainController','authServices', 'emailController'])

.config(function($httpProvider){
	$httpProvider.interceptors.push('AuthInterceptors');
})