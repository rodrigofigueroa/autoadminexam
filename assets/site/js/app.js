var user_text = [];
// Global Forms
user_text[0] = [ 'This field is required.', 'Please enter valid email address.' ];
// Profile
user_text[1] = [ 'Please enter your first name and last name.' ];
// Password
user_text[2] = [ 'Your new password and verification password do not match.', 'Your password must be at least 6 characters long and is case-sensitive.' ];

var isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));

var label_error = function(text){
  var label = '<label class="error_field">'+text+'</label>';
  return label;
};

var validateEmail = function(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

var mobile_fixed_footer = function () {
  var _self,
    body,
    is_fixed_footer,
    fixed_footer_node;
    
    _self = this;
    body = $('body');
    is_fixed_footer = body.attr('data-fixed-footer');
    fixed_footer_node = $(is_fixed_footer);
    
  if(is_fixed_footer == undefined || is_fixed_footer == "" || fixed_footer_node[0] == undefined) return;
  
  body.wrapInner('<div class="fixed-main-viewport" />').addClass('fixed-footer-body');
  fixed_footer_node.appendTo('body').addClass('fixed-footer');
};

var show_hide_experts = function (element) {
  var expert,
    description,
    opened;
  expert = $(element).parents('.expert');
  description = expert.find('.expert-description');
  if(!expert.hasClass('active')){

    if($('div.expert.active').length==0){
      scrollToSelectorNoPadding($(element));
    }

    $('div.expert.active')
      .removeClass('active')
      .find('div.expert-description')
      .slideUp(200,function(){
        scrollToSelectorNoPadding($(element));
      });
    
    expert.addClass('active');
    description.delay(200).slideDown(300);
  }else {
    expert.removeClass('active');
    description.slideUp(300);
  }
};


var openSelect = function(elem) {
    if (document.createEvent) {
        var e = document.createEvent("MouseEvents");
        e.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        elem[0].dispatchEvent(e);
    } else if (element.fireEvent) {
        elem[0].fireEvent("onmousedown");
    }
};

(function ($) {

  if(!isTouch){
    if($('[data-scroll="true"]').length==1){
      scrollToSelector($('#overview_loader'));
    }
  }

  $('ul#resources-index li p a').on('click',function(event){
    event.preventDefault();
    var url = $(this).attr('href');
    scrollToSelector($(url));
  });

  $(".selectbox i").on('click',function() {
    var id = $(this).parent().children('select').attr('id');
    var selector = $('select#'+id);
    openSelect(selector);
  });

  $('form#login_form, form#register_form').submit(function( event ) {
    
    var e = $('input#email');
    var p = $('input#password');

    e.removeClass('error_field');
    p.removeClass('error_field');

    e.prev().remove('label.error_field');
    p.prev().remove('label.error_field');

    if( e.val()=='' || p.val()=='' ) {
      event.preventDefault();
      
      if( e.val()=='' ){
        $(label_error(user_text[0][0])).insertBefore(e);
        e.addClass('error_field');
      }

      if( p.val()=='' ){
        $(label_error(user_text[0][0])).insertBefore(p);
        p.addClass('error_field');
      }
    }else{

      if( validateEmail(e.val())==false ){
        event.preventDefault();
        $(label_error(user_text[0][1])).insertBefore(e);
        e.addClass('error_field');
      }

    }

  });

  $('form#login_adm_form').submit(function( event ) {
    
    var e = $('input#username');
    var p = $('input#password');

    e.removeClass('error_field');
    p.removeClass('error_field');

    e.prev().remove('label.error_field');
    p.prev().remove('label.error_field');

    if( e.val()=='' || p.val()=='' ) {
      event.preventDefault();
      
      if( e.val()=='' ){
        $(label_error(user_text[0][0])).insertBefore(e);
        e.addClass('error_field');
      }

      if( p.val()=='' ){
        $(label_error(user_text[0][0])).insertBefore(p);
        p.addClass('error_field');
      }
    }

  });

  $('form#edit_profile').submit(function( event ) {
    
    var n = $('input#name');
    var e = $('input#email');

    n.removeClass('error_field');
    e.removeClass('error_field');

    n.prev().remove('label.error_field');
    e.prev().remove('label.error_field');

    if( n.val()=='' || e.val()=='' ) {
      event.preventDefault();
      
      if( n.val()=='' ){
        $(label_error(user_text[0][0])).insertBefore(n);
        n.addClass('error_field');
      }

      if( e.val()=='' ){
        $(label_error(user_text[0][0])).insertBefore(e);
        e.addClass('error_field');
      }
    }else{

      if( validateEmail(e.val())==false ){
        event.preventDefault();
        $(label_error(user_text[0][1])).insertBefore(e);
        e.addClass('error_field');
      }

    }

  });

  $('.social ul li a.fb').on('click',function(event){
    event.preventDefault();
    var url = $(this).data('url');
    FB.ui(
     {
      method: 'share',
      href: url
    }, function(response){});
  });

  $('.social ul li a.lk').on('click',function(event){
    event.preventDefault();
    var url = $(this).data('url');
    var ops = "height=450,width=500,scrollTo,resizable=0,scrollbars=0,location=0";
    window.open(url, 'Linkedin', ops);

  });

  $('form#edit_password').submit(function( event ) {

    var od = $('input#password_od');
    var nw = $('input#password_nw');
    var vf = $('input#password_vf');

    od.removeClass('error_field');
    nw.removeClass('error_field');
    vf.removeClass('error_field');

    od.prev().remove('label.error_field');
    nw.prev().remove('label.error_field');
    vf.prev().remove('label.error_field');

    if( (nw.val().length<6 || nw.val()=='') || (vf.val().length<6 || vf.val()=='') || od.val()=='') {

      event.preventDefault();

      if( nw.val().length<6 ){
        $(label_error(user_text[2][1])).insertBefore(nw);
        nw.addClass('error_field');
      }

      if( vf.val().length<6 ){
        $(label_error(user_text[2][1])).insertBefore(vf);
        vf.addClass('error_field');
      }

      if(od.val()==''){
        $(label_error(user_text[0][0])).insertBefore(od);
        od.addClass('error_field');
      }

    }else{

      if( nw.val()!=vf.val() ){
        event.preventDefault();
        $(label_error(user_text[2][0])).insertBefore(nw);
        nw.addClass('error_field');
        vf.addClass('error_field');
      }

    }

  });

$('form#edit_password_new').submit(function( event ) {

    var nw = $('input#password_nw');
    var vf = $('input#password_vf');

    nw.removeClass('error_field');
    vf.removeClass('error_field');

    nw.prev().remove('label.error_field');
    vf.prev().remove('label.error_field');
    
    if( (nw.val().length<6 || nw.val()=='') || (vf.val().length<6 || vf.val()=='')) {

      event.preventDefault();

      if( nw.val().length<6 ){
        $(label_error(user_text[2][1])).insertBefore(nw);
        nw.addClass('error_field');
      }

      if( vf.val().length<6 ){
        $(label_error(user_text[2][1])).insertBefore(vf);
        vf.addClass('error_field');
      }

    }else{

      if( nw.val()!=vf.val() ){
        event.preventDefault();
        $(label_error(user_text[2][0])).insertBefore(nw);
        nw.addClass('error_field');
        vf.addClass('error_field');
      }

    }

  });

  if($('div.collapsable').length==1 && ($(window).width()>=768 || $(window).width()<=1024)){
    $('div.collapsable').addClass('active').delay(1).slideDown(0);
  }

  if($('.overview-title').length==1){

    if(!isTouch){
      $('.overview-title').parent().find('.overview-content-wrapper').delay(150).slideToggle(300, function () {  
        $(this).parents('.fixed-footer').toggleClass('active');
      });
    }
    
  }
  
  $('.videos').fitVids();

  $('[data-link]').on('click',function(){
    var url = $(this).data('link');
    window.location.href = url;
  });

  $('button[data-modal]').on('click',function(){
    var modal = $(this).data('modal');
    var player_id = $(this).data('player'); 
    $.fancybox( 
      '#'+modal,
                { 
                  padding: 0, 
                  margin: 20, 
                  autoCenter: true, 
                  scrolling: 'hidden', 
                  scrollOutside: false, 
                  minWidth: 265, 
                  minHeight: 148, 
                  width: 960, 
                  height: 539,
                  aspectRatio: true, 
                  beforeLoad: function(){ 
                    var url = $('#'+modal).children('iframe').attr('src');
                    var n_url = url+'&amp;autoplay=1';
                    $('#'+modal).children('iframe').attr('src',n_url); 
                  }, 
                  afterLoad: function(){ 
                    playerWelcomeViewSeptup(player_id); 
                  }, 
                  beforeClose: function() { 
                    var redirection = $('#'+modal).data('redirect'); 
                    if(redirection){ window.location.href = redirection; } 
                  } 
                });
  });

//  show_expert_description.init();
  $.fn.touchclick = function (callback, desktop) {
    var move = false;
    desktop = desktop == undefined ? true : desktop;
    if('ontouchstart' in window){
      $('body').addClass('touch');
      this.bind('touchmove touchend', function (e) {
        switch (e.originalEvent.type) {
          case 'touchmove':
            move = true;
          break;
          case 'touchend':
            if(!move){
              if(!typeof callback == 'function') return this;
              callback.call(this);
            }
            move = false;
          break;
        }      
      });
    } else {
      if(!desktop) return this;
      this.bind('click', function () {
        if(!typeof callback == 'function') return this;
        callback.call(this);
      });
    }
    return this;
  };
  
  
  $('div.expert-thumb').add('button.btn-close').touchclick(function() {
    show_hide_experts(this);
  });
  
  $('.collapser').touchclick(function () {
    //console.log($(this).parent());
    var collapsable;
    collapsable = $(this).parent().find('.collapsable');
    
    if(collapsable.hasClass('active')){
      collapsable.removeClass('active').slideUp(300);
    } else {
      $('div.collapsable.active').removeClass('active').slideUp(50);
      collapsable.addClass('active').delay(150).slideDown(250);
    }
    
  }, false);
  
  $('body').touchclick(function (e) {
    //console.log(e.target);
  }, false);
  
  $('#toggle-nav').touchclick(function () {
    $(this).parent().find('#main-nav-menu').delay(150).slideToggle(300, function () {  
      $(this).parent().toggleClass('active'); 
    });  
  });
  
  // $('.overview-title').touchclick(function () {

  if(isTouch){
    $( '.overview' ).on( "click", ".overview-title", function() {
      $(this).parent().find('.overview-content-wrapper').delay(150).slideToggle(300, function () {  
        $(this).parents('.fixed-footer').toggleClass('active');
        if(window.innerWidth > 300) {
          $('.overview-title').toggleClass('active'); 
        }
      });   
    });
  }else{
    $( document ).on( "click", ".overview-title", function() {
    $(this).parent().find('.overview-content-wrapper').delay(150).slideToggle(300, function () {  
      $(this).parents('.fixed-footer').toggleClass('active');
      if(window.innerWidth > 300) {
        $('.overview-title').toggleClass('active'); 
      }
    });   
    });
  }

  $('[data-charge-progress]').each(function () {
    var node,
      progress;
    node = $(this);
    progress = node.attr('data-charge-progress');
    if(progress == "") return;
    
    node.find('span').css('height', progress + '%');
    
  });
  // SETS FIXED FOOTER ONLY IN SMALL DEVICES (ADAPTIVE, NOT RESPONSIVE)
  if(window.innerWidth < 768) mobile_fixed_footer();
  if($('body').hasClass('red')) $('html').addClass('red');
  
}(jQuery));