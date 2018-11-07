var userData = [];

//On page ready
$(document).ready(function(){

    populateGames();
    
})

function populateGames(){
    var gameContent = '';

    $.getJSON('/games/games', function(data){
        //For each game create a card
        $.each(data, function(){
            gameContent += '<div class="card hoverable small white-text blue-grey darken-3">';
            gameContent += '<div class="card-image">';
            gameContent += '<img src="'+ this.pic +'" height="150px" width="400px" alt="'+ this.game +'"></img>';
            gameContent += '</div>';
            gameContent += '<div class="card-fab">';
            gameContent += '<button id="'+ this.gameid +'" class="btn-floating halfway-fab waves-effect waves-light red scale-transition"><i class="material-icons">how_to_vote</i></button><button id="'+ this.gameid +'remove" class="btn-floating halfway-fab waves-effect waves-light green scale-transition scale-out"><i class="material-icons">check</i></button>';
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
            console.log($(this).attr('id'));
            $(this).addClass('scale-out');
            $(this).siblings('.btn-floating').removeClass('scale-out');

        });
    })
}

$('#log').on('click', function(){
    getLogValues();
});

$('#reg').on('click', function(){
    getRegValues();
});