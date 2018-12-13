$(document).ready(function () {
    var options = {
        edge: "left"
    }
    var elems = document.querySelectorAll('.sidenav');
    var sidenavInstances = M.Sidenav.init(elems, options);

});

getUsers();

var listOptions = {
    valueNames: ['name', 'company']
};

var playerList = new List('player-List', listOptions);

function getUsers() {
    var playerList = '';

    $.ajax({
        Type: 'GET',
        url: '/users/users/',
        dataType: 'JSON',
    }).done(function (resp) {
        console.log(resp);
        $.each(resp, function () {
            playerList += '<tr>';
            playerList += '<td style="padding-left: 12px;"><i class="fas fa-smile-beam fa-2x"></i></td>';
            playerList += '<td class="name">'+ this.username +'</td>';
            playerList += '<td class="company">'+ this.company +'</td>';
            playerList += '<td>'+ this.steam +'</td>';
            playerList += '<td>'+ this.bnet + '</td>';
            playerList += '<td style="padding-left: 12px;"><i class="fas fa-id-card"></i></td>';
            playerList += '</tr>';
        })

        $('tbody').html(playerList);
    });
}