var userData = [];

//On page ready
$(document).ready(function(){
    checkUser();

    $('.fixed-action-btn').floatingActionButton();
})

$('#log').on('click', function(){
    getLogValues();
});

$('#reg').on('click', function(){
    getRegValues();
});

$('#chart').on('click', function(){
    getChart();
});

$('#chart').hover(function() {
    $(this).addClass('pulse');
}, function() {
    $(this).removeClass('pulse');
});

$('#discord').hover(function() {
    $(this).addClass('pulse');
}, function() {
    $(this).removeClass('pulse');
});

function populateGames(){
    var gameContent = '';
    var user = Cookies.getJSON('user');
    var gamevotes = user.votes;

    $.getJSON('/games/games', function(data){
        //For each game create a card
        $.each(data, function(){
            var gameid = this.gameid;

            gameContent += '<div class="card hoverable small white-text blue-grey darken-3">';
            gameContent += '<div class="card-image">';
            gameContent += '<img src="'+ this.pic +'" height="150px" width="400px" alt="'+ this.game +'"></img>';
            gameContent += '</div>';
            gameContent += '<div class="card-fab">';
            if(gamevotes){
                if(gamevotes[gameid] > 0){
                    gameContent += '<button id="'+ gameid +'_add" class="btn-floating halfway-fab waves-effect waves-light red scale-transition scale-out"><i class="material-icons">how_to_vote</i></button><button id="'+ gameid +'_remove" class="btn-floating halfway-fab waves-effect waves-light green scale-transition"><i class="material-icons">check</i></button>';
                }else{
                    gameContent += '<button id="'+ gameid +'_add" class="btn-floating halfway-fab waves-effect waves-light red scale-transition"><i class="material-icons">how_to_vote</i></button><button id="'+ gameid +'_remove" class="btn-floating halfway-fab waves-effect waves-light green scale-transition scale-out"><i class="material-icons">check</i></button>';
                }
            }else{
                gameContent += '<button id="'+ gameid +'_add" class="btn-floating halfway-fab waves-effect waves-light red scale-transition"><i class="material-icons">how_to_vote</i></button><button id="'+ gameid +'_remove" class="btn-floating halfway-fab waves-effect waves-light green scale-transition scale-out"><i class="material-icons">check</i></button>';
            }
            gameContent += '</div>';
            gameContent += '<div class="card-content">';
            gameContent += '<p>'+ this.desc +'</p>';
            gameContent += '</div>';
            gameContent += '</div>';
        });

        $('#gameDisp').html(gameContent);

        //Pulse on hover
        $('.card').hover(function() {
            $(this).children('.card-fab').children('.btn-floating').addClass('pulse');
        }, function() {
            $(this).children('.card-fab').children('.btn-floating').removeClass('pulse');
        });
        
        //Vote to check and back, also include db logic here:
        $('.btn-floating').on('click', function(){
            var game = $(this).attr('id')
            var gameid = $(this).attr('id').split('_')[0]
            var user = Cookies.getJSON('user');
            let button = $(this)[0];
            var vote;
            var header = {
                Authorization: user.token
            };
            

            if(game.indexOf('add') >= 0){

                vote = {
                    user: user.user,
                    gameid: gameid,
                    vote: 1
                };

                $.ajax({
                    type: 'POST',
                    url: '/games/submitVote/',
                    headers: header,
                    data: vote,
                    dataType: 'JSON'
                }).done(function(resp){
                    if(resp.msg !== ''){
                        toast({
                            type: 'error',
                            title: 'We couldn\'t process that vote.'
                        });
                    }else{
                        $(button).addClass('scale-out');
                        $(button).siblings('.btn-floating').removeClass('scale-out');
                    }
                }).fail(function(){
                    toast({
                        type: 'error',
                        title: 'Voting Failed!'
                    });
                })
            }

            if(game.indexOf('remove') >= 0){


                vote = {
                    user: user.user,
                    gameid: gameid,
                    vote: -1
                };

                $.ajax({
                    type: 'POST',
                    url: '/games/submitVote/',
                    headers: header,
                    data: vote,
                    dataType: 'JSON'
                }).done(function(resp){
                    if(resp.msg !== ''){
                        toast({
                            type: 'error',
                            title: 'We couldn\'t process that vote.'
                        });
                    }else{
                        $(button).addClass('scale-out');
                        $(button).siblings('.btn-floating').removeClass('scale-out');
                    }
                }).fail(function(){
                    toast({
                        type: 'error',
                        title: 'We couldn\'t process that vote.'
                    });
                })
            }
        });
    })
}

function populateGamesList(){
    var gameContent = '';

    $.getJSON('/games/games', function(data){
        //For each game create a card
        $.each(data, function(){
            gameContent += '<div class="card hoverable small white-text blue-grey darken-3">';
            gameContent += '<div class="card-image">';
            gameContent += '<img src="'+ this.pic +'" height="150px" width="400px" alt="'+ this.game +'"></img>';
            gameContent += '</div>';
            gameContent += '<div class="card-content">';
            gameContent += '<p>'+ this.desc +'</p>';
            gameContent += '</div>';
            gameContent += '</div>';
        });

        $('#gameDisp').html(gameContent);
    })
}

function checkUser(){
    var userCookie = Cookies.getJSON('user');
    
    if(userCookie){
        populateGames();
        $('#voteText').html('<h5 class="white-text center-align">Vote for the games you want to see in the League!</h5>');
        $('#btns').html(`<a id="logOut" class="waves-effect waves-light red btn"><i class="material-icons left">account_circle</i>${userCookie.user}</a>`);
        
        $('#logOut').on('click', function(){
            logOutUser();
        })
    }else{
        populateGamesList();
        $('#voteText').html('<h5 class="white-text center-align">Log in to vote on which games to play!</h5>');
    }
}

function checkBrowser() {
    // Opera 8.0+
    var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

    // Firefox 1.0+
    var isFirefox = typeof InstallTrigger !== 'undefined';

    // Safari 3.0+ "[object HTMLElementConstructor]" 
    var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

    // Internet Explorer 6-11
    var isIE = /*@cc_on!@*/false || !!document.documentMode;

    // Edge 20+
    var isEdge = !isIE && !!window.StyleMedia;

    // Chrome 1+
    var isChrome = !!window.chrome && !!window.chrome.webstore;

    // Blink engine detection
    var isBlink = (isChrome || isOpera) && !!window.CSS;

    if (isIE){
        $('#voteText').html('<h1>We do not support IE, please switch to a modern browser to continue!</h1>')
    }
}
