async function getRegValues() {
    const {value: regValues} = await swal({
        title: 'Register for the League!',
        background: 'url(/images/vigridrBanner.png)',
        html:
            '<br>'+
            '<div class="row">'+
            '<div class="input-field col s12">'+
            '<i class="material-icons prefix">account_circle</i>'+
            '<input id="regUserName" type="text" class="validate white-text" required>'+
            '<label for="regUserName">Username</label>'+
            '</div>'+
            '</div>'+
            '<div class="row">'+
            '<div class="input-field col s6">'+
            '<i class="material-icons prefix">perm_identity</i>'+
            '<input id="regFirstName" type="text" class="validate white-text" required>'+
            '<label for="regFirstName">First Name</label>'+
            '</div>'+
            '<div class="input-field col s6">'+
            '<input id="regLastName" type="text" class="validate white-text" required>'+
            '<label for="regLastName">Last Name</label>'+
            '</div>'+
            '</div>'+
            '<div class="row">'+
            '<div class="input-field col s12">'+
            '<i class="material-icons prefix">email</i>'+
            '<input id="regEmail" type="email" class="validate white-text" required>'+
            '<label for="regEmail">Email</label>'+
            '<span class="helper-text" data-error="Please enter a valid email!" data-success="Perfect!">ex: someone@somplace.com</span>'+
            '</div>'+
            '</div>'+
            '<div class="row">'+
            '<div class="input-field col s12">'+
            '<i class="material-icons prefix">business</i>'+
            '<input id="regCompany" type="text" class="validate white-text" required>'+
            '<label for="regCompany">Company</label>'+
            '</div>'+
            '</div>'+
            '<div class="row">'+
            '<div class="input-field col s12">'+
            '<i class="material-icons prefix">vpn_key</i>'+
            '<input id="regPassword" type="password" minlength="8" maxlength="16" class="validate white-text" required>'+
            '<label for="regPassword">Password</label>'+
            '<span class="helper-text" data-error="Must be 6-16 characters!" data-success="Good!"></span>'+
            '</div>'+
            '</div>'+
            '<div class="row">'+
            '<div class="input-field col s12">'+
            '<i class="material-icons prefix">vpn_key</i>'+
            '<input id="regConfirmPassword" type="password" minlength="8" maxlength="16" class="validate white-text" required>'+
            '<label for="regConfirmPassword">Confirm Password</label>'+
            '<span class="helper-text" data-error="Please ensure your passwords match and follow the required format!" data-success=""></span>'+
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

        if(regValues[0] == ''|| regValues[1] == '' || regValues[2] == '' || regValues[3] == '' || regValues[4] == '' || regValues[5] == '' || regValues[6] == ''){
            swal('Not Quite!', 'Please make sure you fill out the whole form!', 'error');
            return false;
        }

        if (userPassword !== userConfirmPass) {
            swal('Wait...', 'Your passwords don\'t match! Try again!', 'error');
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
                var user = {
                    username: userName,
                    password: userPassword
                }

                $.ajax({
                    type: 'POST',
                    url: '/users/login/',
                    data: user,
                    dataType: 'JSON'
                }).done(function(response) {
                    if (response.message !== 'Auth successful!'){
                        toast({
                            type: 'error',
                            title: response.message
                        });
                        return false;
                    }else{
                        toast({
                            type: 'success',
                            title: `WELCOME, ${response.user}!`
                        })
                        Cookies.set('user', {token:response.token,user:response.user }, {expires: 1});
                        checkUser();
                    }  
                })
            }  
        })
    }
}

async function getLogValues() {
    const {value: logValues} = await swal({
        title: 'Welcome Back!',
        background: 'url(/images/vigridrBanner.png)',
        html:
            '<br>'+
            '<div class="row">'+
            '<div class="input-field col s12">'+
            '<i class="material-icons prefix">account_circle</i>'+
            '<input id="logUserName" type="text" class="validate white-text">'+
            '<label for="logUserName">Username</label>'+
            '</div>'+
            '</div>'+
            '<div class="row">'+
            '<div class="input-field col s12">'+
            '<i class="material-icons prefix">vpn_key</i>'+
            '<input id="logPassword" type="password" class="validate white-text">'+
            '<label for="logPassword">Password</label>'+
            '</div>'+
            '</div>',
        focusConfirm: false,
        preConfirm: () => {
            return [
                document.getElementById('logUserName').value,
                document.getElementById('logPassword').value
            ]
        }
    })

    if (logValues) {
        var user = {
            username: logValues[0],
            password: logValues[1]
        }

        $.ajax({
            type: 'POST',
            url: '/users/login/',
            data: user,
            dataType: 'JSON'
        }).done(function(response) {
/*             if (response.message !== 'Auth successful!'){
                swal('Huh?', 'Sorry, we didn\'t find that user in the system...', 'error')
                return false;
            }else{ */
                toast({
                    type: 'success',
                    title: `WELCOME BACK, ${response.user}!`
                })
                Cookies.set('user', {token:response.token,user:response.user,admin:response.admin,votes: response.votes}, {expires: 1});
                checkUser();
/*             }   */
        }).fail(function(){
            swal('So...', 'Either that user doesn\'t exist or you have the wrong password.', 'error')
            return false;
        })
    }
}

function logOutUser(){
    swal({
        title: 'Logout?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#9f9f9f',
        confirmButtonText: 'Logout'
      }).then((result) => {
        if (result.value) {
            Cookies.remove('user');
            location.reload();
        }
      })
}

const toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });