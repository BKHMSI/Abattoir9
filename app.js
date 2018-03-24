var app = angular.module("Abattoir",[]);

app.controller('Controller', ['$scope', '$http', function($scope,$http) {
    $scope.title = "StoryBuddy";
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

var question = "<div class='item'>\
<h1>What did Hanafy do to Hamada?</h1>\
<br><br>\
<input class='form-control form-control-lg answer' type='text' placeholder='Enter your answer'>\
<br><br>\
<button type='button' class='btn btn-primary btn-lg answer-submit'>Submit</button>\
<br>\
<h3 class='msg'>Correct! Click right to continue.</h3>\
</div>"

var score = "<div class='item score'>\
<img src='img/fireworks.png'>\
<h1 class='score-header'>You scored 9/10!</h1>\
<h3 class='score-sub'>Great job! Let's start another story.</h3>\
</div>"

var page_len = 4
$(document).ready(function(){  
    for(var i = 0 ; i < page_len; i++) {
      $('<div class="item"><img src="the-magic-book/'+i+'.jpeg" style="width:100%;"></div>').appendTo('.carousel-inner');
      $('<li data-target="#carousel-example-generic" data-slide-to="'+i+'"></li>').appendTo('.carousel-indicators')
    }
    $(question).appendTo('.carousel-inner');
    $(score).appendTo('.carousel-inner');
    $('.item').first().addClass('active');
    $('.carousel-indicators > li').first().addClass('active');
    $('#carousel-example-generic').carousel();
});


