var userCookie = Cookies.getJSON('user');
var gravHash = userCookie.email;

if(userCookie){
    console.log(gravHash)
} else {
    console.log('Failed')
}