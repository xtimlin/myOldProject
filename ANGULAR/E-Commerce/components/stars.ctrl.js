(function(){
	
	"use strict";

	angular
		.module('ngStars')
		.controller('starsCtrl', function($scope, $http, starsFactory, $mdSidenav, $mdToast, $mdDialog){

			var vm = this;

			vm.openSidebar = openSidebar;
			vm.closeSidebar = closeSidebar;
			vm.saveStar = saveStar;
			vm.editStar = editStar;
			vm.saveEdit = saveEdit;
			vm.deleteStar = deleteStar;

			vm.stars;
			vm.categories;
			vm.editing;
			vm.star;

			starsFactory.getStars().then(function(response){
				vm.stars = response.data;
				vm.categories = getCategories(vm.stars);

			});

			var contact = {
				name: "Allen",
				phone: "(555)555-5555",
				email:"starTech@gmail.com"
			}


			function openSidebar(){
				$mdSidenav('left').open();
			}

			function closeSidebar(){
				$mdSidenav('left').close();
			}

			function saveStar(star){
				if (star) {
					star.contact = contact;
					vm.stars.push(star);
					vm.star = {};
					vm.closeSidebar();
					showToast("Star saved!");
				}
			}

			function editStar(star) {
				vm.editing = true;
				openSidebar();
				vm.star = star;
			}

			function saveEdit(){
				vm.editing = false;
				vm.star = {};
				closeSidebar();
				showToast("Edit saved!");
			}

			function deleteStar(event, star){

				var confirm = $mdDialog.confirm()
								.title('Are you sure to delelte ' + star.title + '?')
								.ok('Yes')
								.cancel('No')
								.targetEvent(event);
				$mdDialog.show(confirm).then(function(){
					var index = vm.stars.indexOf(star);
					vm.stars.splice(index, 1);
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

			function getCategories(stars) {
				var categories = [];

				angular.forEach(stars, function(item){
					angular.forEach(item.categories, function(category){
						categories.push(category);
					});
				});

				return _.uniq(categories);
			}

		});

})();
