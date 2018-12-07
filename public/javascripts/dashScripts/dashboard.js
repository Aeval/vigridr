$(document).ready(function () {
    var options = {
        edge: "left"
    }
    var elems = document.querySelectorAll('.sidenav');
    var sidenavInstances = M.Sidenav.init(elems, options);

    var carOptions = {
        fullWidth: true,
        indicators: true,
        dist: 100
    }
    var caroElems = document.querySelectorAll('.carousel');
    var caroInstances = M.Carousel.init(caroElems, carOptions);
    var dashCaroInstance = $('#dashCaro');
    var dashboardCaro = M.Carousel.getInstance(dashCaroInstance);

    var caroTimer = setInterval(nextSlide, 6000);

    function nextSlide() {
        dashboardCaro.next();
    }

    $('#dashCaro').hover(function () {
        clearInterval(caroTimer);
    }, function () {
        clearInterval(caroTimer);
        caroTimer = '';
        caroTimer = setInterval(nextSlide, 6000);
    });

});

$('.btn-floating').hover(function () {
    $(this).addClass('pulse');
}, function () {
    $(this).removeClass('pulse');
});