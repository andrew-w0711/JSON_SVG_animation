function performAnimation(originID, destinationID,dataarray,dotclass) {
    var origin          = $('#country-' + originID),
        destination     = $('#country-' + destinationID),
	    originX         = origin.position().left,
	    originY         = origin.position().top,
	    destinationX    = destination.position().left,
	    destinationY    = destination.position().top;
	
	var differenceX = Math.abs(origin.position().left - destination.position().left);
	var curveX = (originX <= destinationX) ? originX + (differenceX / 2) : originX - (differenceX / 2);
	var dotSize = 10;
	var quantity = 50, //number of dots
	    duration = 2,  //duration (in seconds)
	    path = [{
            x:originX,
            y:originY
        }, {
            x:curveX,
            y:20
        }, {
            x:destinationX,
            y:destinationY
        }], //points on the path (BezierPlugin will plot a Bezier through these). Adjust however you please.
	    position = {
            x:path[0].x,
            y:[path[0].y]
        }, //tracks the current position, so we set it initially to the first node in the path. It's the target of the tween.
	    tween = TweenMax.to(position, quantity, {
            bezier:path,
            ease:Power1.easeIn
        }), //this does all the work of figuring out the positions over time.
	    tl = new TimelineMax({
            repeat:false,
            repeatDelay: 1,
            yoyo:false
        }), //we'll use a TimelineMax to schedule things. You can then have total control of playback. pause(), resume(), reverse(), whatever.
	    i, dot;	    
	//we can remove the first point on the path because the position is already there and we want to draw the Bezier from there through the other points
	path.shift();	
	for (i = 0; i < quantity; i++) {
        var cls = (i==quantity-1) ? 'lastclass' : '';
        var j=i-5;
           
	    tween.time(i); //jumps to the appropriate time in the tween, causing position.x and position.y to be updated accordingly.
	    dot = $("<div />", {class:"dot"+i}).addClass(dotclass+" dot "+cls).css({left:position.x+"px", top:position.y+"px"}).appendTo(".pointers"); //create a new dot, add the .dot class, set the position, and add it to the body.
	    tl.set(dot, {
            css:{
                className:"+=animate",
                width: dotSize + 'px',
                height: dotSize + 'px'
            }
        }, i * (duration / quantity)); //toggle the visibility on at the appropriate time.
	}
	
	amountPopup(destination,dataarray,dotclass);
}

      
function amountPopup(destination,dataarray,dotclass) {
	setTimeout(function() {
	    destination.append('<div class="transaction-wrapper">'+
                                '<div class="phone animated bounceIn"></div>'+
                                '<div class="amount animated bounceIn">'+
                                    '<span style="position:relative;top:16px;">'+dataarray.sendCurrencyISO+'<br/>'+dataarray.sendAmount+'</span>'+
                                '</div>'+
                            '</div>');
	
	    setTimeout(function() {
	        destination.find('.phone').removeClass('bounceIn').addClass('bounceOut');
	    
	        destination.find('.amount').removeClass('bounceIn').addClass('bounceOut');
	        destination.find('.amount');
                $("."+dotclass).remove();
	    }, 1000);
	  
    }, 2000);
}