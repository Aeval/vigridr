$(document).ready(function(){
    var options = {
        edge: "left"
    }
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, options);

    var carOptions = {
        fullWidth: true
    }
    var caroElems = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(caroElems, carOptions);
});