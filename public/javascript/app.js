var app = angular.module("foodTaxi", ['ui.router', 'satellizer']);

app.controller('MainCtrl', MainCtrl);
app.controller('HomeCtrl', HomeCtrl);
app.controller('LoginCtrl', LoginCtrl);
app.controller('SignupCtrl', SignupCtrl);
app.controller('logoutCtrl', logoutCtrl);
app.controller('ProfileCtrl', ProfileCtrl);

app.service('Account', Account);
app.config(configRoutes);

// Routes
configRoutes.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider"];

function configRoutes($stateProvider, $urlRouterProvider, $locationProvider) {
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});

	$urlRouterProvider.otherwise("/");

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'templates/home.html',
			controller: 'HomeCtrl',
			controllerAs: 'home'	
		})
		.state('signup',{
			url: '/signup',
			templateUrl: 'templates/signup.html',
			controller: 'SignupCtrl',
			controllerAs: 'sc',
			resolve: {
				skipIfLoggedIn: skipIfLoggedIn
			}
		})
		.state('login',{
			url: '/login',
			templateUrl:'templates/login',
			controller: 'LoginCtrl',
			controllerAs: 'lc',
			resolve: {
				skipIfLoggedIn: skipIfLoggedIn
			}
		})
		.state('logout',{
			url: '/logout',
			templateUrl: 'templates/logout',
			controller: 'logoutCtrl',
			resolve: {
				loginRequired: loginRequired
			}
		})
		.state('profile', {
			url: '/profile',
			templateUrl: 'templates/profile.html',
			controller: 'ProfileCtrl',
			resolve: {
				loginRequired: loginRequired
			}
		});
	function skipIfLoggedIn($q, $auth) {
		var deferred = $q.defer();
		if ($auth.isAuthenticated()) {
				deferred.reject();
		} else {
				deferred.resolve();
		}
		return deferred.promise;
	}
	function loginRequired($q, $location, $auth) {
		var deferred = $q.defer();
		if ($auth.isAuthenticated()) {
			deferred.resolve();
		} else {
			$location.path('/login');
		}
		return deferred.promise;
	}
}
///////////////////////////////////////////////////////////////////////////////
////CONTROLLERS////////CONTROLLERS/////////CONTROLLERS////////CONTROLLERS/////
/////////////////////////////////////////////////////////////////////////////
MainCtrl.$inject = ["Account"];
function MainCtrl(Account) {
	var vm = this;
	vm.currentCustomer = function() {
		return Account.currentCustomer;
	};
}

LoginCtrl.$inject = ["$location", "Account"];
function LoginCtrl($location, Account) {
	var vm = this;
	vm.new_customer = {}; //form_data
	vm.login = function() {
		Account
		.login(vm.new_customer)
		.then(function() {
			vm.new_customer = {};
			$location.path('/profile');
		});
	};
}

SignupCtrl.$inject = ["$location", "Account"];
function SignupCtrl($location, Account) {
	var vm = this;
	vm.new_customer = {};

	vm.signup = function() {
		Account
			.signup(vm.new_customer)
			.then(function (response) {
				vm.new_customer = {};
				$location.path('/profile');
			});
	};
}

logoutCtrl.$inject = ["$location", "Account"];
function logoutCtrl($location, Account) {
	Account
		.logout()
		.then(function () {
			$location.path('/login');
	});
}




