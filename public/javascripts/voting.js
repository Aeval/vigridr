$(document).ready(function () {
    if(isLoggedIn()){
        updateCookie();
        populateGames();
    }else{
        populateGamesList();
    }
});

