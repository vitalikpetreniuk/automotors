$(function () {

    $('.header-lang-current').on('click', function () {
       $('.header-lang').toggleClass('open');
    });

    $('.header-search-open').on('click', function () {
       $('.header').addClass('with-search-open');
       $('.header-search').addClass('open');
       $('.back-shadow').addClass('open');
    });

    $('.header-search-close, .back-shadow').on('click', function () {
        $('.header').removeClass('with-search-open');
        $('.header-search').removeClass('open');
        $('.back-shadow').removeClass('open');
    });

    $('.about-slider').owlCarousel({
        items: 1,
        loop: true
    });

    var applicationSlider = $('.application-slider');
    var productSlider = $('.products-slider');

    var applicationNavItem = $('.application-nav button');
    var productNavItem = $('.products-nav-item');

    var companySection = $('.company');

    $('.products-slider-item, .application-slider-item').each(function () {
        var itemIndex = $(this).index();
        $(this).attr('data-id', itemIndex);
    });


    applicationNavItem.each(function () {
        var navIndex = $(this).index() + 1;
        $(this).prepend('<span>'+navIndex+'. </span>');
    });

    productNavItem.each(function () {
        var itemTarget = $(this).index();
        $(this).attr('data-target', itemTarget);
    });
    applicationNavItem.each(function () {
        var itemTarget = $(this).index();
        $(this).attr('data-target', itemTarget);
    });

    initSlider();

    function initSlider(){
        productSlider.owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            autoplayTimeout: 5000,
            autoplaySpeed: 1000,
            onInitialized: startProgressBar,
            onTranslate: resetProgressBar,
            onTranslated: startProgressBar
        }).on('translated.owl.carousel', function() {
            var slideActive = $(this).find('.owl-item.active .products-slider-item').attr('data-id');
            $('.products-nav-item[data-target='+slideActive+']').addClass('active').siblings().removeClass('active');
        });
    }

    function startProgressBar() {
        $('.products-nav-item.active').addClass('loading');
    }

    function resetProgressBar() {
        $('.products-nav-item:not(.active)').removeClass('loading');
    }

    applicationSlider.owlCarousel({
        items: 1,
        nav: true,
        loop: true,
        responsive:{
            0:{
                margin: 10
            },
            575:{
                margin: 32
            },
            1800:{
                margin: 40
            }
        }
    }).on('translated.owl.carousel', function() {
        var slideActive = $(this).find('.owl-item.active .application-slider-item').attr('data-id');
        $('.application-nav button[data-target='+slideActive+']').addClass('active').siblings().removeClass('active');
    });

    productNavItem.on('click', function () {
        var slideActive = $(this).attr('data-target');
    }).on('mouseenter', function () {
        var slideActive = $(this).attr('data-target');
        productSlider.trigger('to.owl.carousel', [slideActive, 100]);
    });
    applicationNavItem.on('click', function () {
        var slideActive = $(this).attr('data-target');
        applicationSlider.trigger('to.owl.carousel', [slideActive, 100]);
    });

    function offsetLeft() {
        $('.container-fake').each(function () {
            var offsetLeftPx = $(this).offset().left;
            $('.about-item-cont').css('margin-left', offsetLeftPx + 20);
        });
    }

    $('.slider-double .item').each(function () {
        var itemIndex = $(this).index();
        $(this).attr('data-id', itemIndex);
    });

    var sliderMain = $('.slider-double-main');
    sliderMain.each(function () {
        $(this).clone().removeClass('slider-double-main').addClass('slider-double-nav').insertAfter($(this));
        $(this).addClass('slider-nav').owlCarousel({
            items: 1,
            dots: true,
            nav: true,
            smartSpeed: 200,
            margin: 30
        });
        $(this).find('.owl-dot').each(function(){
            $(this).attr('data-id', $(this).index());
        });
    });

    var sliderNav = $('.slider-double-nav');
    sliderNav.owlCarousel({
        items: 4,
        dots: false,
        // mouseDrag: false,
        // touchDrag: false,
        video: true,
        responsive:{
            0:{
                margin: 3
            },
            1800:{
                margin: 5
            }
        }
    });

    $('.slider-double .owl-item').each(function () {
        var itemIndex = $(this).find('.item').attr('data-id');
        $(this).attr('data-id', itemIndex);
    });

    sliderMain.on('translated.owl.carousel', function() {
        var slideActive = $(this).find('.owl-item.active').attr('data-id');
        sliderNav.trigger('to.owl.carousel', [slideActive, 100]);
        sliderNav.find('.owl-item[data-id="' + slideActive +'"]').addClass('current').siblings().removeClass('current');
    });

    sliderNav.each(function () {
        $(this).find('.owl-item:first-child').addClass('current');
        $(this).find('.owl-item').on('click', function () {
            $(this).addClass('current').siblings().removeClass('current');
            var slideActive = $(this).attr('data-id');
            sliderMain.find('.owl-dot[data-id="' + slideActive +'"]').trigger('click');
        })
    });

    offsetLeft();

    var num = 0;
    $(window).on('resize', function () {
        offsetLeft();
    }).on('scroll load', function () {
        var windowScrollTop = $(this).scrollTop();
        if(companySection.length){
            var companyHeight = companySection.outerHeight();
            var companyOffsetTop = companySection.offset().top;
            if(companyOffsetTop - windowScrollTop - companyHeight/2 < 0){
                $('.bg-change').addClass('white-bg');
            }else{
                $('.bg-change').removeClass('white-bg');
            }
        }
    }).on('scroll resize', function () {
        var windowScrollTop = $(this).scrollTop();
        if(windowScrollTop > 0){
            $('.header').addClass('fixed');
        }else{
            $('.header').removeClass('fixed');
        }
    }).on('load resize', function() {

        if (window.matchMedia('(max-width: 1279px)').matches) {

            if(num == 0){
                $('.product-page-gallery').insertBefore('.product-page-block-right');
                sliderMain.trigger('refresh.owl.carousel');
                num = 1;
            }

        } else {

            if(num == 1){
                $('.product-page-gallery').insertAfter('.product-page-cont');
                num = 0;
            }

        }

    }).on('click', function() {
        $('.page-wrap.open').removeClass('open');
    });

    $('.application-slider .owl-nav').prependTo('.application-nav');

    $('.call-in').on('click touchstart', function () {
       $('.modal-call').addClass('open');
    });

    $('.modal-back, .modal-close').on('click touchstart', function () {
       $(this).closest('.modal').removeClass('open');
    });

    $('.advantages-item').each(function () {
       var advIndex = $(this).index() + 1;
       $(this).find('.advantages-item-num').text('0' + advIndex);
    });

    $('.favorites-item').each(function () {
       var projectNum = $(this).index() + 1;
       $(this).prepend('<div class="favorites-item-num">0'+projectNum+'</div>');
    });

    $('.projects-item').each(function () {
       var projectNum = $(this).index() + 1;
       $(this).find('.projects-item-cont').prepend('<div class="projects-item-num">0'+projectNum+'</div>');
    });

    $('.favorites-slider').owlCarousel({
        nav: true,
        items: 1
    });

    $('.projects-slider').owlCarousel({
        nav: true,
        dots: false,
        items: 1,
        margin: 320
    });

    $('.slider-block').owlCarousel({
        nav: true,
        items: 1
    });

    $('.text-toggle-button').on('click', function () {
       $(this).toggleClass('active');
       $(this).siblings('.text-toggle').toggleClass('open');
    });

    $('.tabs-nav-item:first-child, .tabs-cont-item:first-child').addClass('active');

    $('.tabs-nav-item').each(function () {
       var tabIndex = $(this).index() + 1;
       $(this).on('click', function () {
          $(this).addClass('active').siblings().removeClass('active');
          $(this).closest('.tabs').find('.tabs-cont-item:nth-child('+tabIndex+')').addClass('active').siblings().removeClass('active');
       });
    });

    $('.downloads-more').on('click', function () {
        $(this).toggleClass('active');
        $('.downloads-list').toggleClass('open');
    });

    $('.video-cover').on('click', function () {
       $(this).addClass('hidden');
    });

    $('.btn-more').on('click', function () {
        $('html,body').animate({scrollTop: $(this).closest('section').next().offset().top},'slow');
    });

    $('.page-filter').on('click', function (e) {
        e.stopPropagation();
    });

    $('.page-filter-toggle').on('click', function (e) {
       $('.page-wrap').toggleClass('open');
        e.stopPropagation();
    });

    $('.page-filter-block-more').on('click', function () {
        $(this).closest('.page-filter-block').toggleClass('open');
    });

    $('button.page-filter-block-title').on('click', function () {
        $(this).closest('.page-filter-block').removeClass('closed');
    });


    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('.header').outerHeight();

    $(window).on('scroll', function(event){
        didScroll = true;
    });

    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    function hasScrolled() {
        var st = $(this).scrollTop();

        if(Math.abs(lastScrollTop - st) <= delta)
            return;

        if (st > lastScrollTop && st > navbarHeight){
            $('.header').removeClass('header-down');
        } else {
            if(st + $(window).height() < $(document).height()) {
                $('.header').addClass('header-down');
            }
        }

        lastScrollTop = st;
    }

    $('.product-nav-item').on('click', function () {
       var target = $(this).attr('data-target');
       var productName = $(this).text();
        $('.product-nav-button').text(productName);
        $('.product-nav-in').slideUp('fast');
        $('html,body').animate({scrollTop: $('[data-id='+target+']').offset().top - 100},'slow');
    });

    $('.header-toggle').on('click', function () {
       $('.header').toggleClass('open');
       $('.header-menu').slideToggle('fast');
    });

    $('.product-nav-button').on('click', function () {
        $(this).toggleClass('open');
        $('.product-nav-in').slideToggle('fast');
    });

    $('.toggle-text-button').on('click', function () {
        $(this).toggleClass('open').siblings('.toggle-text-cont').slideToggle('fast');
    });


});
