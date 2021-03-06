var main_app = angular.module('main_app',['ngTable','LocalStorageModule','ngMaterial','jkAngularCarousel']);



main_app.controller('main_controller', ['$scope','$http', 'NgTableParams','localStorageService','$location','$filter', function($scope,$http,NgTableParams,localStorageService,$location,$filter) {
		
		
    $scope.uploadme;
	$scope.aviso={};
	$scope.aviso.images = [];
	$scope.aviso.visible = false;
	$scope.aviso.sensible = false;
	var object={
		src : ''
	};
	$scope.aviso.images.push(object);
		
	$scope.subir_informacion = function() {
		 $scope.result_upload = "";
		/* EJEMPLO DE POST REQUEST
		{
			"api_password" : "shellbomb",
			"file_name" : "ojitos",
			"file_content" : {
				  "images": [
					{
					  "src": ""
					}
				  ],
				  "visible": true,
				  "sensible": false,
				  "name": "Ferreteria Venus",
				  "address": "Teniente Galeano 2358",
				  "description": "Una ferreteria re pipi cucu",
				  "tags": "ferreteria barraca reparacion tornillos",
				  "phones": [
					"22271616"
				  ]
				}
			}
		*/
		$scope.aviso.phones = $scope.phones_input.split(";");
		var post_data = {};
		post_data.api_password = $scope.api_password_input;
		post_data.file_name = $scope.file_name_input;
		post_data.file_content = $scope.aviso;
		$http({
							method: 'POST',
							url: 'http://45.56.89.82:3000/put_aviso',
							headers: {
							   'Content-Type': 'application/json'
							},
							data:post_data
							
							  
							}).then(function successCallback(response) {
									// this callback will be called asynchronously
									// when the response is available
									 $scope.result_upload = "Success!!";																				
									
							}, function errorCallback(err) {
										// called asynchronously if an error occurs
									// or server returns response with an error status.
									$scope.result_upload = "Error : " + err;									
									
							});
		
	}

    $scope.uploadImage = function() {
	  $scope.result_upload = "";
      var fd = new FormData();
      var imgBlob = dataURItoBlob($scope.uploadme);
      fd.append('file', imgBlob);
      $http.post(
          'http://45.56.89.82:4000/upload_aviso',
          fd, {
            transformRequest: angular.identity,
            headers: {
              'Content-Type': undefined
            }
          }
        )
        .success(function(response) {
          $scope.result_upload = "Successfully uploaded"
        })
        .error(function(response) {
          $scope.result_upload = "Error uploading picture : " + response
        });
    }


    //you need this function to convert the dataURI
    function dataURItoBlob(dataURI) {
      var binary = atob(dataURI.split(',')[1]);
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      var array = [];
      for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      return new Blob([new Uint8Array(array)], {
        type: mimeString
      });
    }
	
			
	}]);

	//your directive
main_app.directive("fileread", [
  function() {
    return {
      scope: {
        fileread: "="
      },
      link: function(scope, element, attributes) {
        element.bind("change", function(changeEvent) {
			
          var reader = new FileReader();
		  reader.onload = function(loadEvent) {
            scope.$apply(function() {
              scope.fileread = loadEvent.target.result;
            });
          }
          reader.readAsDataURL(changeEvent.target.files[0]);
        });
      }
    }
  }
]);
	
	
  
  
