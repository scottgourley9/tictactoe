angular.module('ticTacToe', ['ui.router']).config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/')
  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'views/home.html',
    controller: 'homeCtrl'
  })
  .state('game', {
    url: '/game',
    templateUrl: 'views/game.html',
    controller: 'gameCtrl'
  })
})
