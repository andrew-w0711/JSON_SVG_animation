//$(window).ready(function() {

function performAnimation(origin, destination, transaction, dotclass) {

	setTimeout(function() {
		transactionID++;
		var maincls = '';
		var media = '';
		if (transaction.distributorName == 'ezetop.com' || transaction.distributorName == 'ding.com') {
//			media = soundmixdownDouble;
			media = newAudio2;
			maincls = 'pink-class';
		}
		if (transaction.fromLatitude != null || transaction.fromLongitude != null) {
			maincls = 'pink-class red-text';
		}
		if (transaction.productType == 'ILDTopup') {
			maincls = 'light-blue-class';
//			media = soundmixdown;
			media = newAudio1;
		}

		if (transaction.distributorType == 'P2P') {
			maincls = 'green-class';
		}
		if (transaction.distributorType == 'Retail') {
			var rnd = parseInt(Math.random() * 10);
//            media = (rnd > 5) ? soundradom1 : soundradom2;
            media = (rnd > 5) ? newAudio3 : newAudio4;
			maincls = 'yellow-class';
		}
		var appMedia;
        if (sound && media) {
            appMedia = media;
        }

		if (!dotcom) {
			$('.svgdatacontainer').append('<div id="animation-wrapper-' + transactionID + '" class="animation-wrapper ' + maincls + ' ' + transaction.distributorType.toLowerCase() + '"></div>');
			if (appMedia) {
			    playSound(appMedia);
			}
		} else {
			if (transaction.distributorName == 'ezetop.com' || transaction.distributorName == 'ding.com') {
				$('.svgdatacontainer').append('<div id="animation-wrapper-' + transactionID + '" class="animation-wrapper ' + maincls + ' ' + transaction.distributorType.toLowerCase() + '"></div>');
				if (appMedia) {
				    playSound(appMedia);
				} 
			}
		}

		var animationWrapper = $('#animation-wrapper-' + transactionID),
		    originX = origin.left,
		    originY = origin.top,
		    destinationX = destination.left,
		    destinationY = destination.top;

		var differenceX = Math.abs(originX - destinationX);

        var curveX1,
            curveX2;
		if (originX <= destinationX) {
			curveX1 = originX + (differenceX / 3);
			curveX2 = curveX1 + (differenceX / 3);
		} else {
			curveX1 = originX - (differenceX / 3);
			curveX2 = curveX1 - (differenceX / 3);
		}

        var highestPoint = (originY <= destinationY) ? originY : destinationY;
		var curveY = highestPoint - 30;

		showCountryLabel(animationWrapper, origin);

		var curv = Math.abs(curveX1 - curveX2);
		var quantity = 60;

		if (isDesk2) {
			if (curveY > 300) {
				quantity = 70;
			}
			if (curv > 70 && curv < 100) {
				quantity = 80;
			}
			if (curv > 100) {
				quantity = 100;
			}
		} else {
			quantity = 40;
		}

		var dotSize = 0.5;
		if (winW < 768) {
			dotSize = 2;
		}
		var cal = 80 / scrolltime;
		var duration = cal, //duration (in seconds)
		path = [{
			x : originX,
			y : originY
		}, {
			x : curveX1,
			y : curveY
		}, {
			x : destinationX,
			y : destinationY
		}],
		//points on the path (BezierPlugin will plot a Bezier through these). Adjust however you please.
		position = {
			x: path[0].x,
			y: [path[0].y]
		}, //tracks the current position, so we set it initially to the first node in the path. It's the target of the tween.
		tween = TweenMax.to(position, quantity, {
			bezier : path,
			ease : Power2.easeIn
		}), //this does all the work of figuring out the positions over time.
		tl = new TimelineMax({
			repeat : false,
			repeatDelay : 5,
			yoyo : false
		}), //we'll use a TimelineMax to schedule things. You can then have total control of playback. pause(), resume(), reverse(), whatever.
		i, dot;
		var asterisk = $("<div />", {
			class : "asterisk"
		}).addClass('bounceIn animated').css({
			left : position.x + 16 + "px",
			top : position.y + 16 + "px"
		}).appendTo('#animation-wrapper-' + transactionID);

		//we can remove the first point on the path because the position is already there and we want to draw the Bezier from there through the other points
		path.shift();

		for ( i = 0; i < quantity + 1; i++) {

			animationWrapper.find('.dot').removeClass('border-class');
			//animationWrapper.find('.dot:last-child').addClass('border-class');
			//$('.dot').eq(i).addClass('border-class');
			if (i%2 == 0) {
                dotSize += (winW < 768) ? 0.10 : 0.20;
			}

			tween.time(i);
			//jumps to the appropriate time in the tween, causing position.x and position.y to be updated accordingly.
			//   asterisk='<div class="asterisk" style="color:pink">*</div>';

			dot = $("<div />", {
				class : "dot" + i
			}).addClass("dot").css({
				left : position.x + "px",
				top : position.y + "px"
			}).appendTo('#animation-wrapper-' + transactionID);
			//create a new dot, add the .dot class, set the position, and add it to the body.
			tl.set(dot, {
				css : {
					className : "+=animate",
					width : dotSize + 'px',
					height : dotSize + 'px'
				}
			}, i * (duration / quantity));
			//toggle the visibility on at the appropriate time.
			tl.to(asterisk, duration / quantity, {
				left : position.x + 'px',
				top : position.y + 'px'
			});
			//  tl.to(dot, 1, {backgroundColor:"yellow"}, "-=0.5");
		}

		finishPopup(animationWrapper, destination, transaction);
	}, 100);
	//memory mgt
	curv = null;
	curveY = null;
	originX = null;
	originY = null;
	destinationX = null;
	destinationY = null;
	duration = null;
	path = null;
	tween = null;
	asterisk = null;
	media = null;

}

jQuery.fn.extend({
	destroyTransaction : function() {
		return this.remove();
	}
});

function showCountryLabel(animationWrapper, country) {
	animationWrapper.append('<div class="country-name animated bounceIn" style="left: ' + country.left + 'px; top: ' + country.top + 'px;">' + country.name + '</div>');
	setTimeout(function() {
		animationWrapper
            .find('.country-name')
            .removeClass('bounceIn')
            .addClass('bounceOut');
	}, 1000);
}

function finishPopup(animationWrapper, destination, transaction) {
	setTimeout(function() {
		animationWrapper.append('<div class="finish-wrapper" style="left: ' + destination.left + 'px; top: ' + destination.top + 'px;"><div class="country-name animated bounceIn">' + destination.name + '</div><div class="'+phoneIcon+' animated bounceIn"></div><div class="amount animated bounceIn">' + parseCurrency(transaction) + '</div></div>');

		setTimeout(function() {
			animationWrapper.find('.country-name').removeClass('bounceIn').addClass('bounceOut');
			animationWrapper.find('.asterisk').removeClass('bounceIn').addClass('bounceOut');

			animationWrapper.find('.cootu - digiceluntry-name').addClass('bounceOut');

			animationWrapper.find('.phone').removeClass('bounceIn').addClass('fadeOut');
			animationWrapper.find('.amount').removeClass('bounceIn').addClass('bounceOut');

            var refreshTime = (isDesk2) ? 1000 : 100;
            setTimeout(function() {
                animationWrapper.remove();
            }, refreshTime);
		}, 1000);
	}, 2000);
}

function parseCurrency(transaction) {
	var html;
	switch (transaction.sendCurrencyISO) {
		case "USD":
			html = '<span class="currency-symbol">$' + transaction.sendAmount + '</span>';
			break;
		case "EUR":
			html = '<span class="currency-symbol">\u20AC' + transaction.sendAmount + '</span>';
			break;
		default:
			html = '<span>' + transaction.sendCurrencyISO + '</span>' + transaction.sendAmount + '';
			break;
	}
	return html;
}
