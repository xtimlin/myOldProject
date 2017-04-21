var myApp = angular.module("myApp", []);

myApp.factory('myFactory', ['$http', function($http){
	var obj = {};

	obj.getPeoples = function(){
		return $http.get("../data/person.json")
			
	}

	return obj;
}]);



myApp.controller('mainCtrl', ['$scope', '$filter', '$http', 'myFactory', function($scope, $filter, $http, myFactory){
	
	var dataDetail = [
	  	{"Month" : "DECEMBER", "number" : 12, "value" : 0},
	  	{"Month" : "NOVEMBER", "number" : 11, "value" : 0},
	  	{"Month" : "OCTOBER", "number" : 10, "value" : 0},
	  	{"Month" : "SEPTEMBER", "number" : 9, "value" : 0},
	  	{"Month" : "AUGUST", "number" : 8, "value" : 0},
	  	{"Month" : "JULY", "number" : 7, "value" : 0},
	  	{"Month" : "JUNE", "number" : 6, "value" : 0},
	  	{"Month" : "MAY", "number" : 5, "value" : 0},
	  	{"Month" : "APRIL", "number" : 4, "value" : 0},
	  	{"Month" : "MARCH", "number" : 3, "value" : 0},
	  	{"Month" : "FEBRUARY", "number" : 2, "value" : 0},
	  	{"Month" : "JANUARY", "number" : 1, "value" : 0}
	];

	var layout = {
		title: 'Birthday Months',
		xaxis: {
		    title: 'Number',
		    showgrid: true,
		    zeroline: false
		},
		yaxis: {
		    title: 'Month',
		    showline: true
		}
	};
	

	var init = function(dataDetail, layout){
		myFactory.getPeoples().then(function(response) {
			$scope.peoples = response.data;

			for(var i = 0; i < $scope.peoples.length; i++){
				var month = $scope.peoples[i].Birthday.split("-");
				month = month[1];
				// console.log(month);

				for(var j = 0; j < 12; j++){
					if(dataDetail[j].number == month){
						dataDetail[j].value++;
					}
				}
			}
			
			$scope.data = [{
			  type: 'bar',
			  
			  x: [
			  	dataDetail[0].value,
			  	dataDetail[1].value,
			  	dataDetail[2].value,
			  	dataDetail[3].value,
			  	dataDetail[4].value,
			  	dataDetail[5].value,
			  	dataDetail[6].value,
			  	dataDetail[7].value,
			  	dataDetail[8].value,
			  	dataDetail[9].value,
			  	dataDetail[10].value,
			  	dataDetail[11].value
			  ],
			  y: [
			  	dataDetail[0].Month,
			  	dataDetail[1].Month,
			  	dataDetail[2].Month,
			  	dataDetail[3].Month,
			  	dataDetail[4].Month,
			  	dataDetail[5].Month,
			  	dataDetail[6].Month,
			  	dataDetail[7].Month,
			  	dataDetail[8].Month,
			  	dataDetail[9].Month,
			  	dataDetail[10].Month,
			  	dataDetail[11].Month
			  ],
			  orientation: 'h'
			}];

			Plotly.newPlot('chart', $scope.data, layout);

		});
	}

	init(dataDetail, layout);
	

	var getMonthNumber = function(month){
		for(var i = 0; i < 12; i++){
			if(dataDetail[i].Month === month){
				return dataDetail[i].number;
			}
		}
	}

	var getMonthString = function(number){
		return dataDetail[Math.abs(12-number)].Month;
	}



	//sort the chart ans the rerender the chart
	$scope.sort = function(value){
		var tempX = 0;
		var tempY = 0;

		if(value === "Numerical"){
			for(var i = 0; i < 12; i++){
				for(var j = i + 1; j < 12; j++){
					if($scope.data[0].x[i] > $scope.data[0].x[j]){
						tempX = $scope.data[0].x[i];
						$scope.data[0].x[i] = $scope.data[0].x[j];
						$scope.data[0].x[j] = tempX;

						tempY = $scope.data[0].y[i];
						$scope.data[0].y[i] = $scope.data[0].y[j];
						$scope.data[0].y[j] = tempY;
					}
				}
			}
		}

		if(value === "Chronological"){
			for(var i = 0; i < 12; i++){
				for(var j = i + 1; j < 12; j++){
					var monthI = getMonthNumber($scope.data[0].y[i]);
					var monthJ = getMonthNumber($scope.data[0].y[j]);

					if(monthI < monthJ){
						tempX = $scope.data[0].x[i];
						$scope.data[0].x[i] = $scope.data[0].x[j];
						$scope.data[0].x[j] = tempX;

						tempY = $scope.data[0].y[i];
						$scope.data[0].y[i] = $scope.data[0].y[j];
						$scope.data[0].y[j] = tempY;
					}
				}
			}
		}
		Plotly.newPlot('chart', $scope.data, layout);
	};



	//format brithday input
	$(document).ready(function () {    
        $('#brithdayInput').datepicker({
            format: "dd-mm-yyyy"
        });
    });



	//add data into the array, then call the sort methord, and also rerender the chart
    $scope.addPerson = function(){
    	$scope.peoples.push($scope.newPerson);

    	var month = $scope.newPerson.brithday.split('-');
    	month = month[1];
    	var monthString = getMonthString(month);
    	for(var i = 0; i < 12; i++){
    		if($scope.data[0].y[i] === monthString){
    			$scope.data[0].x[i]++;
    		}
    	}

    	$scope.sort($scope.value);
    	Plotly.newPlot('chart', $scope.data, layout);
    	$scope.newPerson = null;
    }

}]);