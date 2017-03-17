(function(){
	"use strict";

	angular
		.module('ngStars')
		.controller('editStarsCtrl', function($scope, $state, $mdSidenav, $timeout, $mdDialog, starsFactory){

			var vm = this;
			vm.closeSidebar = closeSidebar;
			vm.saveEdit = saveEdit;
			vm.star = $state.params.star;

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

			function saveEdit(){
				$scope.$emit('editSaved', 'Edit Saved!!');
				vm.sidenavOpen = false;
			}

		});

})();