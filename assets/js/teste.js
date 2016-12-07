jQuery(document).ready(function(e){
	function o(o){
		e(document).off("keyup",t),
		o.api("pause"),
		s.fadeOut(),
		e("body").removeClass("full-video")
	}

	function t(e){
		40!==e.keyCode&&27!==e.keyCode||o(c)
	}e(document).foundation(),e(".js-waypoint").css("opacity",0),
	e(".js-waypoint-fadeIn").waypoint(function(o){
		e(this.element).toggleClass("fadeIn")},{offset:"90%"}),
	e(".js-fade-bg.js-fade-start-black").css("background-color","#010101"),e(".js-fade-bg.js-fade-start-white").css("background-color","#fff"),
	e(".js-fade-bg-white").waypoint(function(o){"down"==o?e(".js-fade-bg").stop().animate({backgroundColor:"#fff"},1e3):
		e(".js-fade-bg").stop().animate({backgroundColor:"#010101"},1e3)},{offset:"50%"}),
	e(".js-fade-bg-black").waypoint(function(o){"up"==o?e(".js-fade-bg").stop().animate({backgroundColor:"#fff"},1e3):
		e(".js-fade-bg").stop().animate({backgroundColor:"#010101"},1e3)},{offset:"50%"}),
	e(".menu-icon").on("click",function(o){o.preventDefault(),
		e("body").css("overflow","hidden")}),e(".menu-icon-close").on("click",function(o){
			o.preventDefault(),e(".top-bar-right").fadeOut(500),e("body").css("overflow","auto")}),e(".js-scroll-down a").on("click",function(o){o.preventDefault();var t=e(this).attr("href"),a=e(t).offset().top-55;e("html, body").animate({scrollTop:a},500)}),e(".js-como-fazemos-isso a").on("click",function(o){o.preventDefault(),e(".js-como-fazemos-isso a").removeClass("active"),e(this).addClass("active"),e(".js-como-fazemos-isso").css("background-image","url("+e(this).data("bg")+")")}),e(".js-logica-trigger").on("click",function(o){o.preventDefault(),e(".logica-tooltip").hide(),e(e(this).attr("href")).fadeIn()}),e(".js-logica-trigger").length>0&&e(document).click(function(o){e(o.target).closest(".js-logica-trigger, .logica-tooltip").length||e(".logica-tooltip").is(":visible")&&e(".logica-tooltip").fadeOut()});var a=e(".testimonial").length,i=1;e(".js-reload a").on("click",function(o){o.preventDefault(),i==a?i=1:++i,e(".testimonial").removeClass("active").hide(),e(".testimonial:nth-child("+i+")").addClass("active").fadeIn(1e3);var t=e(this).find("img");t.addClass("rotate"),t.addClass("rotated"),setTimeout(function(){t.removeClass("rotate")},1e3)}),e(".js-reload a").on("mouseleave",function(o){var t=e(this).find("img");t.removeClass("rotated")}),e(".slick-slider").slick({centerMode:!1,slidesToShow:2,variableWidth:!0,infinite:!0,prevArrow:"#slider-prev",nextArrow:"#slider-next",responsive:[{breakpoint:640,settings:{slidesToShow:1,variableWidth:!1}}]});var s,n,l,c;e(".assista-agora").on("click",function(a){a.preventDefault(),e("body").addClass("full-video"),s=e(e(this).attr("href")),s.height(e(window).height()),n=s.find("iframe"),l=n.attr("src"),c=Froogaloop(n[0]),l||n.attr("src",e(this).data("video")+"?api=1&autoplay=0&badge=0&byline=0&title=0"),c.addEvent("ready",function(){c.addEvent("finish",function(){o(c)}),c.api("play")}),s.on("DOMMouseScroll mousewheel",function(){o(c)}),e(".close").on("click",function(e){e.preventDefault(),o(c)}),e(document).on("keyup",t),s.fadeIn(),c.api("play")}),jQuery("body").addClass("load")});