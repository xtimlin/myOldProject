var myApp = angular.module('show', []);

myApp.controller('showController', function ($scope, $http) {
	$http.get("../data/data.json")
		.then(function(response){
			$scope.totalList = response.data;
			console.log('get data success!!');
		}, function(response){
			console.log("get data error!!");
		});


	$http.get("../data/user.json")
		.then(function(response){
			$scope.loginList = response.data;
			console.log('get userdata success!!');
		}, function(response){
			console.log("get userdata error!!");
		});




    $scope.loginfunction = function(){
        for(let i = 0; i < $scope.loginList.length; i++){
        	if($scope.id == $scope.loginList[i].user && $scope.password == $scope.loginList[i].password){
        		return true;
        	}
        }
        alert("wrong user or password!!!");
        $scope.password = "";
        return false;
    };





});