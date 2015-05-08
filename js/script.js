var videoPlayer = (function(){

	var objectMap = {
			container: null,
			player: null
		},
		methodMap = {
			initPlayer: null,
			updateSize: null,
			checkSquare: null
		};

	methodMap.checkSquare = function() {

		var playerHeight = objectMap.player.height(),
			playerWidth = objectMap.player.width(),
			containerWidth = objectMap.container.width(),
			containerHeight = objectMap.container.height();

		if(playerWidth*playerHeight >= containerWidth*containerHeight)
			return true
		else
			return false
	}

	methodMap.updateSize = function(sizeWay) {

		var windowHeight = $(window).height(),
			windowWidth = $(window).width();

		objectMap.container.css('height', (windowHeight > windowWidth) ? windowHeight/3 : windowHeight/2);

		var containerWidth = objectMap.container.width(),
			containerHeight = objectMap.container.height();

		sizeWay == 'width' ? objectMap.player.css({width: '100%'}) : objectMap.player.css({height: '100%'});

		if(methodMap.checkSquare()) {
			if((objectMap.player.height() < objectMap.player.width())) {
				var shift = -((objectMap.player.height()-containerHeight)/2);
				objectMap.player.css({top: shift});
			}else{
				var shift = -((objectMap.player.width()-containerWidth)/2);
				objectMap.player.css({left: shift});
			}
		}else{
			methodMap.updateSize('height');
		}
	}

	methodMap.initPlayer = function(container) {

		var windowHeight = $(window).height(),
			windowWidth = $(window).width();

		objectMap.container = container;
		objectMap.container.css('height', (windowHeight > windowWidth) ? windowHeight/3 : windowHeight/2);
		objectMap.player = container.find('video');

		objectMap.player.on('canplay',function() {
			methodMap.updateSize('width');
			this.play();
			this.loop = 'loop';
			this.muted = 'muted';
			this.preload = 'metadata';
		});

		$(window).on('resize',function() {
			methodMap.updateSize('width');
		});
	}

	return {initPlayer: methodMap.initPlayer};

}());

$(document).ready(function() { 

	videoPlayer.initPlayer($('#videoPlayer'));

	var hexArr = $('.hex_img');
	
	for(var i=0; i<hexArr.length; i++) {

		var h = new Snap('#hex_'+i).attr({
				width: '165px',
				height: '180px'
			}),
			hex = h.polygon([80, 5, 5, 50, 5, 125, 80, 170, 155, 125, 155, 50, 80, 5]),
			filter = h.filter(Snap.filter.shadow(2, 2, 2, '#000', .5)),
			circleBorder = h.circle((165/2-2),(180/2-2),40).attr({
				stroke: '#fff',
				strokeWidth: '5px',
				fill: 'none'
			}),
			circle = h.circle((165/2-2),(180/2-2),38).attr({
				fill: '#fff'
			}),
			c = h.image('img/user_image.png',43,50,77,77).attr({
				mask: circle
			});

			hex.attr({
				stroke: '#fff',
				strokeWidth: '10px',
				fill: '#4bcaff',
				'stroke-linejoin': 'round',
				filter: filter
			});
	}

	console.log($.browser);

	if($.browser.safari || $.browser.chrome || $.browser.opera) {
		$('.logo span').addClass('webkit');
	}

});

