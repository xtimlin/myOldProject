(function(){

	"use strict";

	angular
		.module('ngStars')
		.factory('starsFactory', function($http){

			// function getStars(){
			// 	return $http.get('data/stars.json');
			// }

			// return {
			// 	getStars: getStars
			// }

			var obj = {};
			obj.getStars = function(){
				return $http.get('data/stars.json');
			}
			return obj;
		});

})();