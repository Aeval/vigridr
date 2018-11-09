// Add User
function addUser(regValues) {

    var newUser = {
      'username': regValues[0],
      'email': regValues[5],
      'firstname': regValues[1],
      'lastname': regValues[2],
      'company': regValues[6],
      'password': regValues[7],
      'bnet': regValues[3],
      'steam': regValues[4],

    }

    // Use AJAX to post the object to our adduser service
    $.ajax({
      type: 'POST',
      data: newUser,
      url: '/users/adduser',
      dataType: 'JSON'
    }).done(function( response ) {
      // Check for successful (blank) response
      if (response.msg !== '') {
        swal('Error!',response.msg,'error');
      }
    });
};