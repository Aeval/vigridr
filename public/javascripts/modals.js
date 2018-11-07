async function getRegValues() {
    const {value: regValues} = await swal({
        title: 'Log In to Get Started!',
        background: 'url(/images/vigridrBanner.png)',
        html:
            '<div class="row">'+
            '<div class="input-field col s12">'+
            '<i class="material-icons prefix">account_circle</i>'+
            '<input id="regUserName" type="text" class="validate white-text">'+
            '<label for="regUserName">Username</label>'+
            '</div>'+
            '</div>'+
            '<div class="row">'+
            '<div class="input-field col s6">'+
            '<i class="material-icons prefix">perm_identity</i>'+
            '<input id="regFirstName" type="text" class="validate white-text">'+
            '<label for="regFirstName">First Name</label>'+
            '</div>'+
            '<div class="input-field col s6">'+
            '<input id="regLastName" type="text" class="validate white-text">'+
            '<label for="regLastName">Last Name</label>'+
            '</div>'+
            '</div>'+
            '<div class="row">'+
            '<div class="input-field col s12">'+
            '<i class="material-icons prefix">email</i>'+
            '<input id="regEmail" type="text" class="validate white-text">'+
            '<label for="regEmail">Email</label>'+
            '</div>'+
            '</div>'+
            '<div class="row">'+
            '<div class="input-field col s12">'+
            '<i class="material-icons prefix">business</i>'+
            '<input id="regCompany" type="text" class="validate white-text">'+
            '<label for="regCompany">Company</label>'+
            '</div>'+
            '</div>'+
            '<div class="row">'+
            '<div class="input-field col s12">'+
            '<i class="material-icons prefix">vpn_key</i>'+
            '<input id="regPassword" type="password" class="validate white-text">'+
            '<label for="regPassword">Password</label>'+
            '</div>'+
            '</div>'+
            '<div class="row">'+
            '<div class="input-field col s12">'+
            '<i class="material-icons prefix">vpn_key</i>'+
            '<input id="regConfirmPassword" type="password" class="validate white-text">'+
            '<label for="regConfirmPassword">Confirm Password</label>'+
            '</div>'+
            '</div>',
        focusConfirm: false,
        preConfirm: () => {
            return [
                document.getElementById('regUserName').value,
                document.getElementById('regFirstName').value,
                document.getElementById('regLastName').value,
                document.getElementById('regEmail').value,
                document.getElementById('regCompany').value,
                document.getElementById('regPassword').value,
                document.getElementById('regConfirmPassword').value
            ]
        }
    })

    if (regValues) {
        var userName = regValues[0];
        var userPassword = regValues[5];
        var userConfirmPass = regValues[6];

        if (userPassword !== userConfirmPass) {
            swal('Wait...', 'Your passwords don\' match! Try again!', 'error');
            return false;
        }

        $.ajax({
            type: 'GET',
            url: '/users/getuser/'+userName,
            dataType: 'JSON'
        }).done(function(response) {
            if (response.length !== 0){
                swal('Wait...', 'That username has already been taken!', 'error');
                return false;
            }else{
                addUser(regValues);
                swal('Nice!', 'We got you in the system! Signing in!', 'success');
            }  
        })
    }
}

async function getLogValues() {
    const {value: logValues} = await swal({
        title: 'Register for the League!',
        html:
            '<input id="logUserName" class="swal2-input">' +
            '<input id="logPassword" class="swal2-input">',
        focusConfirm: false,
        preConfirm: () => {
            return [
                document.getElementById('logUserName').value,
                document.getElementById('logPassword').value
            ]
        }
    })
}