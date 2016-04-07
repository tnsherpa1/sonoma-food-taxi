var app = angular.module("foodTaxi", ['ui.router', 'satellizer', 'ngCart']);

app.controller('MainCtrl', MainCtrl);
app.controller('HomeCtrl', HomeCtrl);
app.controller('LoginCtrl', LoginCtrl);
app.controller('SignupCtrl', SignupCtrl);
app.controller('LogoutCtrl', LogoutCtrl);
app.controller('ProfileCtrl', ProfileCtrl);
app.controller('ContactCtrl', ContactCtrl);
app.controller('RestaurantsCtrl', RestaurantsCtrl);
app.controller('RestaurantCtrl', RestaurantCtrl);
app.service('Cart', Cart);
app.service('Account', Account);
// app.service('Cart', Cart);
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
		.state('faqs', {
			url: '/faqs',
			templateUrl: 'templates/faq.html'
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
			templateUrl:'templates/login.html',
			controller: 'LoginCtrl',
			controllerAs: 'lc',
			resolve: {
				skipIfLoggedIn: skipIfLoggedIn
			}
		})
		.state('logout',{
			url: '/logout',
			templateUrl: 'templates/logout',
			controller: 'LogoutCtrl',
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
		})
		.state('contact',{
			url: '/contact',
			templateUrl: 'templates/contact.html',
			controller: 'ContactCtrl'
		})
		.state('restaurants',{
			url: '/restaurants',
			templateUrl: 'templates/restaurants.html',
			controller: 'RestaurantsCtrl'
		})
		.state('menu',{
			url: '/restaurants/:id',
			templateUrl: 'templates/restaurant.html',
			controller: 'RestaurantCtrl'
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

HomeCtrl.$inject = ["Account"];
function HomeCtrl(Account) {
	
}
/*function CartCtrl() {
	var vm = this;
	vm.cart = {};
	vm.add = function(){
		console.log("controller called....");
		console.log(vm.cart);
	};
}*/

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

LogoutCtrl.$inject = ["$location", "Account"];
function LogoutCtrl($location, Account) {
	Account
		.logout()
		.then(function () {
			$location.path('/login');
	});
}

ProfileCtrl.$inject = ["$location", "Account"];
function ProfileCtrl($location, Account) {
	var vm = this;
	vm.new_profile = {};

	vm.updateProfile = function() {
		Account
		.updateProfile(vm.new_profile)
		.then (function() {
			vm.showEditForm =false;
		});
	};
}
ContactCtrl.$inject = ["$location", "Account"];
function ContactCtrl($location, Account) {

}
RestaurantsCtrl.$inject = ["$http"];
	function RestaurantsCtrl($http){
		var vm = this;
		vm.restaurants = [];
		$http
				.get('/api/restaurants')
				.then(function(response) {
					vm.restaurants = response.data;
					console.log(vm.restaurants);
				});
	}

RestaurantCtrl.$inject = ["$http", "$stateParams", "$scope", "ngCart", "Cart"];
function RestaurantCtrl($http, $stateParams, $scope, ngCart, Cart){
	var vm = this;
	vm.restaurant = [];
	var restaurantId = $stateParams.id;
	$http
			.get('/api/restaurants/'+ restaurantId)
			.then(function(response) {
				$scope.restaurant = response.data;
				// console.log(vm.restaurant); //TODO: Ask why it prints twice
			});
	$scope.Cart = Cart;
	console.log("here: ", Cart);
}
///////////////////////////////////////////////////////////////////////////////
////SERVICES////////SERVICES/////////SERVICES////////SERVICES/////SERVICES////
/////////////////////////////////////////////////////////////////////////////
Account.$inject = ["$http", "$q", "$auth"];
function Account($http, $q, $auth) {
	var self = this;
	self.customer = null;

	self.signup = signup;
	self.login = login;
	self.logout = logout;
	self.currentCustomer = currentCustomer;
	self.getProfile = getProfile;
	self.updateProfile = updateProfile;

	function signup(customerData) {
		return (
			$auth
				.signup(customerData)
				.then (
					function onSuccess(response) {
						$auth.setToken(response.data.token);
					},
					function onError(error) {
						console.error(error);
					}
				)
			);
	}
	function login(customerData) {
		return (
			$auth
				.login(customerData)
				.then ( 
					function onSuccess(response) {
					$auth.setToken(response.data.token);
				},
					function onError(error) {
						console.error(error);
					}
				)
			);
	}
	function logout() {
		return ( 
			$auth
				.logout()
				.then(function () {
					self.customer = null;
				})
			);
	}
	function currentCustomer() {
		if ( self.customer ) { return self.customer; }
		if ( !auth.isAuthenticated() ) { return null; }

		var deferred = $q.defer();
		getProfile().then(
			function onSuccess(response) {
				self.customer = response.data;
				deferred.resolve(self.customer);
			},
			function onError() {
				$auth.logout();
				self.customer = null;
				deferred.reject();
			}
		);
		self.customer = promise = deferred.promise;
		return promise;
	}
	function getProfile() {
		return $http.get('/api/me');
	}

	function updateProfile(profileData) {
		return (
			$http
				.put('/api/me', profileData)
				.then(
					function (response) {
						self.customer = response.data;
					})
		);
	}
}

/////CART SERVICE/////////
Cart.$inject = ["$http"];
function Cart($http) {
	var self = this;
	self.cart = [];
	self.add = function(item, price) {
		var myCart = function(item, price, qty) {
			this.item = item;
			this.price = price;
			this.qty = qty;
		};
		// window.myCart = myCart;
   	var itemcart = new myCart({item: item , price: price, qty: 1});

   	window.data = itemcart;
   	self.cart.push(itemcart);
		console.log("adding item to cart:", item , "price: ", price);
		console.log(Cart);
 };

 //Total Calculator
 self.total = function() {
      return self.cart.reduce(function(sum, item) {
      	console.log("hey: ", item.item.price, "and ", sum);
        return sum + Number(item.item.price);
      }, 0);
    };
//Remove items from Cart
self.remove = function(item) {
	console.log("removing....");
  var index = self.cart.indexOf(item);
  if (index >= 0) {
    self.cart.splice(index, 1);
  }
  if (!self.cart.length) {
    self.restaurant = {};
  }
};
}





















