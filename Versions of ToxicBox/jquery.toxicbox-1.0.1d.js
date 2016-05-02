//////////////////////////////////////////////
//jquery.toxicbox ver.1.0.1d                //
//ToxicBox - © 2015-2016 Berestov Andrey    //
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

if (!isMobile.any()){
$( window ).resize(function() {
var ts=$("#toxic_showbox");
width = $(window).width();height = $(window).height();
if(ts){
ts.css('left',0+'px').css('top',0+'px').css('margin-left',0+'px').css('margin-top',0+'px').css('left',((width/2)-((cw)/2+ps))+'px').css('top',((height/2+$(window).scrollTop())-((ch)/2+ps))+'px');
if (parseInt(ts.css('top'))<0){ts.css('top','0');}
}
});
}



function image_start_load (){$('body').prepend('<img src="'+iu+'loader.gif" alt="" id="toxic_loading" style="margin-top:'+((height/2-20)+$(window).scrollTop())+'px;margin-left:'+(width/2 - 20)+'px;"  />');}
function chk_arrow(){if (!back_src ){$('#toxic_showbox .toxic_larrow a').remove();}	if (!next_src ){$('#toxic_showbox .toxic_rarrow a').remove();}	}
function check_images(ct,is_single){
	var ts=$("#toxic_showbox"); 
	var tl=$('#toxic_loading');
	var cin;
	function fix_img_height(correct){$(correct).css('max-height',''+(height-parseInt(ttx.css( 'height'))-ps*2-10)+'px').css('width','auto');cw=parseInt($(correct).css( 'width'));$(correct).css('width',cw);ch = $(correct).height();}
	ts.prepend('<img src="'+$(cd).attr('href')+'" alt="" class="toxic_current" style="max-width:'+(width-ps*2-10)+'px;max-height:'+height+'px;" hidden/><div id="toxic_textarea" hidden style="min-height:37px;"></div>');
	var ttx=$('#toxic_textarea');
	for(i=0;i<ci;i++){if(cd==ai[i]){cin=i+1;back_src=ai[i-1];next_src=ai[i+1];$(new Image()).attr('src', ''+$(back_src).attr('href')+'');$(new Image()).attr('src', ''+$(next_src).attr('href')+'');break;}}
	$(".toxic_current").load(function() {ch = $(this).height();cw = $(this).width();
    if(ct){	
	if (is_single!=1 ){ttx.css('width',(cw-ps*2-40)).html('<div id="toxic_arrow_carrier" style="width:'+(cw)+'px;margin-top:-5px;"><div class="toxic_left toxic_larrow" style="width:'+((cw+20)/2-10)+'px;margin-left:-20px;" ><a href="#back"><img src="'+iu+'left.png" alt="" /></a></div><div class="toxic_left toxic_rarrow" style="width:'+((cw+20)/2-10)+'px;"><a href="#next"><img src="'+iu+'right.png" alt="" /></a></div></div><p class="toxic_center countofimages">'+cl.im+' '+cin+' '+cl.o+' '+ci+'</p><p class="toxic_center toxic_title"><em>'+ct+'</em></p>');chk_arrow();}
	if (is_single==1 ){ttx.css('min-height',ps+13);ttx.html('<p class="toxic_center toxic_title" style="width:'+(cw-40)+'px;margin-top:'+(ps)+'px;"><em>'+ct+'</em></p>');}
    }else{
	if (is_single!=1 ){ttx.html('<p class="toxic_center countofimages" >'+cl.im+' '+cin+' '+cl.o+' '+ci+'</p>').prepend('<div id="toxic_arrow_carrier" style="width:'+(cw)+'px;margin-top:-5px;"><div class="toxic_left toxic_larrow" style="width:'+((cw+20)/2-10)+'px;margin-left:-20px;" ><a href="#back"><img src="'+iu+'left.png" alt="" /></a></div><div class="toxic_left toxic_rarrow" style="width:'+((cw+20)/2-10)+'px;"><a href="#next"><img src="'+iu+'right.png" alt="" /></a></div></div>');chk_arrow();}
	if (is_single==1 ){ttx.css('height',ps+13).css('min-height',0);}}
	fix_img_height(this);
	ttx.css('width',(cw-ps*2-40));
	fix_img_height(this);
	$('#toxic_showbox .toxic_rarrow, #toxic_showbox .toxic_larrow').css('width',''+((cw+20)/2-10)+'px');
    ch=parseInt(ttx.css( 'height'))+ch+10;
	ts.prepend('<a href="#index"><img id="toxic_close" class="toxic_hidden images_close" src="'+iu+'close.png" alt="" /></a>');$('#toxic_close').css('margin-left',''+cw-20+'px').css('margin-top',''+(ch-21)+'px');if(ct && is_single==1){	$('#toxic_close').css('margin-left',''+cw-20+'px').css('margin-top',''+(ch-24)+'px');$('.toxic_center.toxic_title').css('margin-top',(ps+6));}
    ts.animate({width:cw, height:ch, marginLeft:-(cw/2-10), marginTop:(-height/2+(height-ch)/2+10)}, 500/sp, function() {tl.fadeOut(100, function(){$(this).remove();});ttx.css('width',(cw-40));$('#toxic_showbox .toxic_current, #toxic_showbox #toxic_textarea, #toxic_showbox #toxic_close').fadeIn(200/sp);});
	
	});}
function st_set_after_cl_img(is_single){
    var ct=$(cd).attr('title');
    $('body').append('<div id="toxic_dark" class="images_close"></div><div id="toxic_showbox" style="left:'+(width/2-ps-10)+'px;top:'+(height/2-ps-10+$(window).scrollTop())+'px;padding:'+ps+'px;"></div>');
    image_start_load();
    $(new Image()).attr('src', ''+$(cd).attr('href')+'').load(check_images(ct,is_single));
    }
function standart_setting_after_click_databox () {
    current_databox = $('#'+$(cd).attr('data-toxic-databox'));	
    $('body').append('<div id="toxic_dark" class="div_close"></div><div id="toxic_showbox" style="left:'+(width/2-ps-10)+'px;top:'+(height/2-ps-10+$(window).scrollTop())+'px;padding:'+ps+'px;"></div>');
	var ts=$("#toxic_showbox");
    image_start_load();
	var tl=$('#toxic_loading');
	cw=current_databox.width();
    if (cw==width){ if (auto_width=='on') {cw=basic_width;$(current_databox).css('width',cw);}else{cw=width-ps*2-10;}}
    if ($(cd).attr('title')){ts.prepend('<h2 id="toxic_h2" style="width:'+cw+'px;margin-bottom:'+ps+'px;" class="toxic_hidden">'+$(cd).attr('title')+'</h2>');ch = parseInt($(current_databox).css( 'height'))+parseInt($('#toxic_h2').css( 'height'))+23+(ps*2);}else{ch = parseInt($(current_databox).css( 'height'))+(ps)+22;}	
	ts.prepend('<a href="#index"><img id="toxic_close" class="toxic_hidden div_close" src="'+iu+'close.png" alt="" /></a>');
    ts.animate({width:cw, height:ch, marginLeft:-(cw/2-10), marginTop:(-height/2+(height-ch)/2+10)}, 500/sp, function() {ts.append(current_databox);current_databox.fadeIn(200/sp);$('#toxic_close.div_close').css('margin-left',''+cw-20+'px').css('margin-top',''+(ch-21)+'px').fadeIn(200/sp);$('#toxic_h2').fadeIn(200/sp);tl.fadeOut(100, function(){$(this).remove();});if ((parseInt(ts.css('top')))+(parseInt(ts.css('margin-top'))-$(window).scrollTop())<0){ts.css('margin-top','0').css('top',$(window).scrollTop());}});
    }
function standart_setting_after_click_alert () {
    current_databox = $(cd).attr('data-toxic-alert');	
    $('body').append('<div id="toxic_dark" class="images_close"></div><div id="toxic_showbox" class="alert" style="left:'+(width/2-ps-10)+'px;top:'+(height/2-ps-10+$(window).scrollTop())+'px;padding:'+ps+'px;"></div>');
    var ts=$("#toxic_showbox");
    ts.html('<p class="alert toxic_hidden" style="width:'+alert_width+'px;">'+current_databox+'</p>');
	ts.prepend('<a href="#index"><img id="toxic_close" class="toxic_hidden images_close" src="'+iu+'close.png" alt="" /></a>');
	image_start_load();
	var tl=$('#toxic_loading');
	var tsp=$("#toxic_showbox p");
	cw=parseInt(tsp.css( 'width'));
    ch=parseInt(tsp.css( 'height'))+20;
	ts.animate({width:cw, height:ch, marginLeft:-(cw/2-10), marginTop:(-height/2+(height-ch)/2+10)}, 500/sp, function() {tsp.fadeIn(200/sp);$('#toxic_close.images_close').css('margin-left',''+cw-20+'px').css('margin-top',''+(ch-21)+'px').fadeIn(200/sp);tl.fadeOut(100, function(){$(this).remove();});});
    }
function get_new_img (correct, ct){cd = correct;ct=$(cd).attr('title');image_start_load();$(new Image()).attr('src',''+$(cd).attr('href')+'').load(function(){$('#toxic_showbox .toxic_current,#toxic_showbox #toxic_textarea, #toxic_showbox #toxic_close, #toxic_showbox #toxic_arrow_carrier').remove();check_images(ct);});}	
$( document ).on( "click", ".toxic_larrow a" ,    function() {get_new_img(back_src);return false;});	
$( document ).on( "click", ".toxic_rarrow a" ,    function() {get_new_img(next_src);return false;});
$( document ).on( "click", 'a[data-toxic="group"]', function() {var is_single=0; cd=this; st_set_after_cl_img(is_single);return false;});
$( document ).on( "click", 'a[data-toxic="single"]',function() {var is_single=1; cd=this; st_set_after_cl_img(is_single);return false;});	
$( document ).on( "click", '[data-toxic-databox]',function() {cd=this; standart_setting_after_click_databox(); return false;});  
$( document ).on( "click", '[data-toxic-alert]',function() {cd=this; standart_setting_after_click_alert(); return false;});  
$( document ).on( "click", "#toxic_dark.images_close, #toxic_close.images_close",function() {$('#toxic_dark, #toxic_showbox, #toxic_loading').fadeOut(200/sp, function(){$(this).remove();});return false;});
$( document ).on( "click", "#toxic_dark.div_close, #toxic_close.div_close",function() {$('#toxic_dark, #toxic_showbox').fadeOut(200/sp, function(){$('body').append(current_databox);$(current_databox).css('display','none');$('#toxic_dark, #toxic_showbox').remove();});return false;});
})();});