//////////////////////////////////////////////
//jquery.toxicbox ver.1.0.0                 //
//ToxicBox - © 2015 Berestov Andrey         //
//http://my-gallery.name                    //
//////////////////////////////////////////////

var toxicbox_options = {};
$( document ).ready(function() {(function (){
var l='en';
var rl={im : 'Фото', o : 'из'};
var el={im : 'Image', o : 'of'};
var basic_width = 960; 
var auto_width = 'on';
var iu="images/toxic/"; 
var ps = 5; 
var sp =1;
var alert_width = 300; 
var isMobile = { Android: function() { return navigator.userAgent.match(/Android/i); }, BlackBerry: function() { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function() { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function() { return navigator.userAgent.match(/IEMobile/i); }, any: function() { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };

if (Object.keys(toxicbox_options).length>0) {
if(toxicbox_options.language){l=toxicbox_options.language;}	
if(toxicbox_options.padding){ps=toxicbox_options.padding;}	
if(toxicbox_options.images_url){iu=toxicbox_options.images_url;}	
if(toxicbox_options.alert_width){alert_width=toxicbox_options.alert_width;}	
if(toxicbox_options.basic_width){basic_width=toxicbox_options.basic_width;}	
if(toxicbox_options.auto_width){auto_width=toxicbox_options.auto_width;}	
if(toxicbox_options.speed){sp=toxicbox_options.speed;}
}

if (l=='ru') {var cl=rl;} else {var cl=el;}	
if($('a[data-toxic="group"]')){
var ci=$('a[data-toxic="group"]').length;
var ai = $('a[data-toxic="group"]');
}
var width = $(window).width();var height = $(window).height();
var back_src;var next_src;var ch=0;var cw=0;var cd;var current_databox;

$( window ).resize(function() {
width = $(window).width();height = $(window).height();
if($('#toxic_showbox')){
$('#toxic_showbox').css('left',0+'px').css('top',0+'px').css('margin-left',0+'px').css('margin-top',0+'px');
$('#toxic_showbox').css('left',((width/2)-((cw)/2+ps))+'px').css('top',((height/2+$(window).scrollTop())-((ch)/2+ps))+'px');
if (parseInt($('#toxic_showbox').css('top'))<0){$('#toxic_showbox').css('top','0');}
}
});

function image_start_load (){$('body').prepend('<img src="'+iu+'loader.gif" alt="" id="toxic_loading" style="margin-top:'+((height/2-20)+$(window).scrollTop())+'px;margin-left:'+(width/2 - 20)+'px;"  />');}
function chk_arrow(){if (!back_src ){$('.toxic_larrow a').remove();}	if (!next_src ){$('.toxic_rarrow a').remove();}	}
function check_images(ct,is_single){
	var cin;
	function fix_img_height(correct){$(correct).css('max-height',''+(height-$( '#toxic_textarea' ).actual( 'height')-ps*2-10)+'px').css('width','auto');cw=$(correct).actual( 'width');$(correct).css('width',cw);ch = $(correct).height();}
	$('#toxic_showbox').prepend('<img src="'+$(cd).attr('href')+'" alt="" class="toxic_current" style="max-width:'+(width-ps*2-10)+'px;max-height:'+height+'px;" hidden/><div id="toxic_textarea" hidden style="min-height:37px;"></div>');
	for(i=0;i<ci;i++){if(cd==ai[i]){cin=i+1;back_src=ai[i-1];next_src=ai[i+1];}}
	$(".toxic_current").load(function() {ch = $(this).height();cw = $(this).width();
    if(ct){	
	if (is_single!=1 ){$('#toxic_textarea').css('width',(cw-ps*2-40)).html('<div id="toxic_arrow_carrier" style="width:'+(cw)+'px;margin-top:-5px;"><div class="toxic_left toxic_larrow" style="width:'+((cw+20)/2-10)+'px;margin-left:-20px;" ><a href="#back"><img src="'+iu+'left.png" alt="" /></a></div><div class="toxic_left toxic_rarrow" style="width:'+((cw+20)/2-10)+'px;"><a href="#next"><img src="'+iu+'right.png" alt="" /></a></div></div><p class="toxic_center countofimages">'+cl.im+' '+cin+' '+cl.o+' '+ci+'</p><p class="toxic_center toxic_title"><em>'+ct+'</em></p>');chk_arrow();}
	if (is_single==1 ){$('#toxic_textarea').css('min-height',ps+13);$('#toxic_textarea').html('<p class="toxic_center toxic_title" style="width:'+(cw-40)+'px;margin-top:'+(ps)+'px;"><em>'+ct+'</em></p>');}
    }else{
	if (is_single!=1 ){$('#toxic_textarea').html('<p class="toxic_center countofimages" >'+cl.im+' '+cin+' '+cl.o+' '+ci+'</p>').prepend('<div id="toxic_arrow_carrier" style="width:'+(cw)+'px;margin-top:-5px;"><div class="toxic_left toxic_larrow" style="width:'+((cw+20)/2-10)+'px;margin-left:-20px;" ><a href="#back"><img src="'+iu+'left.png" alt="" /></a></div><div class="toxic_left toxic_rarrow" style="width:'+((cw+20)/2-10)+'px;"><a href="#next"><img src="'+iu+'right.png" alt="" /></a></div></div>');chk_arrow();}
	if (is_single==1 ){$('#toxic_textarea').css('height',ps+13).css('min-height',0);}}
	fix_img_height(this);
	$('#toxic_textarea').css('width',(cw-ps*2-40));
	fix_img_height(this);
	$('.toxic_rarrow, .toxic_larrow').css('width',''+((cw+20)/2-10)+'px');
    ch=$( '#toxic_textarea' ).actual( 'height')+ch+10;
	$('#toxic_showbox').prepend('<a href="#index"><img id="toxic_close" class="toxic_hidden images_close" src="'+iu+'close.png" alt="" /></a>');$('#toxic_close').css('margin-left',''+cw-20+'px').css('margin-top',''+(ch-21)+'px');
    $('#toxic_showbox').animate({width:cw, height:ch, marginLeft:-(cw/2-10), marginTop:(-height/2+(height-ch)/2+10)}, 500/sp, function() {$('#toxic_loading').fadeOut(100, function(){$(this).remove();});$('#toxic_textarea').css('width',(cw-40));$('.toxic_current, #toxic_textarea, #toxic_close').fadeIn(200/sp);});
	});}
function st_set_after_cl_img(is_single){
    var ct=$(cd).attr('title');
    $('body').append('<div class="toxic_dark images_close"></div><div id="toxic_showbox" style="left:'+(width/2-ps-10)+'px;top:'+(height/2-ps-10+$(window).scrollTop())+'px;padding:'+ps+'px;"></div>');
    image_start_load();
    $(new Image()).attr('src', ''+$(cd).attr('href')+'').load(check_images(ct,is_single));
    }
function standart_setting_after_click_databox () {
    current_databox = $('#'+$(cd).attr('data-toxic-databox'));	
    $('body').append('<div class="toxic_dark div_close"></div><div id="toxic_showbox" style="left:'+(width/2-ps-10)+'px;top:'+(height/2-ps-10+$(window).scrollTop())+'px;padding:'+ps+'px;"></div>');
    image_start_load();
	cw=$(current_databox).width();
    if (cw==width){ if (auto_width=='on' && !isMobile.any()) {cw=basic_width;$(current_databox).css('width',cw);}else{cw=width-ps*2-10;}}
	$('#toxic_showbox').html(current_databox);
    if ($(cd).attr('title')){$('#toxic_showbox').prepend('<h2 id="toxic_h2" style="width:'+cw+'px;margin-bottom:'+ps+'px;" class="toxic_hidden">'+$(cd).attr('title')+'</h2>');ch = $(current_databox).actual( 'height')+$('#toxic_h2').actual( 'height')+20+(ps*2);}else{ch = $(current_databox).actual( 'height')+20+(ps*2);}	
	$('#toxic_showbox').prepend('<a href="#index"><img id="toxic_close" class="toxic_hidden div_close" src="'+iu+'close.png" alt="" /></a>');
    $('#toxic_showbox').animate({width:cw, height:ch, marginLeft:-(cw/2-10), marginTop:(-height/2+(height-ch)/2+10)}, 500/sp, function() {$(current_databox).fadeIn(200/sp);$('#toxic_close.div_close').css('margin-left',''+cw-20+'px').css('margin-top',''+(ch-21)+'px').fadeIn(200/sp);$('#toxic_h2').fadeIn(200/sp);$('#toxic_loading').fadeOut(100, function(){$(this).remove();});if ((parseInt($('#toxic_showbox').css('top')))+(parseInt($('#toxic_showbox').css('margin-top'))-$(window).scrollTop())<0){$('#toxic_showbox').css('margin-top','0').css('top',$(window).scrollTop());}});
    }
function standart_setting_after_click_alert () {
    current_databox = $(cd).attr('data-toxic-alert');	
    $('body').append('<div class="toxic_dark images_close"></div><div id="toxic_showbox" class="alert" style="left:'+(width/2-ps-10)+'px;top:'+(height/2-ps-10+$(window).scrollTop())+'px;padding:'+ps+'px;"></div>');
    $('#toxic_showbox').html('<p class="alert toxic_hidden" style="width:'+alert_width+'px;">'+current_databox+'</p>');
	$('#toxic_showbox').prepend('<a href="#index"><img id="toxic_close" class="toxic_hidden images_close" src="'+iu+'close.png" alt="" /></a>');
	image_start_load();
	cw=$('#toxic_showbox p').actual( 'width');
    ch=$('#toxic_showbox p').actual( 'height')+20;
	$('#toxic_showbox').animate({width:cw, height:ch, marginLeft:-(cw/2-10), marginTop:(-height/2+(height-ch)/2+10)}, 500/sp, function() {$('#toxic_showbox p').fadeIn(200/sp);$('#toxic_close.images_close').css('margin-left',''+cw-20+'px').css('margin-top',''+(ch-21)+'px').fadeIn(200/sp);$('#toxic_loading').fadeOut(100, function(){$(this).remove();});});
    }
function get_new_img (correct, ct){cd = correct;ct=$(cd).attr('title');image_start_load();$(new Image()).attr('src',''+$(cd).attr('href')+'').load(function(){$('.toxic_current,#toxic_textarea, #toxic_close, #toxic_arrow_carrier').remove();check_images(ct);});}	
$( document ).on( "click", ".toxic_larrow a" ,    function() {get_new_img(back_src);});	
$( document ).on( "click", ".toxic_rarrow a" ,    function() {get_new_img(next_src);});
$( document ).on( "click", 'a[data-toxic="group"]', function() {var is_single=0; cd=this; st_set_after_cl_img(is_single);return false;});
$( document ).on( "click", 'a[data-toxic="single"]',function() {var is_single=1; cd=this; st_set_after_cl_img(is_single);return false;});	
$( document ).on( "click", '[data-toxic-databox]',function() { cd=this; standart_setting_after_click_databox(); return false;});  
$( document ).on( "click", '[data-toxic-alert]',function() { cd=this; standart_setting_after_click_alert(); return false;});  
$( document ).on( "click", ".toxic_dark.images_close, #toxic_close.images_close",function() {$('.toxic_dark, #toxic_showbox, #toxic_loading').fadeOut(200/sp, function(){$(this).remove();});});
$( document ).on( "click", ".toxic_dark.div_close, #toxic_close.div_close",function() {$('.toxic_dark, #toxic_showbox').fadeOut(200/sp, function(){$('body').append(current_databox);$(current_databox).css('display','none');$('.toxic_dark, #toxic_showbox').remove();});});
})();});