/* one page scroll  */

$(function() {
    var sections = $('.section'),
        display = $('.main__content'),
        inScroll = false;

    var scrollToSection = function (sectionEq) {

        var position = 0;

        if (!inScroll) {
            inScroll = true;
            position = (sections.eq(sectionEq).index() * -100) + '%';
            sections.eq(sectionEq).addClass('active')
                .siblings().removeClass('active');
            display.css({
                transform: 'translate3d(0, '+ position + ', 0)'
            });

            setTimeout(function () {
                inScroll = false;

                $('.dotted-menu__item').eq(sectionEq).addClass('active')
                    .siblings().removeClass('active');
            }, 1300);
        }
    }

    $('.wrapper').on('wheel', function(e) {

        var deltaY = e.originalEvent.deltaY,
            activeSection = sections.filter('.active'),
            nextSection = activeSection.next(),
            prevSection = activeSection.prev();

        if(deltaY > 0) {
            if(nextSection.length) {
                scrollToSection(nextSection.index());
            }
        }

        if(deltaY < 0) {
            if(prevSection.length) {
                scrollToSection(prevSection.index());
            }
        }
    });


    $('.arrow__down-link').on('click', function(e){
        e.preventDefault();
        scrollToSection(1);
    });


    $('.dotted-menu__item-link, .menu__item-link, .header__button').on('click', function(e){
        e.preventDefault();

        var href = parseInt($(this).attr('href'));
        scrollToSection(href);
    });

    $(document).on('keydown', function(e) {
       
        //console.log(e.keyCode);

        var activeSection = sections.filter('.active'),
            nextSection = activeSection.next(),
            prevSection = activeSection.prev();

        switch(e.keyCode) {
            case 40: // вниз
            case 34: // page down
            case 32: // space
                if (nextSection.length) {
                    scrollToSection(nextSection.index());
                }

                break;

            case 38: // вверх
            case 33: // page up

                if (prevSection.length) {
                    scrollToSection(prevSection.index());
                }

                break;

            case 35: // end

                scrollToSection(7);
                break;

            case 36: // home
                scrollToSection(0);
                break;
            //case 16: // shift

            default:
                return;
        }
    }); 
});

/*      one page scroll END*/

/* owl carousel  */

$(function(){

    var owl = $('.owl-carousel');

    owl.owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
        autoplaySpeed: 1000
        });


    $('.control__button_next').on('click', function(e) {
        e.preventDefault();
        owl.trigger('next.owl.carousel', [1000]);
        // console.log('next');
    });

    $('.control__button_prev').on('click', function(e){
        e.preventDefault();
        owl.trigger('prev.owl.carousel', [1000]);
        // console.log('prev');
    });
});

/*      owl carousel END     */

/*      Accordion Vertial */

$(function() {
    $('.team-accordion__list:first-child').addClass('active').next().slideDown();

    $('.team-accordion__trigger').on('click', function(e) {

        var dropDown = $(this).closest('.team-accordion__item').find('.team-accordion__content');

        $(this).closest('.team-accordion__list').find('.team-accordion__content').not(dropDown).slideUp();

        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $(this).closest('.team-accordion__list').find('.team-accordion__item .active').removeClass('active');
            $(this).addClass('active');
        }

        dropDown.stop(true, true).slideToggle();

        e.preventDefault();
    });
});


/*      Accordion Vertical END*/



/*      Accordion Horizontal   */

$(function() {

    $('.menu-accordion__trigger').on('click', function(e) {
        e.preventDefault();

    var $this = $(this),
        container = $this.closest('.menu-accordion__list'),
        item = $this.closest('.menu-accordion__item'),
        items = container.find('.menu-accordion__item'),
        activeItem = items.filter('.active'),
        content = item.find('.menu-accordion__content'),
        otherContent = container.find('.menu-accordion__content'),
        activeContent = activeItem.find('.menu-accordion__content');


    if(!item.hasClass('active')) {

        items.removeClass('active');
        item.addClass('active');

        activeContent.animate({
            'width': '0px'
        });
        
        content.animate({
             'width': '540px'
        });

      
    } else {
        item.removeClass('active');

        content.animate ({
            'width': '0px'
        });
    }

    });

    // клик вне аккордеона

    $(document).on('click', function(e) {
        var $this = $(e.target);

       // console.log($this);
       if(!$this.closest('.menu-accordion__list').length) {
            $('.menu-accordion__content').animate({
                'width' : '0px'
            });

            $('.menu-accordion__item').removeClass('active');
       }

    });

});


/*      Accordion Horizontal END*/

/*      input mask    */

$(function() {
   $('.phone-mask').inputmask('+7 (999) 999-99-99');
});

/*      input mask END      */


/* reviews modal window*/

$(function() {

    $('.review__hover-button-link').fancybox({
        type : 'inline',
        maxWidth: 460,
        fitToView : false,
        padding : 0
    });

    $('.reviews__modal-close').on('click', function(e) {
        e.preventDefault();

        $.fancybox.close();
    });

});


/*   reviews modal window    */


/*       order form      */

$(function () {
    $('#order-form').on('submit', function (e) {
        e.preventDefault();

        var orderForm = $(this)
            formData = orderForm.serialize();

        $.ajax({
            url: '../mail/form.php',
            type: 'POST',
            data: formData,
            success: function (data) {

                var messageStatus = data.status ? '#success' : '#error';

                $.fancybox.open([{
                    href: messageStatus
                }], {
                    type: 'inline',
                    maxWidth: 250,
                    minWidth: 196,
                    minHeight: 116,
                    scrolling: 'no',
                    fitToView: false,
                    padding: 0,
                    afterClose: function () {
                        orderForm.trigger('reset');
                    }
                });
            }
        });
    });
    
    $('.form-button__close').on('click', function (e) {
        e.preventDefault();

        $.fancybox.close();
    })
});


/*   order form END  */

/* MAP Yandex*/

ymaps.ready(init);

var burgerMap;

function init (){
    burgerMap = new ymaps.Map("map", {
        center: [59.91815364, 30.30557800],
         zoom: 11,
         controls: [],
         type: "yandex#map"
    });
    
    burgerMap.controls.add('zoomControl')
                      .add('fullscreenControl', {float: 'none', position: {left: 10, top: 60}}) 
                      .add('geolocationControl')
                      .add('trafficControl', {float: 'left', position: {left: 60, top: 10}});

   var placemarkOne = new ymaps.Placemark(
       [59.88545104, 30.31982500],
       null, {
        iconLayout: 'default#image',
        iconImageHref: './img/icons/map-marker.svg',
        iconImageSize: [64, 64],
        iconImageOffset: [-20, -20],
        iconShape: {
            type: 'Circle',
            coordinates: [0, 0],
            radius: 20
        },
       });

       var placemarkTwo = new ymaps.Placemark(
       [59.94123829, 30.47903800],
       null, {
        iconLayout: 'default#image',
        iconImageHref: './img/icons/map-marker.svg',
        iconImageSize: [64, 64],
        iconImageOffset: [-20, -20],
        iconShape: {
            type: 'Circle',
            coordinates: [0, 0],
            radius: 20
        },
       });

        var placemarkThree = new ymaps.Placemark(
        [59.99494467, 30.39919150],
        null, {
        iconLayout: 'default#image',
        iconImageHref: './img/icons/map-marker.svg',
        iconImageSize: [64, 64],
        iconImageOffset: [-20, -20],
        iconShape: {
            type: 'Circle',
            coordinates: [0, 0],
            radius: 20
        },
        });

        var placemarkFour = new ymaps.Placemark(
        [59.93054321, 30.34896650],
        null, {
        iconLayout: 'default#image',
        iconImageHref: './img/icons/map-marker.svg',
        iconImageSize: [64, 64],
        iconImageOffset: [-20, -20],
        iconShape: {
            type: 'Circle',
            coordinates: [0, 0],
            radius: 20
        },
       });

        var placemarkFive = new ymaps.Placemark(
        [59.94843287, 30.22129800],
        null, {
        iconLayout: 'default#image',
        iconImageHref: './img/icons/map-marker.svg',
        iconImageSize: [64, 64],
        iconImageOffset: [-20, -20],
        iconShape: {
            type: 'Circle',
            coordinates: [0, 0],
            radius: 20
        },
       });



        burgerMap.geoObjects.add(placemarkOne);
        burgerMap.geoObjects.add(placemarkTwo);
        burgerMap.geoObjects.add(placemarkThree);
        burgerMap.geoObjects.add(placemarkFour);
        burgerMap.geoObjects.add(placemarkFive);
}