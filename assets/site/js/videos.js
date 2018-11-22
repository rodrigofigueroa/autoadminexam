var url_global = 'http://learndigitalskills.co.uk/';
var duration;

$(document).on('ready', function() {

  if($('section#module_view div.video').length>=1){
    var player_id = $('section#module_view div.video').data('player');
    playerModuleVideoSeptup(player_id);
  }

  // $( ".tutorial-step-list li a" ).on( "click", function(event) {
  $( document ).on( "click", ".tutorial-step-list li a", function(event) {
      event.preventDefault();
      var v = $(this).data('video');
      var q = $(this).data('quiz');
      var t = $(this).data('tutorial');
      var mde = $('#module_view').data('module');

      var val;

      if(v==0 && q==0){
        if(!isTouch){
          scrollToSelector($('#video_loader'));
        }else{
          hidePanel();
        }
        return false;
      }
      
      if(v){
        val = v;
      }else{
        val = q;
      }

      var tuto = $(this).parent().data('step-status');
      var step = $(this).parent().parent().parent().data('tutorial-status');

      if(tuto==="Pending"){
        $(this).parent().parent().parent().attr('data-tutorial-status','In Progress');
      }

      if(step==="Pending"){
        $(this).parent().attr('data-step-status','In Progress')
      }
      
      if($('#video_loader').length==1){
        $('#video_loader').remove();
      }

      if($('#quiz_loader').length==1){
        $('#quiz_loader').remove();
      }

      if(isTouch){
        hidePanel();
      }

      if(v){
        var html = '<div class="video" id="video_loader" data-parent="'+t+'" data-player="video'+val+'" data-jump="overview_loader"><iframe id="video'+val+'" src="//player.vimeo.com/video/'+val+'?api=1&amp;player_id=video'+val+'" width="500" height="281" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe></div>';
        $( html ).insertAfter( '#module_view header' );
        scrollToSelector($('#video_loader'));

        var player_id = $('section#module_view div.video').data('player');
        playerModuleVideoSeptup2(player_id);
      }else{
        $.ajax({
          type: "POST",
          url: url_global+"quiz/get_quiz",
          data: { q: q, m:mde }
        }).done(function( html ) {

          if($('#quiz_loader').length==1){ 
            $('#quiz_loader').empty(); 
          }else{
            $( '<section class="wrapper" id="quiz_loader" data-tutorial="'+t+'" />' ).insertAfter( '#module_view header' );
          }
          
          $('#quiz_loader').html(html);

          scrollToSelector($('#quiz_loader'));

        });
      }

  });

  $( document ).on( "click", "#quiz_start", function() {

      var m = $(this).data('mid');
      var q = $(this).data('qid');

      $.ajax({
          type: "POST",
          url: url_global+"quiz/get_question",
          data: { q: q, m:m }
        }).done(function( html ) {
          $('#quiz_loader').addClass('wrapper-narrow');
          $('#quiz_loader').html(html);
          scrollToSelector($('#quiz_loader'));
        });

  });

  $( document ).on( "click", "#quiz_next", function(event) {

      event.preventDefault();

      var m = $(this).data('mid');
      var q = $(this).data('qid');
      var ovr = $('.answers').data('overview');
      var s =  $('.answers').data('selected');

      $.ajax({
          type: "POST",
          url: url_global+"quiz/get_question",
          data: { q: q, m:m, o:ovr, s:s }
        }).done(function( html ) {
          $('#quiz_loader').addClass('wrapper-narrow');
          $('#quiz_loader').html(html);
          scrollToSelector($('#quiz_loader'));
        });

  });

  $( document ).on( "click", "div.answers div.answer label", function() {

    var ind = $(this).data('index');
    var ovr = $('.answers').data('overview');

    $('.answers').data('selected',ind);

    if(ind==ovr){
      $(this).parent().addClass('correct');
      $('p.correct_txt').fadeIn();
    }else{
      var w = $('.answer:eq('+ovr+') label span').text();
      $('p.wrong_txt strong:last-child').text(w.toUpperCase());
      $('p.wrong_txt').fadeIn();
      $(this).parent().addClass('wrong');
    }

    $('div.answers div.answer').click(false);

    $('#quiz_next').removeAttr('disabled');

  });

  $( document ).on( "click", "#quiz_end", function() {
    
    var m = $(this).data('mid');
    var q = $(this).data('qid');
    var t = $('#quiz_loader').data('tutorial');
    var mde = $('#module_view').data('module');

    $.ajax({
      type: "POST",
      url: url_global+"tracking/end_tutorial",
      data: { q: q, m:m, t:t }
    }).done(function( html ) {
    
      $.ajax({
          type: "POST",
          url: url_global+"modules/module_content",
          data: { m:mde }
        }).done(function( html2 ) {
          $('.overview').empty();
          $('.overview').html(html2);
          if(!isTouch){
            $('.overview-title').parent().find('.overview-content-wrapper').slideToggle(0, function () {  
              $(this).parents('.fixed-footer').toggleClass('active');
              scrollToSelector($('#overview_loader'));
            });
          }else{
            
              $('.overview-title').parent().find('.overview-content-wrapper').delay(150).slideToggle(300, function () {  
                $(this).parents('.fixed-footer').toggleClass('active');
                if(window.innerWidth > 300) {
                  $('.overview-title').toggleClass('active'); 
                }
              });   
            
          }
        });

    });

  });

});

hidePanel = function(){
    $('.overview').find('.overview-content-wrapper').delay(150).slideToggle(300, function () {  
      $(this).parents('.fixed-footer').toggleClass('active');
      $('.overview-title').toggleClass('active'); 
    });
  }

// Welcome Video
onFinishWelcomeView = function(id) {
  var url_redir = $('#'+id).parent().data('redirect');
  var vid_selector = $('.player_container_single_modal');
  var videos = vid_selector.length;
  if(url_redir){
      window.location.replace(url_redir);
  }
}

// Module Video
onPlayModuleVideo = function(id) {
    scrollToSelector($('#'+id));
    //var sel = $('#'+id).parent().data('jump');
}

onFinishModuleVideo = function(id) {
  var sel = $('#'+id).parent().data('jump');
  var tut = $('#'+id).parent().data('parent');
  var mde = $('#module_view').data('module');

  if(mde && $('body').hasClass('logged')){
    $.ajax({
      type: "POST",
      url: url_global+"tracking/tutorial",
      data: { t: tut, m: mde }
    }).done(function( msg ) {
      $('ol.tutorial-step-list li a[data-tutorial="'+tut+'"]').parent().removeAttr('data-step-status');
      $('ol.tutorial-step-list li a[data-tutorial="'+tut+'"]').parent().attr('data-step-status','Complete');
      // $('#'+sel).parent().find('.overview-content-wrapper').delay(150).slideToggle(300, function () {  
      //   $(this).parents('.fixed-footer').toggleClass('active');
      //   scrollToSelector($('#'+sel));
      // });

      $.ajax({
          type: "POST",
          url: url_global+"modules/module_content",
          data: { m:mde }
        }).done(function( html2 ) {

          $('.overview').empty();
          $('.overview').html(html2);
          if(!isTouch){
            $('.overview-title').parent().find('.overview-content-wrapper').slideToggle(0, function () {  
              $(this).parents('.fixed-footer').toggleClass('active');
              scrollToSelector($('#'+sel));
            });
          }

        });

    });
  }else{
    $.ajax({
      type: "POST",
      url: url_global+"tracking/tutorial_session",
      data: { m: mde }
    }).done(function( msg ) {
      scrollToSelectorNoPadding($('#'+sel));
    });
  }
}

playerWelcomeViewSeptup = function(player_id){
  var iframe = $('#'+player_id)[0],
    player = $f(iframe);
    duration = 0,
    player.addEvent('ready', function() {
      player.addEvent('finish', onFinishWelcomeView);
  });
}

playerModuleVideoSeptup = function(player_id){
  var iframe = $('#'+player_id)[0],
    player = $f(iframe);
    duration = 0,
    player.addEvent('ready', function() {
      player.addEvent('play', onPlayModuleVideo);
      player.addEvent('finish', onFinishModuleVideo);
  });
}

playerModuleVideoSeptup2 = function(player_id){
  var iframe = $('#'+player_id)[0],
    player = $f(iframe);
    duration = 0,
    player.addEvent('ready', function() {
      player.addEvent('play', onPlayModuleVideo);
      player.addEvent('finish', onFinishModuleVideo);
      player.api('play');
  });
}

scrollToSelector = function(selector){
  $('html, body').animate({ scrollTop: selector.offset().top-25 }, 800);
}

scrollToSelectorNoPadding = function(selector){
  $('html, body').animate({ scrollTop: selector.offset().top-4 }, 800);
}