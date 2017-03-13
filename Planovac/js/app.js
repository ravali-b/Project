var app = angular.module("myApp", [])


app.controller("RegisterController", function ($scope, $http, $httpParamSerializerJQLike,$window) {
    $scope.createFixed = function() {
        alert("hi");
        $window.location.href = '/lab7_mongo/www/Login.html';
    };

    $scope.pageClass = 'register';
    $scope.register = function(firstname, lastname, username, mobile, sso, sid, password, cpassword) {

        $http({
            method: 'POST',
            url : 'https://api.mongolab.com/api/1/databases/planovac/collections/users?apiKey=1fB-Vh6r9XKxu-n0eW_4OeXvlAEViZl3',
            data: JSON.stringify({
                firstname: firstname,
                lastname: lastname,
                username: username,
                mobile: mobile,
                sso: sso,
                sid: sid,
                password: password,
                cpassword: cpassword
            }),
            contentType: "application/json"
        }).success(function() {
            $scope.firstname ="";
            $scope.lastname ="";
            $scope.username ="";
            $scope.mobile ="";
            $scope.sso ="";
            $scope.sid ="";
            $scope.password ="";
            $scope.cpassword ="";

            $scope.msg ="User created successfully";
            /*$window.location.href = "/lab7_mongo/www/Login.html";*/
        })
    }

});


app.controller("LoginController", function ($scope, $http, $httpParamSerializerJQLike,$window) {

    $scope.pageClass = 'login';
    $scope.login = function(username, pword) {
        sessionStorage.setItem('username1',username);
        $scope.uname = username;
        alert("You're logged in as "+$scope.uname);
        $http({
            method: 'GET',
            url : 'https://api.mongolab.com/api/1/databases/planovac/collections/users?apiKey=1fB-Vh6r9XKxu-n0eW_4OeXvlAEViZl3',
            /*contentType: "application/json"*/
        }).then(function success(data) {
            //alert(data);
            $scope.data1 = angular.fromJson(data);
            $window.location.href = "home.html";

        })

    }

});

app.controller("ProfileController", function ($scope, $http, $httpParamSerializerJQLike,$window) {

    $scope.pageClass = 'profile';

        $scope.username = sessionStorage.getItem("username1");
        alert($scope.username);
        $http({
            method: 'GET',
            url : 'https://api.mongolab.com/api/1/databases/planovac/collections/users?apiKey=1fB-Vh6r9XKxu-n0eW_4OeXvlAEViZl3',
            /*contentType: "application/json"*/
        }).then(function success(data) {
            //alert(data);
            $scope.data1 = angular.fromJson(data);
            //$window.location.href = "home.html";

        })


});

function logout()
{
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}
function login()
{
    var myParams = {
        'clientid' : '738433218081-7111mc5s0vgkfgqjoaeahr87alrpd3vm.apps.googleusercontent.com',
        'cookiepolicy' : 'single_host_origin',
        'callback' : 'loginCallback',
        'approvalprompt':'force',
        'scope' : 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'
    };
    gapi.auth.signIn(myParams);

}
function loginCallback(result)
{
    if(result['status']['signed_in'])
    {
        var request = gapi.client.plus.people.get(
            {
                'userId': 'me'
            });
        request.execute(function (resp)
        {
            var email = '';
            if(resp['emails'])
            {
                for(i = 0; i < resp['emails'].length; i++)
                {
                    if(resp['emails'][i]['type'] == 'account')
                    {
                        email = resp['emails'][i]['value'];
                    }
                }
            }
            var dispname = resp['displayName'];
            var str = "Name:" + resp['displayName'] + "<br>";
            str += "<img src='" + resp['image']['url'] + "' /><br>";
            str += "Email:" + email + "<br>";
            document.getElementById("dispname").innerHTML = dispname;
            document.getElementById("profile").innerHTML = str;
            window.location.replace("home.html");
        });
    }
}
function onLoadCallback()
{
    gapi.client.setApiKey('AIzaSyA23Qn5CJLuLm1_rfY1qBPa6i1s1Gi2J1w');
    gapi.client.load('plus', 'v1',function(){});
}
(function() {
    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = 'https://apis.google.com/js/client.js?onload=onLoadCallback';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
})();


