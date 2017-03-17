var myApp = angular.module("stockDemo", []);

myApp.controller('stockMainController', ['$scope', '$http', function($scope, $http){
	$http.get("./JSON/stock.json")
	    .then(function(response) {
	        $scope.stocks = response.data;

	        for(var i = 0; i < $scope.stocks.length; i++){
	        	$scope.stocks[i].accountNumber = $scope.getNumber($scope.stocks[i].account);
	        	if($scope.stocks[i].rate > 0){
	        		$scope.stocks[i].rate = "+" + $scope.stocks[i].rate;
	        	}
	        }

            console.log("data transfer done!");
        },function(response){
            console.log("database Error");
	    });

	    $scope.limit = 3;

	    $scope.maxLimit = function(){
	    	$scope.limit = $scope.stocks.length;
	    };


	$scope.getNumber = function(account){
		return account.substr(4, 7);
	};


	$scope.sortBy = function(propertyName) {
    	$scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
    	$scope.propertyName = propertyName;
  	};

  	$scope.dailyUpdateStyle = function(){
  		if($scope.stocks[this.$index].rate > 0){
			$scope.stocks[this.$index].rating--;
		}
		if($scope.stocks[this.$index].rate < 0){
			$scope.stocks[this.$index].rating--;
		}
  	};
}]);