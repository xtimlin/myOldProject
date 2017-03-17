angular
	.module('ngStars', ['ngMaterial', 'ui.router'])
	.config(function($mdThemingProvider, $stateProvider){

		$mdThemingProvider.theme('default')
			.primaryPalette('teal')
			.accentPalette('orange');

		$stateProvider
			.state('stars', {
				url:'',
				templateUrl:'components/stars/stars.tpl.html',
				controller: 'starsCtrl as vm'
			})
			.state('stars.new', {
				url:'/new',
				templateUrl:'components/stars/new/stars.new.tpl.html',
				controller: 'newStarsCtrl as vm'
			})
			.state('stars.edit', {
				url:'/edit/:id',//we put a : ahead of it, so id is variable, which is picked up by the id in state.go
				templateUrl:'components/stars/edit/stars.edit.tpl.html',
				controller: 'editStarsCtrl as vm',
				params:{
					star:null
				}
			});
	});



