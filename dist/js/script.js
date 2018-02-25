(function($){
    $(window).load(function(){
        $("a[rel='m_PageScroll2id']").mPageScroll2id({
				    highlightClass:"left-nav-el-active",
				    onComplete:function(){
				    	$('.header-navs').hide();
				    }
				});
    });
 })(jQuery);

$(document).ready(function(){

	//toggle-menu
	$(".toggle-menu").click(function(event){
				event.stopPropagation();
				$(".header-menu").slideToggle("fast");
		});
		$(".header-menu").on("click", function (event) {
			event.stopPropagation();
		});
		$(document).on("click", function () {
				$(".header-menu").hide();
		});
	//toggle-menu===end

	//animate header
	var shrinkHeader = 250;
	var heightHeader=$('.header').height();
	$(window).scroll(function() {
		var scroll = $(this).scrollTop();
		if ( scroll >= shrinkHeader ) {
				$('body').css('paddingTop',heightHeader);
				$('.header').addClass('shrink');
			}
			else {
					$('body').css('paddingTop',0);
					$('.header').removeClass('shrink');
			}
	});

	$(window).resize(function(){
		heightHeader=$('.header').height();
	});
	//animate header===edn



	// template scrollbar
	$('.price__list').perfectScrollbar();
	// template scrollbar === end

	//modals
	$('.modal-content').click(function(event){
		event.stopPropagation();
	});
	var scrollPos = 0;

	var openModal = function () {
	if(!$('.modal-layer').hasClass('modal-layer-show')){
		$('.modal-layer').addClass('modal-layer-show');
	}
	 scrollPos = $(window).scrollTop();
		$('body').css({
			overflow: 'hidden',
			position: 'fixed',
			overflowY: 'scroll',
			top : -scrollPos,
			width:'100%'
		});
		return scrollPos;
	};

	var closeModal = function () {
		console.log("scrollPos",scrollPos);
  	$('.modal-layer').removeClass('modal-layer-show');
  	$("body").removeClass("modal-fix");
  	$('body').css({
			overflow: '',
			position: '',
			top: ''
		})
    $(window).scrollTop(scrollPos);
    $('.modal').removeClass('modal__show');
		$('.enter').removeClass('enter--open');
		$('.basket').removeClass('basket--open');
	};

	var initModal = function(el){
		openModal();
		$('.modal').each(function () {
			if ($(this).data('modal')===el){
				$(this).addClass('modal__show')
			} else {
				$(this).removeClass('modal__show')
			}
		});
		var modalHeightCont = $(window).height();
		$('.modal-filter').height(modalHeightCont);
		$('.modal-wrap').css('height',modalHeightCont );
		$('.modal-wrap').css('minHeight',modalHeightCont );
	}

	$('.modal-get').click(function (){
		var currentModal = $(this).data("modal");
		initModal(currentModal);
	});

	$('.modal-layer , .modal-close').click(function (){
		closeModal();
	});
	//modals ===end

	//validate
	$('.validate-form').each(function() {
		var curentForm = $(this);
    $(this).validate({
    			highlight: function(element) { //даем родителю класс если есть ошибка
							$(element).parent().addClass("field-error");
					},
					unhighlight: function(element) {
							$(element).parent().removeClass("field-error");
					},
		    	rules:{ //правила для полей
						name:{
							required:true,
						},
						phone:{
							required:true,
							minlength:5,
							number:true
						},
						comment:{
							required:true,
							minlength:5,
						},
						agree: {
							required: true
						}
					},
					messages:{
						name:{
							required: 'Обязательное поле',
						},
						phone:{
							required: 'Обязательное поле',
							number:'Введите правильный номер',
							minlength:'Номер должен быть длиннее',
						},
						comment:{
							required: 'Обязательное поле',
							minlength:'Сообщение должно быть длиннее',
						},
						agree:{
							required: false,
						}
					},
					submitHandler : function(form){
						$.ajax({ //отправка ajax
						            type: "POST",
						            url: "sender.php",
						            data: $(form).serialize(),
						            timeout: 3000,
						          });
							closeModal();
							initModal("truemessage");
							setTimeout(function(){
										closeModal();
										$(':input','.validate-form') //очитска формы от данных
										  .not(':button, :submit, :reset, :hidden')
										  .val('')
										  .removeAttr('checked')
										  .removeAttr('selected')
							},2500)

				}
		    });
		});

	//validate===end


	//fancy-box

	$('.fancybox').fancybox();
	$('.fancybox-gallary').fancybox({
		thumbs : {
			autoStart : true
		},
		buttons : [
			'zoom',
			'close'
		],
	});
	//fancy-box === end

	//scroll top
	var scrollTop = 750;
	$(window).scroll(function() {
		var scroll = $(this).scrollTop();
		if ( scroll >= scrollTop ) {
				//var heightHeader=$('.header-main-wrap').height();
				$('.scroll-up').addClass('scroll-up--show');
			}
			else {
					$('.scroll-up').removeClass('scroll-up--show');
			}
	});

	$('.scroll-up').click(function() {
    $('html, body').animate({scrollTop: 0},800);
    return false;
  });
	//scroll top ===end

	$('.scheme-slider').slick({
		slidesToShow: 4,
		autoplay: false,
		speed: 500,
		arrows: false,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					arrows: false,
					centerPadding: '20px',
					slidesToShow: 3
				}
			},
			{
				breakpoint: 640,
				settings: {
					arrows: false,
					centerPadding: '20px',
					slidesToShow: 2
				}
			},
			{
				breakpoint: 480,
				settings: {
					arrows: false,
					centerPadding: '10px',
					slidesToShow: 1
				}
			}
  ]
	});

	$('.scheme-slider-control--right').click(function(){
		$(this).closest(".project__el").find(".scheme-slider").slick('slickPrev');
	});

	$('.scheme-slider-control--left').click(function(){
		$(this).closest(".project__el").find(".scheme-slider").slick('slickNext');
	});

	$('.service-slider').slick({
		slidesToShow: 1,
		autoplay: false,
		speed: 500,
		arrows: false,
		lazyLoad: 'ondemand',
	});


	$('.project__el-slider').slick({
		slidesToShow: 1,
		autoplay: true,
		speed: 2500,
		arrows: false,
		fade:true,
	});

	$('.slider-control--right').click(function(){
		$(this).closest(".slider-wrap").find(".slider-item").slick('slickNext');
	});

	$('.slider-control--left').click(function(){
		$(this).closest(".slider-wrap").find(".slider-item").slick('slickPrev');
	});

	//slide toggle more text about
	$('.toggle-about').click(function(){
		$('.about-text__more').slideToggle(function(){
			if($('.toggle-about').text()== "Подробнее"){
				$('.toggle-about').text("Скрыть")
			} else {
				$('.toggle-about').text("Подробнее")
			}
		});
	});
	//slide toggle more text about===end


	/* ###### For only ies  ######*/
	//if(/MSIE \d|Trident.*rv:/.test(navigator.userAgent)){
	//	//code
	//}

	function detectIE() {
	var ua = window.navigator.userAgent;

	var msie = ua.indexOf('MSIE ');
	if (msie > 0) {
		// IE 10 or older => return version number
		return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
	}

	var trident = ua.indexOf('Trident/');
	if (trident > 0) {
		// IE 11 => return version number
		var rv = ua.indexOf('rv:');
		return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
	}

	var edge = ua.indexOf('Edge/');
	if (edge > 0) {
		// Edge (IE 12+) => return version number
		return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
	}

	// other browser
	return false;
}

	console.log(detectIE());
	if (detectIE() <= 14 && detectIE()) {
		$('body').empty();
		$('body').prepend('' +
		 '<div class="old-browser">' +
			'<div class="old-browser-text"> Сайт не поддерживае Браузер Internet Explorer</div><br>' +
			'<div class="old-browser-text"> Установите <br><br> Chrome Firefox Opera </div><br>' +
		'</div>');
	}

	//for init SVG 
	svg4everybody();
	// ==== clear storage =====
	 localStorage.clear();
	 sessionStorage.clear();
	 $(window).unload(function(){
		 localStorage.clear();
	 });
	// ==== clear storage end =====

	
	/* ###### For SlideToggle Elements  ######*/
	/*var hideToggle = function(targetClick,toggleEl) {
		$(targetClick).click(function(event){
				event.stopPropagation();
				$(toggleEl).slideToggle("fast");
		});
		$(toggleEl).on("click", function (event) {
			event.stopPropagation();
		});
		$(document).on("click", function () {
				$(toggleEl).hide();
		});
	}
	hideToggle('.icon-bars','.top-menu_link');*/

})

//cash SVG

;( function( window, document )
{
	'use strict';

	var file  = 'img/pack.html',
		revision = 1;

	if( !document.createElementNS || !document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' ).createSVGRect )
		return true;

	var isLocalStorage = 'localStorage' in window && window[ 'localStorage' ] !== null,
		request,
		data,
		insertIT = function()
		{
			document.body.insertAdjacentHTML( 'afterbegin', data );
		},
		insert = function()
		{
			if( document.body ) insertIT();
			else document.addEventListener( 'DOMContentLoaded', insertIT );
		};

	if( isLocalStorage && localStorage.getItem( 'inlineSVGrev' ) == revision )
	{
		data = localStorage.getItem( 'inlineSVGdata' );
		if( data )
		{
			insert();
			return true;
		}
	}

	try
	{
		request = new XMLHttpRequest();
		request.open( 'GET', file, true );
		request.onload = function()
		{
			if( request.status >= 200 && request.status < 400 )
			{
				data = request.responseText;
				insert();
				if( isLocalStorage )
				{
					localStorage.setItem( 'inlineSVGdata',  data );
					localStorage.setItem( 'inlineSVGrev',   revision );
				}
			}
		}
		request.send();
	}
	catch( e ){}

}( window, document ) );