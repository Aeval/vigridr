// Add User
function addUser(regValues) {

    var newUser = {
      'username': regValues[0],
      'email': regValues[3],
      'firstname': regValues[1],
      'lastname': regValues[2],
      'company': regValues[4],
      'password': regValues[5]
    }

    // Use AJAX to post the object to our adduser service
    $.ajax({
      type: 'POST',
      data: newUser,
      url: '/users/adduser',
      dataType: 'JSON'
    }).done(function( response ) {
      // Check for successful (blank) response
      if (response.msg === '') {
        swal('Nice!','Welcome to the Vigridr League!', 'success')
      }
      else {
        // If something goes wrong, alert the error message that our service returned
        swal('Error!',response.msg,'error');
      }
    });
};