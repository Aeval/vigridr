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
            playerList += '<tr>';
            playerList += '<td><i class="material-icons circle">face</i></td>';
            playerList += '<td>'+ this.username +'</td>';
            playerList += '<td>'+ this.company +'</td>';
            playerList += '<td>'+ this.steam +'</td>';
            playerList += '<td>'+ this.bnet + '</td>';
            playerList += '<td style="padding-left: 12px;"><i class="fas fa-id-card"></i></td>';
            playerList += '</tr>';
        })

        $('tbody').html(playerList);
    });
}