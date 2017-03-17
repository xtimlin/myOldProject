var myApp = angular.module("myApp", []);

myApp.controller("moviesController", function($scope, $http){
	$http.get("../json/data.json")
	    .then(function(response) {
	        $scope.movies = response.data;
            console.log("data transfer done!");
        },function(response){
            console.log("database Error");
	    });


	$scope.up = function(){
		if($scope.movies[this.$index].rating < 10){
			$scope.movies[this.$index].rating++;
		}
	};

	$scope.down = function(){
		if($scope.movies[this.$index].rating > 2){
			$scope.movies[this.$index].rating--;
		}
	};

	$scope.delete = function(){
        $scope.movies.splice(this.$index,1);
        console.log("Delete success!!\n" + $scope.movies.length + " objects in list");
	};

	$scope.addNewMovie = function(){
		let data = {title: $scope.newMovieObj.title, genres: $scope.newMovieObj.genres, director: $scope.newMovieObj.director, rating: $scope.newMovieObj.rating};
		$scope.movies.push(data);

		$scope.newMovieObj = {};
		console.log("Insert Success!!\n" + $scope.movies.length + " objects in list");
	};
});