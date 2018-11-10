async function getRegValues() {
    const {value: regValues} = await swal({
        title: 'Register for the League!',
        background: 'url(/images/vigridrBanner.png)',
        html:
            '<br>'+
            '<div class="row">'+
            //Username
            '<div class="input-field col s12">'+
            '<i class="material-icons prefix">account_circle</i>'+
            '<input id="regUserName" type="text" class="validate white-text" required>'+
            '<label for="regUserName">Username</label>'+
            '</div>'+
            '</div>'+
            '<div class="row">'+
            //First name
            '<div class="input-field col s6">'+
            '<i class="material-icons prefix">perm_identity</i>'+
            '<input id="regFirstName" type="text" class="validate white-text" required>'+
            '<label for="regFirstName">First Name</label>'+
            '</div>'+
            //Last name
            '<div class="input-field col s6">'+
            '<i class="material-icons prefix">perm_identity</i>'+
            '<input id="regLastName" type="text" class="validate white-text" required>'+
            '<label for="regLastName">Last Name</label>'+
            '</div>'+
            '<div class="row">'+
            //Bnet Tag
            '<div class="input-field col s6">'+
            '<i class="prefix"><img src="/images/bnet.svg"></i>'+
            '<input id="regBattlenet" type="text" class="validate white-text">'+
            '<label for="regBattlenet">Battlenet Tag</label>'+
            '<span class="helper-text">ex: Username#1234</span>'+
            '</div>'+
            //Steam Id
            '<div class="input-field col s6">'+
            '<i class="fab fa-steam prefix"></i>'+
            '<input id="regSteamid" type="text" class="validate white-text">'+
            '<label for="regSteamid">Steam Id</label>'+
            '</div>'+
            '</div>'+
            '<div class="row">'+
            //Email
            '<div class="input-field col s12">'+
            '<i class="material-icons prefix">email</i>'+
            '<input id="regEmail" type="email" class="validate white-text" required>'+
            '<label for="regEmail">Email</label>'+
            '<span class="helper-text" data-error="Please enter a valid email!" data-success="Perfect!">ex: someone@somplace.com</span>'+
            '</div>'+
            '</div>'+
            '<div class="row">'+
            //Company
            '<div class="input-field col s12">'+
            '<i class="material-icons prefix">business</i>'+
            '<input id="regCompany" type="text" class="validate white-text" required>'+
            '<label for="regCompany">Company</label>'+
            '</div>'+
            '</div>'+
            '<div class="row">'+
            //Password
            '<div class="input-field col s12">'+
            '<i class="material-icons prefix">vpn_key</i>'+
            '<input id="regPassword" type="password" minlength="8" maxlength="16" class="validate white-text" required>'+
            '<label for="regPassword">Password</label>'+
            '<span class="helper-text" data-error="Must be 6-16 characters!" data-success="Good!"></span>'+
            '</div>'+
            '</div>'+
            '<div class="row">'+
            //Confirm Pass
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
                document.getElementById('regBattlenet').value,
                document.getElementById('regSteamid').value,
                document.getElementById('regEmail').value,
                document.getElementById('regCompany').value,
                document.getElementById('regPassword').value,
                document.getElementById('regConfirmPassword').value
            ]
        }
    })

    if (regValues) {
        var userName = regValues[0];
        var userPassword = regValues[7];
        var userConfirmPass = regValues[8];

        if(regValues[0] == ''|| regValues[1] == '' || regValues[2] == '' || regValues[5] == '' || regValues[6] == '' || regValues[7] == '' || regValues[8] == ''){
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

async function getChart() {
    $.ajax({
        Type: 'GET',
        url: '/games/getChart/',
        dataType: 'JSON'
    }).done(function(resp){
        console.log(resp);
    
        swal({
            title: 'Votes at a Glance:',
            background: 'url(/images/vigridrBanner.png)',
            html:
            '<br>'+
            '<canvas id="myChart" width="400" height="400"></canvas>',
            showConfirmButton: false,
            showCancelButton: false,
            showCloseButton: true
        });

        var ctx = document.getElementById("myChart");
        var myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: [resp[0].name,resp[1].name,resp[2].name,resp[3].name,resp[4].name,resp[5].name,resp[6].name,resp[7].name,resp[8].name,resp[9].name,resp[10].name,resp[11].name],
                datasets: [{
                    label: '# of Votes',
                    data: [resp[0].votes,resp[1].votes,resp[2].votes,resp[3].votes,resp[4].votes,resp[5].votes,resp[6].votes,resp[7].votes,resp[8].votes,resp[9].votes,resp[10].votes,resp[11].votes],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(255, 206, 86, 0.8)',
                        'rgba(75, 192, 192, 0.8)',
                        'rgba(153, 102, 255, 0.8)',
                        'rgba(250,21,44, 0.8)',
                        'rgba(212,74,249, 0.8)',
                        'rgba(37,182,53, 0.8)',
                        'rgba(100,2,37, 0.8)',
                        'rgba(168,68,71, 0.8)',
                        'rgba(128,26,119, 0.8)',
                        'rgba(41,4,237, 0.8)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(255, 206, 86, 0.8)',
                        'rgba(75, 192, 192, 0.8)',
                        'rgba(153, 102, 255, 0.8)',
                        'rgba(250,21,44, 0.8)',
                        'rgba(212,74,249, 0.8)',
                        'rgba(37,182,53, 0.8)',
                        'rgba(100,2,37, 0.8)',
                        'rgba(168,68,71, 0.8)',
                        'rgba(128,26,119, 0.8)',
                        'rgba(41,4,237, 0.8)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                legend:{
                    display: false
                }
            }
        });
    })

    


}

const toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });