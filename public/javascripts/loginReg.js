var userData = [];

//On page ready
checkUser();

//Reg new user, if not exists, the11n log them in
$("form[name=regForm]").submit(function(e){
    e.preventDefault();

    if ($('#regPassword').val() !== $('#regConfirmPassword').val()){
        iziToast.warning({
            title: 'Hold on a sec...',
            message: 'Please make sure your passwords match!',
            position: 'bottomCenter',
            overlay: true,
            timeout: 2000,
            overlayClose: true
        });
        return false
    }
    
    var username = $('#regUserName').val(),
        email = $('#regEmail').val(),
        firstname = $('#regFirstName').val(),
        lastname = $('#regLastName').val(),
        company = $('#regCompany').val(),
        password = $('#regPassword').val(),
        bnet = $('#regBattlenet').val(),
        steam = $('#regSteamid').val()

    var userReg = {
        username: username,
        email: email,
        firstname: firstname,
        lastname: lastname,
        company: company,
        password: password,
        bnet: bnet,
        steam: steam
    }
    //Check if user exists and if not, create them and log them in
    $.ajax({
        type: 'GET',
        url: '/users/getuser/'+ username,
        dataType: 'JSON'
    }).done(function(response) {
        if (response.length !== 0){
            iziToast.error({
                title: 'Unfortunately...',
                message: 'That username has been taken already!',
                position: 'topCenter'
            });
            return false;
        }else{
            addUser(userReg);
            var user = {
                username: username,
                password: password
            };
            $('#modal-reg').iziModal('close');
            logIn(user);
        }  
    })
})
//Log in user
$("form[name=logForm]").submit(function(e){
    e.preventDefault();
    
    var user = {
        username: $('#logUserName').val(),
        password: $('#logPassword').val(),

    }

    logIn(user);
})
//Open Log in modal
$('#logReg').on('click', function(e){
    /* getLogValues(); */
    e.preventDefault();
    $('#modal-login').iziModal('open');
});
//Open Reg modal
/* $('#reg').on('click', function(e){
    /* getRegValues(); */
  /*   e.preventDefault();
    $('#modal-reg').iziModal('open'); */
/* }); */
//Open chart display modal
/* $('#chart').on('click', function(e){
    e.preventDefault();
    getChart();
    $('#getChart').iziModal('open');
}); */
/* //All "hover" functions enable each button to pulse on hover
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

$('#donate').hover(function() {
    $(this).addClass('pulse');
}, function() {
    $(this).removeClass('pulse');
});

$('#info').hover(function() {
    $(this).addClass('pulse');
}, function() {
    $(this).removeClass('pulse');
});

$('#dash').hover(function() {
    $(this).addClass('pulse');
}, function() {
    $(this).removeClass('pulse');
});
 */