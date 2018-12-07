$(document).ready(function () {
    var options = {
        edge: "left"
    }
    var elems = document.querySelectorAll('.sidenav');
    var sidenavInstances = M.Sidenav.init(elems, options);

});

getUsers();

function getUsers() {
    var playerList = '';

    $.ajax({
        Type: 'GET',
        url: '/users/users/',
        dataType: 'JSON',
    }).done(function (resp) {
        console.log(resp);
        $.each(resp, function () {
            playerList += '<a class="collection-item avatar">';
            playerList += '<i class="material-icons circle">face</i>';
            playerList += '<span class="title">'+ this.username +'</span>';
            playerList += '<p>'+ this.company +' <br>';
            playerList += 'Steam: '+ this.steam +' | Battlenet: '+ this.bnet;
            playerList += '</p>'
            playerList += '</a>';
            playerList += '<a class="collection-item avatar">';
            playerList += '<i class="material-icons circle">face</i>';
            playerList += '<span class="title">'+ this.username +'</span>';
            playerList += '<p>'+ this.company +' <br>';
            playerList += 'Steam: '+ this.steam +' | Battlenet: '+ this.bnet;
            playerList += '</p>'
            playerList += '</a>';
        })

        $('.collection').html(playerList);
    });
}