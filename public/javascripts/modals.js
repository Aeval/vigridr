$("#modal-login").iziModal({
    title: 'Login',
    subtitle: 'Welcome Back! Use the arrows to switch to registration!',
    headerColor: '#262626', //grey-black
    padding: "50px",
    group: 'auth',
    loop: true,
    history: false,
});

$("#modal-reg").iziModal({
    title: 'Register for the League',
    subtitle: 'Please fill out the whole form. Use the arrows to switch forms and Log In.',
    headerColor: '#262626', //grey-black
    padding: "50px",
    top: "20px",
    bottom: "20px",
    group: 'auth',
    loop: true,
    history: false,
});