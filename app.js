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

var page_len = 4
$(document).ready(function(){  
    for(var i = 0 ; i < page_len; i++) {
      $('<div class="item" style="color=black"><img src="the-magic-book/'+i+'.jpeg"><div class="carousel-caption">Hello</div></div>').appendTo('.carousel-inner');
      $('<li data-target="#carousel-example-generic" data-slide-to="'+i+'"></li>').appendTo('.carousel-indicators')
    }
    $('.item').first().addClass('active');
    $('.carousel-indicators > li').first().addClass('active');
    $('#carousel-example-generic').carousel();
});


