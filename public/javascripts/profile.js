var userCookie = Cookies.getJSON('user');
var gravHash = userCookie.email;
var userData = {};

if(userCookie){

    $.ajax({
        type: 'GET',
        url: '/users/getuser/'+ userCookie.user,
        dataType: 'JSON'
    }).done(function(resp) {
        console.log(resp);
        if (resp.length == 0){
            iziToast.error({
                title: 'Unfortunately...',
                message: 'Something went wrong. Please return to the home page and re-login.',
                position: 'topCenter'
            });
            return false;
        }else{
            console.log(resp[0].username);
            userData = {
                user: resp[0].username,
                firstN: resp[0].firstname,
                lastN: resp[0].lastname,
                bnet: resp[0].bnet,
                steam: resp[0].steam,
                email: resp[0].email,
                company: resp[0].company
            }
        }

    var proRightContent = '';

    proRightContent += '<div class="row">'
    proRightContent += '<img class="circle responsive-img" src="https://www.gravatar.com/avatar/' + gravHash + '?d=retro">'
    proRightContent += '</div>'
    proRightContent += '<div class="row">'
    proRightContent += '<h2>' + userData.user + '</h2>'
    proRightContent += '</div>'
    proRightContent += '<div class="row">'
    proRightContent += '<div class="input-field col s6 grey-text"><i class="fas fa-user prefix"></i>'
    proRightContent += '<input class="validate white-text center-align" id="dispFirstName" type="text" value="' + userData.firstN + '" disabled/>'
    proRightContent += '</div>'
    proRightContent += '<div class="input-field col s6 grey-text">'
    proRightContent += '<input class="validate white-text center-align" id="dispLastName" type="text" value="' + userData.lastN + '" disabled/>'
    proRightContent += '</div>'
    proRightContent += '</div>'
    proRightContent += '<div class="row">'
    proRightContent += '<div class="input-field col s6 grey-text"><i class="prefix"><img src="/images/bnet.svg"/></i>'
    proRightContent += '<input class="validate white-text center-align" id="dispBattlenet" type="text" value="' + userData.bnet + '" disabled/>'
    proRightContent += '</div>'
    proRightContent += '<div class="input-field col s6 grey-text"><i class="fab fa-steam prefix"></i>'
    proRightContent += '<input class="validate white-text center-align" id="dispSteam" type="text" value="' + userData.steam + '" disabled/>'
    proRightContent += '</div>'
    proRightContent += '</div>'
    proRightContent += '<div class="row">'
    proRightContent += '<div class="input-field col s6 grey-text"><i class="fas fa-envelope prefix"></i>'
    proRightContent += '<input class="validate white-text center-align" id="dispEmail" type="text" value="' + userData.email + '" disabled/>'
    proRightContent += '</div>'
    proRightContent += '<div class="input-field col s6 grey-text"><i class="fas fa-building prefix"></i>'
    proRightContent += '<input class="validate white-text center-align" id="dispCompany" type="text" value="' + userData.company + '" disabled/>'
    proRightContent += '</div>'
    proRightContent += '</div>'

    $('#profileContent').html(proRightContent);

    });
    
} else {
    $('#bodyPlayers').html('<h1 class="white-text center-align"> Not sure how you got here with out signing in! But if you want to see your profile, you\'re gonna have to do just that!</h1>');
}