var app = angular.module("myApp", [])
app.run(function ($http) {
    // Sends this header with any AJAX request
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    // Send this header only in post requests. Specifies you are sending a JSON object
    $http.defaults.headers.post['dataType'] = 'json'
});
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
                fname: firstname,
                lname: lastname,
                uname: username,
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
        //sessionStorage.setItem('username1',username);
        if(username==null||pword==null) {
            alert("Username/ password can't be empty");
            $window.location.replace("login.html");
        }
        else {
        $scope.uname = username;
        $scope.pass = pword;
        $http({
            method: 'GET',
            url : 'https://api.mongolab.com/api/1/databases/planovac/collections/users?apiKey=1fB-Vh6r9XKxu-n0eW_4OeXvlAEViZl3',
            /*contentType: "application/json"*/
        }).success(function(response) {
            //alert(response);
            //$scope.data1 = angular.fromJson(data);
            var list = response;
            var count = 0;
            for (i = 0; i < list.length; i++) {
                if (list[i].username == $scope.uname && list[i].password == $scope.pass) {
                    $scope.user=list[i].username;
                    sessionStorage.setItem("firstname", list[i].firstname);
                    sessionStorage.setItem("lastname", list[i].lastname);
                    sessionStorage.setItem("username", list[i].username);
                    sessionStorage.setItem("mobile", list[i].mobile);
                    sessionStorage.setItem("sso", list[i].sso);
                    sessionStorage.setItem("sid", list[i].sid);
                    alert("You're logged in as "+$scope.uname);
                    $window.location.href = "home.html";
                    exit(0);
                }
                else {
                    //alert("Incorrect username/password");
                    count++;
                }
                //$window.location.href = "home.html";
            }
            if(count == list.length)
            {
                alert("Incorrect username/password");
                $window.location.replace("login.html");
            }
        })
        }

    }

});

app.controller("ClassController", function ($scope, $http, $httpParamSerializerJQLike,$window) {
    $scope.showPage = function(){
        var page = document.getElementById("innerform");
        page.style.visibility='visible';
    }
    $scope.viewClassPage = function(){
        alert("in view class function");
        var page = document.getElementById("innerform2");
        page.style.visibility='visible';
    }
    $scope.username = sessionStorage.getItem("username");
    var uname = sessionStorage.getItem("username");
    $scope.pageClass = 'classes';
    for(i=0;i<3;i++){
    $scope.addClass = function(classes) {
        //alert("inside function");
        var e = document.getElementById("classes");
        //alert(e);
        var cname = e.options[e.selectedIndex].value;
        //alert(cname);
        var str_array = cname.split(',');
        //alert(str_array[0]);
        $http({
            method: 'PUT',
            url : 'https://api.mongolab.com/api/1/databases/planovac/collections/users?apiKey=1fB-Vh6r9XKxu-n0eW_4OeXvlAEViZl3&q={"username":"'+uname+'"}',
            data: JSON.stringify({
                "$set" : {classname: str_array[0], fromtime: str_array[1], totime: str_array[2], location: str_array[3]}
            }),
            type: "PUT",
            contentType: "application/json"
        }).success(function() {
            $scope.classname ="";
            $scope.fromtime ="";
            $scope.totime ="";
            $scope.location ="";
            alert("Class Successfully added");
        })
    } }
    $scope.deleteClass = function() {
        $http({
            method: 'PUT',
            url : 'https://api.mongolab.com/api/1/databases/planovac/collections/users?apiKey=1fB-Vh6r9XKxu-n0eW_4OeXvlAEViZl3&q={"username":"'+uname+'"}',
            data: JSON.stringify({
                "$unset": {classname: "", fromtime: "", totime: "", location: ""}
            }),
            type: "PUT",
            contentType: "application/json"
        }).then(function success(data) {
            //alert(data);
            $scope.data1 = angular.fromJson(data);
            //$window.location.href = "home.html";
            alert("Class Deleted");
        })
    }
    $http({
        method: 'GET',
        url: 'https://api.mongolab.com/api/1/databases/planovac/collections/users?apiKey=1fB-Vh6r9XKxu-n0eW_4OeXvlAEViZl3',
    }).then(function success(data) {
        //alert(data);
        $scope.data1 = angular.fromJson(data);
        //$window.location.href = "home.html";
    })

});

app.controller("ProfileController", function ($scope, $http, $httpParamSerializerJQLike,$window) {
    $scope.pageClass = 'profile';

        $scope.username = sessionStorage.getItem("username");
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


app.controller("DiscussController", function ($scope, $http, $httpParamSerializerJQLike,$window) {
//alert("hi");
    $scope.pageClass = 'register';
    $scope.register = function(topic,comment) {

        $http({
            method: 'POST',
            url : 'https://api.mongolab.com/api/1/databases/planovac/collections/discuss?apiKey=1fB-Vh6r9XKxu-n0eW_4OeXvlAEViZl3',
            data: JSON.stringify({
                topic: topic,
                comment: comment
            }),
            contentType: "application/json"
        }).success(function() {
            $scope.topic ="";
            $scope.comment ="";
            $scope.msg ="Topic created successfully";
            /*$window.location.href = "/lab7_mongo/www/Login.html";*/
        })
    }
    $scope.showtopic = function(topic) {
        $scope.topic = topic;
        $http({
            method: 'GET',
            url : 'https://api.mongolab.com/api/1/databases/planovac/collections/discuss?apiKey=1fB-Vh6r9XKxu-n0eW_4OeXvlAEViZl3',
            /*contentType: "application/json"*/
        }).then(function success(data) {
            //alert(data);
            $scope.data1 = angular.fromJson(data);
            /*$window.location.href = "/lab7_mongo/www/Home.html";*/

        })
    }
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
            str += "URL:" + resp['url'] + "<br>";
            document.getElementById("dispname").innerHTML = dispname;
            sessionStorage.setItem("username",dispname);
            sessionStorage.setItem("profile",str);
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


