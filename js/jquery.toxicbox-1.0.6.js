/**
* jquery.toxicbox ver.1.0.6
* ToxicBox - © 2015-2016 Berestov Andrey
* http://my-gallery.name
*/

var toxicbox_options={};

$( document ).ready(function() {(function () {

var l='en',
  rl={
    im : 'Фото',
    o : 'из'
  },
  el={
    im : 'Image',
    o : 'of'
  },
  basic_width = 960, 
  auto_width = 'on',
  iu="images/toxic/", 
  ps = 5, 
  sp =1,
  alert_width = 300, 
  start_box_size = 150,
  isMobile = { 
    Android: function() {
      return navigator.userAgent.match(/Android/i); 
    },
    BlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    } 
  },
  width = $(window).width(),
  height = $(window).height(),
  ci=$('a[data-toxic="group"]').length,
  ai = $('a[data-toxic="group"]'),
  ch=0,
  cw=0,
  back_src,
  next_src,
  cd,
  current_databox,
  is_single,
  zoom,
  cl;

//initialization settings
  
if (Object.keys(toxicbox_options).length) {
  if(toxicbox_options.language) l=toxicbox_options.language;	
  if(toxicbox_options.padding) ps=toxicbox_options.padding;	
  if(toxicbox_options.images_url) iu=toxicbox_options.images_url;	
  if(toxicbox_options.alert_width) alert_width=toxicbox_options.alert_width;	
  if(toxicbox_options.basic_width) basic_width=toxicbox_options.basic_width;	
  if(toxicbox_options.auto_width) auto_width=toxicbox_options.auto_width;	
  if(toxicbox_options.speed) sp=toxicbox_options.speed;
  if(toxicbox_options.start_box_size) start_box_size=toxicbox_options.start_box_size;
}	

var old_width=start_box_size-ps*2,
  old_height=old_width;

$("a[data-toxic='single'], a[data-toxic='group']")
  .addClass('toxic_zoom');

$(new Image())
  .attr('src', iu+'loader.gif');

if (l=='ru') {
  cl=rl;
  } else {
  cl=el; 
}	

//correction for Mobile

function FixWidthForMobile() {
  if((navigator.userAgent.indexOf("Presto") + 1)||(navigator.userAgent.indexOf("iPhone") + 1)||(navigator.userAgent.indexOf("iPad") + 1)||(navigator.userAgent.indexOf("Android") + 1)) {
    width = window.innerWidth ;
  }
}

FixWidthForMobile();

function get_zoom(){
  zoom = Math.round(((window.outerWidth) / window.innerWidth)*100) / 100;
  return zoom;
}

document.body.addEventListener('touchend', function(e){
  zoom = get_zoom();
  width =(screen.width)/zoom;height = window.innerHeight;
  FixWidthForMobile();
}, false);

$( window ).resize(function() {
  if (!isMobile.any()){
    var ts=$("#toxic_showbox");
    zoom = get_zoom();
    width =$(window).width();height = $(window).height();
    if(ts){
      ts.css({'margin-left':0+'px','margin-top':0+'px','left':((width/2)-((cw)/2+ps)+$(window).scrollLeft())+'px','top':((height/2+$(window).scrollTop())-((ch)/2+ps))+'px'});
      if (parseInt(ts.css('top'))<0){ts.css('top','0');}
          }
                      }
});

//Processing loader

function image_start_load (){
  $('body')
    .prepend('<img src="'+iu+'loader.gif" alt="" id="toxic_loading" style="margin-top:'+((height/2-20)+$(window).scrollTop())+'px;margin-left:'+(width/2 - 20+$(window).scrollLeft())+'px;"  />');
}

function image_start_load_fix (){
  $('#toxic_loading')
    .fadeIn(100);
}

//Display of images

function chk_arrow(){
  if (!back_src) $('#toxic_showbox .toxic_larrow a').remove();
  if (!next_src) $('#toxic_showbox .toxic_rarrow a').remove();	
}
function check_images(ct){
  var ts=$("#toxic_showbox"), 
    tl=$('#toxic_loading'),
    cin,
    i;
  function fix_img_height(correct){
    $(correct)
      .css({'max-height':''+(height-ttx.height()-ps*2)+'px','width':'auto'});
    cw=$(correct).width();
    $(correct).css('width',cw+'px');
    ch = $(correct).height();
    }
    ts
      .prepend('<img src="'+$(cd).attr('href')+'" alt="" class="toxic_current toxic_hidden" style="max-width:'+(width-ps*2)+'px;max-height:'+height+'px;" /><div id="toxic_textarea" class="toxic_hidden" style="min-height:44px;"></div>');
    var ttx=$('#toxic_textarea');
    for(i=0;i<ci;i++){
      if(cd==ai[i]) {
        cin=i+1;
        back_src=ai[i-1];
        next_src=ai[i+1];
        $(new Image())
          .attr('src', $(back_src).attr('href'));
        $(new Image())
          .attr('src', $(next_src).attr('href'));
        break;
      }
    }
    $(".toxic_current")
      .load(function() {
        ch = $(this).height();
        cw = $(this).width();
        fix_img_height(this);
        if(ct){	
          if (is_single==2 ) {
              ttx
                .css('width',(cw-ps*2-40))
                .html('<div id="toxic_arrow_carrier" style="width:'+cw+'px;"><div class="toxic_left toxic_larrow" style="margin-left:-20px;" ><a href="#back"><img src="'+iu+'left.png" alt="" /></a></div><div class="toxic_left toxic_rarrow"><a href="#next"><img src="'+iu+'right.png" alt="" /></a></div></div><p class="toxic_center countofimages">'+cl.im+' '+cin+' '+cl.o+' '+ci+'</p><p class="toxic_center toxic_title">'+ct+'</p>');
                chk_arrow();
          }
          if (is_single==1 ) {
              ttx
                .html('<p class="toxic_center toxic_title" style="width:'+($(this).width()-40)+'px;padding-top:4px;">'+ct+'</p>');
          }
        }else{
          if (is_single==2 ) {
              ttx
                .html('<p class="toxic_center countofimages" >'+cl.im+' '+cin+' '+cl.o+' '+ci+'</p>')
                .prepend('<div id="toxic_arrow_carrier" style="width:'+cw+'px;"><div class="toxic_left toxic_larrow" style="margin-left:-20px;" ><a href="#back"><img src="'+iu+'left.png" alt="" /></a></div><div class="toxic_left toxic_rarrow"><a href="#next"><img src="'+iu+'right.png" alt="" /></a></div></div>');
                chk_arrow();
		  }
          if (is_single==1 ){
              ttx
                .css('height',20+'px')
                .css('min-height',0);
		  }
        }
		
        fix_img_height(this);

        // TODO: Recall fix_img_height makes the calculation more precise
		
        $('#toxic_showbox .toxic_rarrow, #toxic_showbox .toxic_larrow')
          .css('width',''+((cw+20)/2-10)+'px');
        ch=ttx.height()+ch;
        ts
          .prepend('<a href="#index"><img id="toxic_close" class="toxic_hidden images_close" src="'+iu+'close.png" alt="" /></a>');
        $('#toxic_close')
          .css({'margin-left':(cw-20)+'px','margin-top':(ch-20)+'px'});
        ts
          .animate( {
            width:cw,
            height:ch,
            marginLeft:-(cw/2-(old_width)/2),
            marginTop:(-height/2+(height-ch)/2+old_height/2)
          },
		  500/sp,
		  function() {
		    tl
		      .fadeOut(100);
		    ttx
		      .css('width',(cw-40));
		      $('#toxic_showbox .toxic_current, #toxic_showbox #toxic_textarea, #toxic_showbox #toxic_close').fadeIn(200/sp);
		      }
		  );
      });
}
	
function st_set_after_cl_img() {
  var ct=$(cd).attr('title');
    $('body')
      .append('<div id="toxic_dark" class="images_close"></div><div id="toxic_showbox" style="height:'+old_height+'px;width:'+old_width+'px;left:'+(width/2-ps-old_width/2+$(window).scrollLeft())+'px;top:'+((height)/2-ps-old_height/2+$(window).scrollTop())+'px;padding:'+ps+'px;"></div>');
    image_start_load();
    $(new Image())
      .attr('src', ''+$(cd).attr('href')+'')
      .load(check_images(ct));
    }
	
//Display of containers	
	
function standart_setting_after_click_databox () {
    current_databox = $('#'+$(cd).attr('data-toxic-databox'));	
    $('body')
      .append('<div id="toxic_dark" class="div_close"></div><div id="toxic_showbox" style="height:'+old_height+'px;width:'+old_width+'px;left:'+(width/2-ps-old_width/2+$(window).scrollLeft())+'px;top:'+((height)/2-ps-old_height/2+$(window).scrollTop())+'px;padding:'+ps+'px;"></div>');
    var ts=$("#toxic_showbox");
    image_start_load();
    var tl=$('#toxic_loading');
    cw=current_databox.width()+(parseInt(current_databox.css('border-left-width')))+(parseInt(current_databox.css('border-right-width')))+(parseInt(current_databox.css('paddingLeft')))+(parseInt(current_databox.css('paddingLeft')));
    if (cw==width) {
      if (auto_width=='on') {
        cw=basic_width;
        $(current_databox)
          .css('width',cw+'px');
      }else {
        cw=width-ps*2;
      }
    }
    if (cw>width) {
      cw=width-(parseInt(current_databox.css('border-left-width')))-(parseInt(current_databox.css('border-right-width')))-(parseInt(current_databox.css('paddingLeft')))-(parseInt(current_databox.css('paddingLeft')))-ps*2;
      current_databox
        .css({'width':cw+'px','height':'auto'})
        .find('iframe')
        .attr('width',cw);
    }   
    if ($(cd).attr('title')) {
      ts
        .prepend('<h2 id="toxic_h2" style="width:'+cw+'px;" class="toxic_hidden">'+$(cd).attr('title')+'</h2>');
      ch = $(current_databox).height()+parseInt($('#toxic_h2').css( 'height'))+20+(parseInt(current_databox.css('border-top-width')))+(parseInt(current_databox.css('border-bottom-width')))+(parseInt(current_databox.css('padding-top')))+(parseInt(current_databox.css('padding-bottom')));
    }else {
      ch = $(current_databox).height()+20+(parseInt(current_databox.css('border-top-width')))+(parseInt(current_databox.css('border-bottom-width')))+(parseInt(current_databox.css('padding-top')))+(parseInt(current_databox.css('padding-bottom')));
    }	
    ts
      .animate( {
        width:cw,
        height:ch,
        marginLeft:-(cw/2-old_width/2),
        marginTop:(-height/2+(height-ch)/2+old_height/2)
	  },
      500/sp,
      function() {
        ts
          .append(current_databox)
          .append('<a href="#index"><img id="toxic_close" class="toxic_hidden div_close" src="'+iu+'close.png" alt="" /></a>')
          .css({'min-height':ch+'px','height':'auto'});
        current_databox.fadeIn(200/sp);
        $('#toxic_close.div_close')
          .css('margin-left',''+cw-20+'px')
          .fadeIn(200/sp);
        $('#toxic_h2').fadeIn(200/sp);
        tl
          .fadeOut(100, function(){
	        $(this).remove();
          });
        if ((parseInt(ts.css('top')))+(parseInt(ts.css('margin-top'))-$(window).scrollTop())<0) {
          ts
            .css('margin-top','0')
            .css('top',$(window).scrollTop());
        }
      });
}

//Display of notifications

function standart_setting_after_click_alert () {
  current_databox = $(cd)
    .attr('data-toxic-alert');	
  $('body')
    .append('<div id="toxic_dark" class="images_close"></div><div id="toxic_showbox" class="alert" style="height:'+old_height+'px;width:'+old_width+'px;left:'+(width/2-ps-old_width/2+$(window).scrollLeft())+'px;top:'+((height)/2-ps-old_height/2+$(window).scrollTop())+'px;padding:'+ps+'px;"></div>');
  var ts=$("#toxic_showbox");
  ts
    .html('<p class="alert toxic_hidden" style="width:'+alert_width+'px;">'+current_databox+'</p>')
    .prepend('<a href="#index"><img id="toxic_close" class="toxic_hidden images_close" src="'+iu+'close.png" alt="" /></a>');
  image_start_load();
  var tl=$('#toxic_loading'),
    tsp=$("#toxic_showbox p");
  cw=tsp.width();
  ch=tsp.height()+20;
  if (cw>=width) {
    cw=width-ps*2;
    $("#toxic_showbox p.alert")
      .css('max-width',cw+'px');
    ch=tsp.height()+20;
  }
  ts
    .animate( {
      width:cw,
      height:ch,
      marginLeft:-(cw/2-old_width/2),
      marginTop:(-height/2+(height-ch)/2+old_height/2)
    },
    500/sp,
    function() {
      tsp.fadeIn(200/sp);
      $('#toxic_close.images_close')
        .css({'margin-left':''+cw-20+'px','margin-top':''+(ch-21)+'px'})
        .fadeIn(200/sp);
      tl
        .fadeOut(100, function(){
          $(this).remove();
        });
    });
}

//press the left - right

function get_new_img (correct, ct){
  cd = correct;
  ct=$(cd).attr('title');
  image_start_load_fix();
  $(new Image())
    .attr('src',$(cd).attr('href'))
    .load(function(){
      $('#toxic_showbox .toxic_current,#toxic_showbox #toxic_textarea, #toxic_showbox #toxic_close, #toxic_showbox #toxic_arrow_carrier').remove();
      check_images(ct);
    });
}

$( document )
  .on( "click", ".toxic_larrow a", function() {
    get_new_img(back_src);
    return false;
  })	
  .on( "click", ".toxic_rarrow a", function() {
    get_new_img(next_src);
    return false;
  })
  .on( "click", 'a[data-toxic="group"]', function() {
    is_single=2;
    cd=this;
    st_set_after_cl_img();
    return false;
  })
  .on( "click", 'a[data-toxic="single"]', function() {
    is_single=1;
    cd=this;
    st_set_after_cl_img();
    return false;
  })	
  .on( "click", '[data-toxic-databox]', function() {
    is_single=3;
    cd=this;
    standart_setting_after_click_databox();
    return false;
  })  
  .on( "click", '[data-toxic-alert]', function() {
    is_single=3;
    cd=this;
    standart_setting_after_click_alert();
    return false;
  })  
  .on( "click", "#toxic_dark, #toxic_close", function() {
    close_all();
    return false;
  })
  .keyup(function(e) {
    if (e.keyCode == 27) close_all();
  });
  
function close_all() {
  old_width=$('#toxic_showbox').width();
  old_height=$('#toxic_showbox').height();
  $('#toxic_dark, #toxic_showbox, #toxic_loading')
    .fadeOut(200/sp, function(){
      if($('#toxic_showbox').find('.div_close').length){
        $('body')
          .append(current_databox);
        current_databox
          .css('display','none');
      }
      if (is_single!=3){
        $('#toxic_loading')
          .remove();
      }
      $('#toxic_dark, #toxic_showbox')
        .remove();
    });
  return false;
}

})();});
