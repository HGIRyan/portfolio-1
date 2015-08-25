$(document).ready(function(){

  var modalText = {
    roambi: {
      header: 'Roambi.com',
      color: '#FF8FBD',
      detail: 'Roambi provides analytics, reporting, and business intelligence for companies to use on the go.',
      bullets: ['Wordpress','Visual Analytics','Hubspot Integration'],
    },
    walker: {
      header: 'WalkerTracker',
      color: '#81FFCC',
      detail: 'Walker Tracker offers goal management, fitness tracking, and team competitions to companies for internal use.',
      bullets: ['Gamification','Visual Analytics','Device Integration']
    },
    powur: {
      header: 'Powur.com',
      color: '#8BE7FF',
      detail: 'Powur is a multi-level marketing platform for lead generation, recruitment, and team building.',
      bullets: ['Rails App','Visual Analytics','Team Tree Management']
    },
    mystand: {
      header: 'MyStand',
      color: '#FF4E4E',
      detail: 'MyStand is a crowd-funding, media sharing website, that has you donating actions instead of money out of your pocket.',
      bullets: ['Social Networking','Media Sharing','Crowd-funding']
    },
    never: {
      header: 'NeverSurrender',
      color: '#FFD2E0',
      detail: 'NeverSurrender is a platform for the new ALS foundation mobile app in hopes to raise awareness and research funding to fight ALS.',
      bullets: ['Single Page App','Parallax Effects','Fluid Design']
    },
  };

  $(document).foundation();

  function initProjects() {
    var slidesToShow = 3;
    if ($(window).width() < 650) slidesToShow = 1;
    $('.projects').show();
    var slider = $('#projects-carousel').slick({
      centerMode: true,
      infinite: true,
      slidesToShow: slidesToShow,
      dotsCount: 4,
      slidesToScroll: 1,
      autoplay: false,
      // dots: true,
      arrows: false,
      focusOnSelect: true,
      pauseOnHover: true,
      speed: 700,
      autoplaySpeed: 2000
    });
    $(slider).slick('slickPlay');
    setTimeout(function(){
      $(slider).slick("slickNext");
    },400);
  }

  function destroyCarousel() {
    if (!$('.projects').is(":visible")) return;
    $('#projects-carousel').slick('unslick');
    $('.projects').hide();
  }

  $(window).resize(function(){
    if(!$('.projects').hasClass('active') || $(window).width() > 650) return;
    destroyCarousel();
    initCarousel();
  });

  // var dragging;

  // $('.slide-img').mousedown(function(){
  //   dragging = false;
  //   setTimeout(function(){
  //     dragging = true;
  //   }, 500)
  // });

  $('.slide-img').mouseup(function(){
    if (!$(this).parent().is('.slick-current')) return;
    var id = $(this).attr('id');
    // if (!dragging) {
      fillModal(id);
      $('#modal').foundation('reveal', 'open');
      setTimeout(function(){ $('#modal-carousel').slick({
        adaptiveHeight: true,
        arrows: true,
        prevArrow: '<i class="fa fa-chevron-left"></i>',
        nextArrow: '<i class="fa fa-chevron-right"></i>'
      }) }, 150);
      // $('.carousel').slick('slickPause');
    // }
  })

  $('.slide-img').mouseover(function(){
    $('#projects-carousel').slick('slickPause');
  })

  function fillModal(id) {
    if ($('#modal-carousel').is('.slick-initialized')) {
      $('#modal-carousel').slick('unslick');
    }
    $('#modal').find('.header').text(modalText[id].header)
                               // .css('color',modalText[id].color)
    $('#modal').find('.detail').text(modalText[id].detail)

    $.each($('#modal').find('li'), function(index, value ) {
      $(this).text(modalText[id].bullets[index])
    });
    $.each($('#modal').find('.slide'), function(index, value) {
      $(this).children('img').attr('src', 'images/slides/' + id + '-' + index + '.jpg');
    })
    
  }

  // $('.slide-img').click(function(){
  //   $('.carousel').slick('slickPause');
  // })

  $('.landing-sect span').fadeIn(8000);

  $('.p1').on('click', function(){
    $('.icon-box').show();
    if ($(this).hasClass('active')) return;
    $('.connect').addClass('active');
    $('.p1').addClass('extend');

    $('.p2, .p4').addClass('shutter');
    $('.p3').addClass('clear extend');
    $('.icon').addClass('pop-in');
  });

  $('.p2').on('click', function(){
    if ($(this).hasClass('active') || $(this).hasClass('clear')) return;
    $('.about-box').fadeIn();
    $('.myface').hide();
    setTimeout(function(){
      $('.myface').show(); 
    }, 700);
    var id = parseInt($(this).attr('id'));
    shutterPanels(id);
  });

  $('.p3').on('click', function(){
    if ($(this).is('.active, .clear, .start')) return;
    // $('.clouds').hide();
    $('.projects').show();
    $('.projects').addClass('active');
    initProjects();
    var id = parseInt($(this).attr('id'));
    $(this).addClass('extend');
    shutterPanels(id)
  });

  $('.p4').on('click', function(){
    if ($(this).hasClass('active')) return;
    $('.stack').show();
    $('.p3').addClass('shutter');
    $('.p1').addClass('retract');
    $('.p2').addClass('clear');
  });

  $('.pane').on('click', function(){
    if ($(this).hasClass('start') || $(this).hasClass('clear')) return;
    if ($('.pane').hasClass('active')) {
      returnPanels();
    } else {
      $(this).toggleClass('active');
    }
  });

  $('.logo').on('click', function(){
    if ($('.p1, .p2, .p3, .p4').hasClass('shutter')) {
      returnPanels();
    } else {
      $('.p3').addClass('start');
      $('.clouds.inverse').fadeIn();
      shutterPanels(0);
    }
  });

  $('.box').mouseover(function(){
   if ($(this).find('.badge').css('transform') !== 'none') return;
    $(this).addClass('move');
  });

  $('.box').mouseleave(function(){
    if ($(this).find('.badge').css('transform') === 'none') return;
    $(this).removeClass('move');
  });

  function shutterPanels(id) {
    hideClouds();
    if (!id) $('.landing-sect').removeClass('shutter');
    var n = id;
    for (var i = 0; i < 4; i++) {
      n += 1;
      if (n === 5) n = 1;
      if (n === id) continue;
      $('#'+n).addClass('shutter');
    }
  }

  function hideClouds() {
    setTimeout(function(){
      $('clouds').hide();
    },300);
  }

  function returnPanels() {
    $('.clouds').fadeIn();
    $('.clouds.inverse, .stack').hide();
    setTimeout(function(){ 
      $('.about-box').hide();
      $('.icon').removeClass('pop-in');
      destroyCarousel(); 
    },300)
    $('.landing-sect').addClass('shutter');
    $('section').removeClass('active');

    for (var i = 1; i < 5; i++) {
      $('#'+i).removeClass('shutter clear extend retract start active');
    }
  }
});