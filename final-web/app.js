var app = angular.module("Abattoir",[]);

app.controller('Controller', ['$scope', '$http', function($scope,$http) {
    $scope.title = "StoryBuddy";
    $scope.subtitle = 'Your Study Buddy'
    $scope.error = '';
    $scope.text = "";
    $scope.score = 5;
    $scope.current = 0;
    $scope.currentQ = "";
    $scope.userResponse = "";
    var audio = null;
    $scope.loading = false;

    $scope.book = [
        {
            is_q: false,
            src: "the-magic-book/0.jpeg",
            audio: "the-magic-book/18_2.mp3",
            caption: "Caption 1"
        },
        {
            is_q: false,
            src: "the-magic-book/1.jpeg",
            audio: "",
            caption: "Caption 2"
        },
        {
            is_q: true,
            question: "This is Q2",
            usrAns: "",
            answer: "cat loves dogs",
            result: ""
        },
        {
            is_q: false,
            src: "the-magic-book/2.jpeg",
            audio: "",
            caption: "Caption 1"
        },
        {
            is_q: true,
            question: "This is Q3",
            usrAns: "",
            answer: "dogs hate cats",
            result: ""
        },
        {
            is_q: false,
            src: "the-magic-book/3.jpeg",
            audio: "",
            caption: "Caption 1"
        },
        {
            is_q: true,
            question: "This is Q4",
            usrAns: "",
            answer: "yes",
            result: ""
        },
        {
            
        }
    ]

    $scope.numPages = $scope.book.length;

    $scope.nextPage = function(){
        $scope.current++;
        if($scope.current > $scope.numPages) 
            $scope.current = 0;
        console.log($scope.current);
    }

    $scope.prevPage = function(){
        $scope.current--;
        if($scope.current < 0) 
            $scope.current = $scope.numPages;
        console.log($scope.current);
    }

    $scope.playAudio = function(){
        audio = new Audio($scope.book[$scope.current].audio);
        audio.play();
    }

    $scope.pauseAudio = function(){
        if (audio != null)
            audio.pause();
    }
  
    $scope.submitBtn = function(){
        $scope.error = '';
        userAnswer = $scope.book[$scope.current].usrAns;
        if(userAnswer.trim() != ""){
            $scope.loading = true;
            $http({
                url: 'query',
                method: 'GET',
                params: { text: $scope.book[$scope.current].answer, ans: userAnswer }
            }).then(function mySuccess(response){
                $scope.loading = false;
                var sim = response.data["sim"];
                if(sim >= 0.75){
                    $scope.book[$scope.current].result = "Great Answer! :D";
                    $scope.book[$scope.current].audio = "the-magic-book/result_1.mp3";
                }else if(sim >= 0.4){
                    $scope.book[$scope.current].result = "You're Close! ;)";
                    $scope.book[$scope.current].audio = "the-magic-book/result_2.mp3";
                }
                else{
                    $scope.book[$scope.current].result = "Mmm... :)";
                }
                if (!$scope.$$phase) $scope.$apply()
            }, function myError(response){
                $scope.error = response.statusText;
            });
        }else{
            $scope.error = "Error: You didn't provide text";
        }
    }

}]);

$(document).ready(function(){
    $('.item').first().addClass('active');
    $('.carousel-indicators > li').first().addClass('active');
    $('#carousel-example-generic').carousel();
});




