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

		objectMap.container = container;
		objectMap.player = container.find('video');

		objectMap.player.on('loadeddata',function() {
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

$(document).ready(function() { videoPlayer.initPlayer($('#videoPlayer')); });

