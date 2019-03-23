var app = angular.module('app', ['ngMaterial', 'ngMessages', 'ui.router', 'ngFileUpload', 'ngMaterialDatePicker']);
app.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/login');
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: '../templates/login.html'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: '../templates/signup.html'
    })
    .state('home', {
      url: '/home',
      templateUrl: '../templates/home.html',
    })
    .state('home.displayRecords', {
      url: '/displayRecords',
      // templateUrl: '../templates/medicalSheet.html'
      templateUrl: '../templates/displayRecords.html'

    })
    .state('home.manageUser', {
      url: '/manageUser',
      // templateUrl: '../templates/medicalSheet.html'
      templateUrl: '../templates/manageUser.html'

    })
    .state('home.medicalSheet', {
      url: '/medicalSheet',
      // templateUrl: '../templates/medicalSheet.html'
      templateUrl: '../templates/medicalSheet.html'

    })
    .state('home.patientId', {
      url: '/patientId',
      templateUrl: '../templates/patientId.html'
    })
    .state('home.requestpatientId', {
      url: '/requestpatientId',
      templateUrl: '../templates/requestpatientId.html'
    })
    .state('home.explore', {
      url: '/explore',
      templateUrl: '../templates/explore.html'
    })
  // .state('home.manageUser', {
  //   url: '/manageUser',
  //   templateUrl: '../templates/manageUser.html'
  // })
});

app.controller('ctrl', function ($scope, $state, $http, $mdToast) {
  $scope.uri = "http://localhost:4002"
  $scope.patientId = "";
  $scope.rights = null;
  $scope.search = ""
  $scope.patientDetails = {}
  $scope.registerUser = {};
  $scope.userId = null;
  $scope.tilesData = []
  $scope.options = {
    'user': ["Home", "Manage", "SignOut"],
    'medical': ["Home", "Request", "Access Data", "Add Data", "SignOut"],
    'research': ["Explore", "Chats"]
  }
  $scope.searchElement = function (data) {
    $http.get($scope.uri + '/search/' + data).then(function (data) {
      console.log(data);
      $scope.searchResult = data.data.data

    });

  }
  $scope.getUserDetails = function (id) {
    // console.log(id);

    $http.get($scope.uri + '/getUserInfo/' + id + '/' + $scope.userDetails.userId).then(function (data) {
      if (data.data.success) {
        $scope.patientDetails = data.data
        $scope.tilesData = JSON.parse(data.data.data)

        // console.log(data);
        $state.go('home.displayRecords');
      } else {
        $mdToast.show(
          $mdToast.simple()
            .textContent('Wrong Credentials')
            .position('top right')
            .hideDelay(3000)
        );
      }


    })
  }

  $scope.requestUserDetails = function (id) {
    // console.log(id);

    $http.get($scope.uri + '/requestUserDetails/' + id + "/" + $scope.userDetails.userId + "/" + $scope.userDetails.name).then(function (data) {
      console.log(data);

      // $scope.patientDetails = data.data
      // $scope.tilesData = JSON.parse(data.data.data)

      // // console.log(data);
      // $state.go('home.displayRecords');

    })
  }



  $scope.signup = function (data) {
    $http.post($scope.uri + '/registerUser', data).then(function (data) {
      if (data.data.success) {
        $mdToast.show(
          $mdToast.simple()
            .textContent('User Registered Successfully !!')
            .position('top right')
            .hideDelay(3000)
        );
        $state.go('login');

      } else {
        $mdToast.show(
          $mdToast.simple()
            .textContent('User Not Registered !!')
            .position('top right')
            .hideDelay(3000)
        );
      }
    });
  }

  $scope.signupPage = function (data) {
    $state.go('signup');
  }

  $scope.sideNavOption = function (option) {
    console.log($scope.rights);

    if (option == "SignOut") {
      localStorage.removeItem('userDetails');
      localStorage.removeItem('userId');
      $state.go('login');
    }
    if (option == "Manage" && $scope.rights == "user") {
      $state.go('home.manageUser')
    }
    if (option == "Add Data" && $scope.rights == "medical") {
      $state.go('home.medicalSheet')
    }
    if (option == "Home" && $scope.rights == "medical") {
      $state.go('home.medicalSheet')
    }
    if (option == "Request" && $scope.rights == "medical") {
      $state.go('home.requestpatientId')
    }
    if (option == "Access Data" && $scope.rights == "medical") {
      $state.go('home.patientId')
    }

  }

  $scope.saveMedicalSheet = function (data) {

    data.medic = $scope.userDetails.userId
    data.datetime = new Date()

    let payload = {
      userId: $scope.patientDetails.userId,
      data: data
    }
    console.log(payload);

    $http.post($scope.uri + '/putMedicalSheet', payload).then(function (data) {
      console.log(data);

      // $mdToast.show(
      //   $mdToast.simple()
      //     .textContent('Status Changed')
      //     .position('top right')
      //     .hideDelay(2000)
      // );
    })

  }

  $scope.displaySelectedRecord = function (data) {
    $scope.patientDetails = data
    console.log($scope.patientDetails);

    $state.go('home.medicalSheet')

  }

  $scope.changeStatus = function (option) {
    console.log(option);
    let data = {
      email: $scope.userDetails.email,
      status: option
    }
    $http.post($scope.uri + '/changeProfileStatus', data).then(function (data) {
      $mdToast.show(
        $mdToast.simple()
          .textContent('Status Changed')
          .position('top right')
          .hideDelay(2000)
      );
    })

  }



  $scope.login = function (data) {
    // $state.go('home');
    $http.post($scope.uri + '/signinUser', data).then(function (data) {
      console.log(data);

      if (data.data.success) {
        localStorage.setItem('userDetails', JSON.stringify(data.data));
        localStorage.setItem('userId', data.data.userId);
        $scope.userId = data.data.userId;
        $scope.userDetails = data.data;
        console.log($scope.userDetails);
        $scope.rights = data.data.rights;
        $scope.displayList = $scope.options[data.data.rights]
        console.log($scope.displayList);

        if ($scope.rights == "user") {
          $state.go('home.displayRecords');
          $scope.tilesData = JSON.parse($scope.userDetails.data)

        }
        if ($scope.rights == "medical") {
          $state.go('home.patientId');

        }
        if ($scope.rights == "research") {
          $state.go('home.explore');

        }
        // location.reload();
      } else {
        $mdToast.show(
          $mdToast.simple()
            .textContent('Invalid Credentials')
            .position('top right')
            .hideDelay(3000)
        );
      }
    });
  }


});
