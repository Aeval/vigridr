//Check if user has a valid cookie
function checkUser() {
  var userCookie = Cookies.getJSON('user');

  if (userCookie) {
    $('#userIn').html('<button id="userDrop" data-target="dropdown" class="dropdown-trigger white-text waves-effect waves-light right btn red">'+ userCookie.user +'</button>');
    $('#logOut').on('click', function () {
      logOutUser();
    })

    var dropOptions = {
      inDuration: 300,
      outDuration: 225,
      hover: true, // Activate on hover
      belowOrigin: true, // Displays dropdown below the button
      alignment: 'right',
      coverTrigger: false
    } 
    var dropelems = document.querySelectorAll('.dropdown-trigger');
    var dropinstances = M.Dropdown.init(dropelems, dropOptions);

  } else {
    $('#userIn').html('<a id="logReg" class="login right"><i class="fas fa-user-circle fa-2x"></i></a>');
  }
}

// Add User
function addUser(newUser) {
  // Use AJAX to post the object to our adduser service
  $.ajax({
    type: 'POST',
    data: newUser,
    url: '/users/adduser',
    dataType: 'JSON'
  }).done(function (response) {
    // Check for successful (blank) response
    if (response.msg !== '') {
      iziToast.error({
        title: 'Oops!',
        message: 'We had an issue adding you to the roster! Try again or contact us!',
    });
    }
  });
};


//Function to log in users
function logIn(user) {
  $.ajax({
    type: 'POST',
    url: '/users/login/',
    data: user,
    dataType: 'JSON'
  }).done(function (response) {
    if (response.message !== 'Auth successful!') {
      iziToast.error({
        title: 'Sorry!',
        message: 'There was an issue logging in! Please try again!',
      });
      return false;
    } else {
      $("#modal-login").iziModal('close');
      iziToast.success({
        title: 'Welcome!',
        message: 'Good to see you, ' + response.user + '!',
        position: 'bottomRight'
      });
      Cookies.set('user', { token: response.token, user: response.user, votes: response.votes }, { expires: 1 });
      checkUser();
    }
  })
}

//Populate games for voting (Logged In) and voting logic
function populateGames() {
  var gameContent = '';
  var user = Cookies.getJSON('user');
  var gamevotes = user.votes;
  $.getJSON('/games/games', function (data) {
    //For each game create a card
    $.each(data, function () {
      var gameid = this.gameid;

      gameContent += '<div class="card hoverable small white-text blue-grey darken-3">';
      gameContent += '<div class="card-image">';
      gameContent += '<img src="' + this.pic + '" height="150px" width="400px" alt="' + this.game + '"></img>';
      gameContent += '</div>';
      gameContent += '<div class="card-fab">';
      if (gamevotes) {
        if (gamevotes[gameid] > 0) {
          gameContent += '<button id="' + gameid + '_add" class="btn-floating halfway-fab waves-effect waves-light red scale-transition scale-out"><i class="material-icons">how_to_vote</i></button><button id="' + gameid + '_remove" class="btn-floating halfway-fab waves-effect waves-light green scale-transition"><i class="material-icons">check</i></button>';
        } else {
          gameContent += '<button id="' + gameid + '_add" class="btn-floating halfway-fab waves-effect waves-light red scale-transition"><i class="material-icons">how_to_vote</i></button><button id="' + gameid + '_remove" class="btn-floating halfway-fab waves-effect waves-light green scale-transition scale-out"><i class="material-icons">check</i></button>';
        }
      } else {
        gameContent += '<button id="' + gameid + '_add" class="btn-floating halfway-fab waves-effect waves-light red scale-transition"><i class="material-icons">how_to_vote</i></button><button id="' + gameid + '_remove" class="btn-floating halfway-fab waves-effect waves-light green scale-transition scale-out"><i class="material-icons">check</i></button>';
      }
      gameContent += '</div>';
      gameContent += '<div class="card-content">';
      gameContent += '<p>' + this.desc + '</p>';
      gameContent += '</div>';
      gameContent += '</div>';
    });

    $('#gameDisp').html(gameContent);

    //Pulse on hover
    $('.card').hover(function () {
      $(this).children('.card-fab').children('.btn-floating').addClass('pulse');
    }, function () {
      $(this).children('.card-fab').children('.btn-floating').removeClass('pulse');
    });

    //Vote to check and back, also include db logic here:
    $('.btn-floating').on('click', function () {
      var game = $(this).attr('id')
      var gameid = $(this).attr('id').split('_')[0]
      var user = Cookies.getJSON('user');
      var button = $(this)[0];
      var vote;
      var header = {
        Authorization: user.token
      };


      if (game.indexOf('add') >= 0) {

        vote = {
          user: user.user,
          gameid: gameid,
          vote: 1
        };

        $.ajax({
          type: 'POST',
          url: '/games/submitVote/',
          headers: header,
          data: vote,
          dataType: 'JSON'
        }).done(function (resp) {
          if (resp.msg !== '') {
            iziToast.error({
              title: 'Oh no!',
              message: 'We weren\'t able to process that vote!',
            });
          } else {
            $(button).addClass('scale-out');
            $(button).siblings('.btn-floating').removeClass('scale-out');
          }
        }).fail(function () {
          iziToast.error({
            title: 'Oh no!',
            message: 'We weren\'t able to process that vote!',
          });
        })
      }

      if (game.indexOf('remove') >= 0) {


        vote = {
          user: user.user,
          gameid: gameid,
          vote: -1
        };

        $.ajax({
          type: 'POST',
          url: '/games/submitVote/',
          headers: header,
          data: vote,
          dataType: 'JSON'
        }).done(function (resp) {
          if (resp.msg !== '') {
            iziToast.error({
              title: 'Oh no!',
              message: 'We weren\'t able to process that vote!',
            });
          } else {
            $(button).addClass('scale-out');
            $(button).siblings('.btn-floating').removeClass('scale-out');
          }
        }).fail(function () {
          iziToast.error({
            title: 'Oh no!',
            message: 'We weren\'t able to process that vote!',
          });
        })
      }
    });
  })
}

//Populate games when not logged in (no voting)
function populateGamesList() {
  var gameContent = '';

  $.getJSON('/games/games', function (data) {
    //For each game create a card
    $.each(data, function () {
      gameContent += '<div class="card hoverable small white-text blue-grey darken-3">';
      gameContent += '<div class="card-image">';
      gameContent += '<img src="' + this.pic + '" height="150px" width="400px" alt="' + this.game + '"></img>';
      gameContent += '</div>';
      gameContent += '<div class="card-content">';
      gameContent += '<p>' + this.desc + '</p>';
      gameContent += '</div>';
      gameContent += '</div>';
    });

    $('#gameDisp').html(gameContent);
  })
}

//Get votes chart
function getChart() {

  $.ajax({
    Type: 'GET',
    url: '/games/getChart/',
    dataType: 'JSON'
  }).done(function (resp) {

    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: [resp[0].name, resp[1].name, resp[2].name, resp[3].name, resp[4].name, resp[5].name, resp[6].name, resp[7].name, resp[8].name, resp[9].name, resp[10].name, resp[11].name],
        datasets: [{
          label: '# of Votes',
          data: [resp[0].votes, resp[1].votes, resp[2].votes, resp[3].votes, resp[4].votes, resp[5].votes, resp[6].votes, resp[7].votes, resp[8].votes, resp[9].votes, resp[10].votes, resp[11].votes],
          backgroundColor: [
            'rgba(255, 0, 0, 0.8)',
            'rgba(255, 96, 0, 0.8)',
            'rgba(255, 192, 0, 0.8)',
            'rgba(255, 255, 0, 0.8)',
            'rgba(128, 220, 0, 0.8)',
            'rgba(0, 255, 0, 0.8)',
            'rgba(0, 255, 224, 0.8)',
            'rgba(0, 125, 255, 0.8)',
            'rgba(0, 0, 255, 0.8)',
            'rgba(96, 0, 255, 0.8)',
            'rgba(224, 0, 255, 0.8)',
            'rgba(255, 0, 128, 0.8)'
          ],
          borderColor: [
            'rgba(255, 0, 0, 0.8)',
            'rgba(255, 96, 0, 0.8)',
            'rgba(255, 192, 0, 0.8)',
            'rgba(255, 255, 0, 0.8)',
            'rgba(128, 255, 0, 0.8)',
            'rgba(0, 255, 0, 0.8)',
            'rgba(0, 255, 224, 0.8)',
            'rgba(0, 125, 255, 0.8)',
            'rgba(0, 0, 255, 0.8)',
            'rgba(96, 0, 255, 0.8)',
            'rgba(224, 0, 255, 0.8)',
            'rgba(255, 0, 128, 0.8)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        legend: {
          display: false
        }
      }
    });
  })
}

//Confirm reg passwords match
var password = $("#regPassword")[0];
var confirm_password = $("#regConfirmPassword")[0];
//Password validation on keyup
password.onchange = validatePassword();
confirm_password.onkeyup = validatePassword();

function validatePassword() {
  if (password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
  } else {
    confirm_password.setCustomValidity('');
  }
}

function logOutUser() {
  var options = {
    backgroundColor: '#ff0000',
    timeout: false,
    titleColor: '#ffffff',
    messageColor: '#cecece',
    icon: 'fas fa-exclamation-circle',
    iconColor: '#ffffff',
    close: false,
    layout: 1,
    title: 'Log Out?',
    message: 'Are you sure?',
    position: 'topCenter', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
    progressBar: false,
    buttons: [
        ['<button>Log out</button>', function (instance, toast) {
          instance.hide({
            transitionOut: 'fadeOutUp',
        }, toast, 'buttonName');
          Cookies.remove('user');
          location.reload();
        }], // true to focus
        ['<button>Cancel</button>', function (instance, toast) {
            instance.hide({
                transitionOut: 'fadeOutUp',
            }, toast, 'buttonName');
        },true]
    ]
  }

  iziToast.show(options);
}