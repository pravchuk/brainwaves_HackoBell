angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $ionicModal, $timeout) {
	// Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  
  //UIFUNCTION - Pallal
	$scope.wishlist = [];
	
  
  //
  
  

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  $scope.doBarcode = function(){
	  	cordova.plugins.barcodeScanner.scan(
	      function (result) {
	          alert("We got a barcode\n" +
	                "Result: " + result.text + "\n" +
	                "Format: " + result.format + "\n" +
	                "Cancelled: " + result.cancelled);
	      }, 
	      function (error) {
	          alert("Scanning failed: " + error);
	      }
	   );
//alert("hi");
  }

})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})


.controller('AccountCtrl', function($scope) {
})

.controller('LoginCtrl', function($scope,$http) {
	//alert("hi");
	var recDiv = document.getElementById('recomended');
	var dummy = [{id:0,name : "pallal",company : "PNP", emi : "14.5%"},{id:1,name : "pallal",company : "PNP", emi : "14.5%"}];
	//$scope.results = dummy;
	$scope.recomended = dummy;
	$scope.results = [];
	
	
	/*
	$scope.xhr1 = new XMLHttpRequest();
	$scope.xhr1.onreadystatechange = function ()
	{
		if($scope.xhr1.readyState == 4 && $scope.xhr1.status==200)
		{
		//alert("xhr success"+$scope.xhr1.readyState);
			$scope.disable();
			$scope.results = JSON.parse($scope.xhr1.responseText);
		}//functionality for updating the results;
	}
	*/
	
	
	$scope.addRemote = function(sku){
		var USER_ID = 1;
		//$http.get("http://localhost/test.php?uid=1&sku="+sku).error(function(){setTimeout(1800000,function($scope.addRemote(sku)))});
		$http.get("https://hackobell.pythonanywhere.com/add/?id=1&sku="+sku);//;.error(function(){setTimeout(1800000,function($scope.addRemote(sku)))});
		//console.log(i,$scope.results[i]);
	}
	
	$scope.add = function(i){
		$scope.wishlist.push($scope.results[i-1]);
		$scope.addRemote($scope.results[i-1]['sku'])
		console.log(i,$scope.results[i-1]);
	}
	
	$scope.addr = function(i){
		$scope.wishlist.push($scope.recomended[i]);
		$scope.addRemote($scope.results[i]['sku'])
		console.log(i,$scope.results[i]);
	}
	
	
	var handler = function(data)
	{
		//alert('hi');
		$scope.disable();
		//console.log(data);
		$scope.results = [];
		for(var i in data)
		{
			//$scope.results = data;
			$scope.results.push(data[i][parseInt(i)]);
			console.log("Check : ",JSON.stringify(data[i]));
		}
		//functionality for updating the results;
	}

	$scope.disable = function(){
		var recDiv = document.getElementById('recomended');
		recDiv.style.display = "none";
	}
	
	$scope.keyPressed1 = function(ev)
	{
		//alert("hi");
		 ev = ev || event;
		 if(event.target.value=='') {var recDiv = document.getElementById('recomended');
			recDiv.style.display="block";
			$scope.results =[];
		 } 
		//$scope.xhr1.abort();
		//$scope.xhr1.open("GET","http://localhost/test.php?query="+ev.target.value,true);
		//alert("http://192.168.43.57/test.php?query="+ev.target.value);
		//$scope.xhr1.send();
		else 
		//$http.get("http://localhost/test.php?query="+ev.target.value).success(handler);   this is for localhost
		$http.get("https://hackobell.pythonanywhere.com/auto/?name="+ev.target.value).success(handler);
		
	}
	
	
})

.controller('ApplyEMI', function($scope) {

});
