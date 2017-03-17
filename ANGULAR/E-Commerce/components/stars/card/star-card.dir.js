(function(){

	"use strict";

	angular
		.module("ngStars")
		.directive("starCard", function(){
			return {
				templateUrl:'components/stars/card/star-card.tpl.html',
				scope:{
					stars: "=stars",
					starsFilter: "=starsFilter",
					category:"=category"
				},
				controller: starCardController,
				controllerAs: "vm"
			}
			console.log($scope.starsFilter);
			function starCardController($state, $scope, $mdDialog){

				var vm = this;
				vm.editStar = editStar;
				vm.deleteStar = deleteStar;

				function editStar(star) {
					$state.go('stars.edit', {
						id:star.id,
						star:star
					});
					console.log($scope.starsFilter);
				}

				function deleteStar(event, star){

					var confirm = $mdDialog.confirm()
									.title('Are you sure to delelte ' + star.title + '?')
									.ok('Yes')
									.cancel('No')
									.targetEvent(event);
									console.log(star);
									console.log($scope.stars);
					$mdDialog.show(confirm).then(function(){
						var index = $scope.stars.indexOf(star);
						console.log(vm.stars);
						console.log(index);
						$scope.stars.splice(index, 1);
					});
				
				}

				function showToast(message) {
					$mdToast.show(
							$mdToast.simple()
								.content(message)
								.position('top, right')
								.hideDelay(3000)
						);
				}

			}
		})

})();