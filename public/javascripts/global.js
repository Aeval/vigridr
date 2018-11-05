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
            gameContent += '<div class="card text-white bg-dark border-secondary">';
            gameContent += '<img class="card-img-top" src="'+ this.pic +'" height="150px" width="400px" alt="'+ this.game +'">';
            gameContent += '<div class="card-body">';
            gameContent += '<h5 class="card-title text-center">'+ this.game +'</h5>';
            gameContent += '<p class="card-text">'+ this.desc +'</p>';
            gameContent += '</div>';
            gameContent += '<div class="card-footer text-center">';
            gameContent += '<button type="button" class="btn btn-primary">Vote!</a>';
            gameContent += '</div>';
            gameContent += '</div>';
        });

        $('#gameDisp').html(gameContent);
    })
}