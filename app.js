var app = angular.module("Abattoir",[]);

app.controller('Controller', ['$scope', '$http', function($scope,$http) {
    $scope.title = "Abattoir 9";
    $scope.subtitle = 'Your Study Buddy'
    $scope.error = '';
    $scope.text = "";

    $scope.book = [
        {
            src: "the-magic-book/1.jpeg",
            caption: "Caption 1"
        },
        {
            src: "the-magic-book/2.jpeg",
            caption: "Caption 2"
        },
        {
            src: "the-magic-book/3.jpeg",
            caption: "Caption 1"
        },
    ]
  
    $scope.process = function(){
        $scope.error = '';
        if($scope.text.trim() != ""){
            $.ajax({
                type: 'get',
                url: 'query',
                cache: false,
                async: 'asynchronous',
                dataType: 'json',
                data: { text: $scope.text },
                success: function(data) {
                    console.log(data)
                },
                error: function(request, status, error) {
                    console.log("Error: " + error);
                    $scope.error = error
                }
            });
        }else{
            $scope.error = "Error: You didn't provide text";
        }
    }

}]);


