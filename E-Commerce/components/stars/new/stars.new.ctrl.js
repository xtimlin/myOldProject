(function(){
	"use strict";

	angular
		.module('ngStars')
		.controller('newStarsCtrl', function($scope, $state, $mdSidenav, $timeout, $mdDialog, starsFactory){

			var vm = this;
			vm.closeSidebar = closeSidebar;
			vm.saveStar = saveStar;

			$timeout(function(){
				$mdSidenav('left').open();		
			});

			$scope.$watch('vm.sidenavOpen', function(sidenav){
				if(sidenav === false) {
					$mdSidenav('left')
						.close()
						.then(function(){
							$state.go('stars');
						});
				}
			});

			function closeSidebar(){
				vm.sidenavOpen = false;
			}

			function saveStar(star){
				if(star) {

					star.contact = {
						name: "lin",
						phone: "(555)555-5555",
						email:"helpdesk@gmail.com"
					}

					$scope.$emit('newStar', star);
					vm.sidenavOpen = false;
				}
			}

		});

})();