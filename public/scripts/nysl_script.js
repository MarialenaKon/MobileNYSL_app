$(function () {

    showHome();

    document.getElementById("login").addEventListener("click", login);
    document.getElementById("sign-out").addEventListener("click", logOut);

    document.getElementById("btn1").addEventListener("click", showHome);
    document.getElementById("btn2").addEventListener("click", showGameInfo);
    document.getElementById("btn3").addEventListener("click", showContact);

    function showHome() {
        $("#index").show().addClass("fade in");
        $("#info").hide().addClass("fade out");
        $("#game-detail").removeClass("shown fade in").addClass("hidden fade out");
        $("#contact").hide().addClass("fade out");
        $("#btn1").addClass("selected");
        $("#btn2").removeClass("selected");
        $("#btn3").removeClass("selected");
    }

    function showGameInfo() {
        $("#info").show().addClass("fade in");
        $("#index").hide().addClass("fade out");
        $("#addInfo-l").removeClass("hidden fade out").addClass("shown fade in");
        $("#additional-info").removeClass("shown fade in").addClass("hidden fade out");
        $("#game-detail").removeClass("shown fade in").addClass("hidden fade out");
        $("#contact").hide().addClass("fade out");
        $("#btn2").addClass("selected");
        $("#btn1").removeClass("selected");
        $("#btn3").removeClass("selected");

        
        document.getElementById("headingOne").addEventListener("click", toggleSeptember);
        document.getElementById("headingTwo").addEventListener("click", toggleOctober);
        
        loadAllGames();
        moveInfoDown();
    }


    function loadAllGames() {
        var games = [];
        var data = {};
        var url = "https://api.myjson.com/bins/jj2bp";

        $.getJSON(url, function (data) {

            games = data.games;
            console.log(games);

            renderAllGames(data); //important to use data as a parameter, games will be the list used in the template
            
            showThisGame(games);
            //fillChatRoom(games);

        });

    }

    
    function renderAllGames(data) {

        console.log(data);
        var template = $("#game-detail-tmpl").html();
        console.log(template);
        var rendered = Mustache.render(template, data);

        document.getElementById("game-detail").innerHTML = rendered;

    }

    
    function moveInfoDown() {
        var $addInfo = $("#additional-info");
        var $clonedAddInfo = $addInfo.clone();
        $("#additional-info").addClass("hidden");
        $clonedAddInfo.insertAfter("#accordion").attr("id", "addInfo-l").css({
            "margin": "3.5% 2%",
            "width": "75%",
            "text-align": "left"
        }).addClass("game-title-l hidden fade out");
    }
    
    function showContact() {
        $("#contact").show().addClass("fade in");
        $("#info").hide().addClass("fade out");
        $("#index").hide().addClass("fade out");
        $("#game-detail").removeClass("shown fade in").addClass("hidden fade out");
        $("#btn3").addClass("selected");
        $("#btn1").removeClass("selected");
        $("#btn2").removeClass("selected");
    }


    function toggleSeptember() {
        $("#collapseTwo").collapse('toggle');
        $("#collapseOne").collapse('toggle');
        $("#accordion span").toggleClass("glyphicon glyphicon-triangle-bottom");
        $("#accordion span").toggleClass("glyphicon glyphicon-triangle-right");
    }

    function toggleOctober() {
        $("#collapseOne").collapse("toggle");
        $("#collapseTwo").collapse("toggle");
        $("#accordion span").toggleClass("glyphicon glyphicon-triangle-bottom");
        $("#accordion span").toggleClass("glyphicon glyphicon-triangle-right");
    }


    function showThisGame(games) {

        $("select").change(function () {


            $("#additional-info").removeClass("hidden fade out").addClass("shown fade in");
            $("#addInfo-l").removeClass("shown fade in").addClass("hidden fade out");
            $("#game-detail").removeClass("hidden fade out").addClass("shown fade in");
            $("#game-detail >.shown.fade.in").removeClass("shown fade in").addClass("hidden fade out");
            
            
            for (var i = 0; i < games.length; i++) {

                if (this.value == ("#game-detail" + i)) {
                    console.log("#game-detail" + i);
                    $("#game-detail" + i).removeClass("hidden fade out").addClass("shown fade in");
                }
            }


            $("select").val("select");

        });


    }



    //    function fillChatRoom(games) {
    // 
    //        var template1 = $("#chat-tmpl").html();
    //        var html1 = Mustache.render(template1, games);
    //
    //        $("#chat").html(html1);
    //    }


    //getPosts();


    function login() {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)

            .then(function (result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                console.log(user);
                console.log("Login!!");

                $(".chat-btn").removeClass("hidden");


                // ...
            }).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });

    }

    /*function writeNewPost() {

        var text = document.getElementById("body").value;
        var userName = firebase.auth().currentUser.displayName;
        //we are logged in so can access this information
        var postData = {
            name: userName,
            body: text
        };
        //this is the info attached to any given post that is submitted
        //get a key for a new post
        var newPostKey =
            firebase.database().ref().child('myMatch').push().key;
        //have created a key that is empty and we're storing it in the database so that we can fill it soon
        var updates = {};
        updates[newPostKey] = postData;
        console.log(newPostKey);
        console.log("updates " + updates);
        //now we tell Firebase we want to change the content in myMatch
        firebase.database().ref().child('myMatch').update(updates);
    }

    function getPosts() {
        //this is being called when the page is loaded - see above
        firebase.database().ref('myMatch').on('value', function (data) {
            //this is an event listener asking the firebase database to let us know when there is a change in the database
            console.log("new message!");
            // because this is a value update listener, if there is a new message the database will perform this update automatically, first at the start when the getPosts function is called and then every time thereafter that a change occurs
            var logs = document.getElementById("posts");
            logs.innerHTML = "";
            //emptying this div every time so we can put data into it

            var posts = data.val();
            //need to use data.val to actually retrieve content for anything pulled from firebase - not the same as JSON which is already usable
            for (var key in posts) {
                var text = document.createElement("div");
                var element = posts[key];
                //for every new message we create a new div to print the content onto the screen

                text.append(element.body);
                logs.append(text);
            }

        });
        console.log("Getting Posts");
    }*/

    function logOut() {
        firebase.auth().signOut()

            .then(function () {
                // Sign-out successful.
                $(".chat-btn").addClass("hidden");
                console.log("Log out successful!!");
            }).catch(function (error) {
                // An error happened.
                console.log(error.message);
            });
    }




});
