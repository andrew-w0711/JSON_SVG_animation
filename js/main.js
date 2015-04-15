var transactionID = 0;
function performAnimation(origin,destination,transaction,dotclass) {


setTimeout(function(){
    

    transactionID++;
    

    $('.svgdatacontainer').append('<div id="animation-wrapper-' + transactionID + '" class="animation-wrapper ' + transaction.distributorType.toLowerCase() + '"></div>');
    var animationWrapper = $('#animation-wrapper-' + transactionID);
  
    var originX = origin.left;
    var originY = origin.top;
    var destinationX = destination.left;
    var destinationY = destination.top;
    
    var differenceX = Math.abs(originX - destinationX);
    
    if (originX <= destinationX) {
      // animating right
      curveX1 = originX + (differenceX / 3);
      curveX2 = curveX1 + (differenceX / 3);
    } else {
      // animating left
      curveX1 = originX - (differenceX / 3);
      curveX2 = curveX1 - (differenceX / 3);
    }
	    
    if (originY <= destinationY) {
      highestPoint = originY;
    } else {
      highestPoint = destinationY;
    }
    
    var curveY = highestPoint - 60;

    showCountryLabel(animationWrapper,origin);
    
    
//    console.log(curveX1);
//    console.log(curveX2);
    
    var curv=curveX1-curveX2;
      curv=Math.abs(curv);
    var  quantity = 60;
      if(curv>70)
    {
        quantity = 80;
    }
        if(curv>100)
    {
        quantity = 100;
    }
    
    var dotSize = 0.5;
    
    var  //number of dots
	duration = 2,  //duration (in seconds)
	path = [{x:originX, y:originY}, {x:curveX1, y:curveY}, {x:destinationX, y:destinationY}], //points on the path (BezierPlugin will plot a Bezier through these). Adjust however you please.
	position = {x:path[0].x, y:[path[0].y]}, //tracks the current position, so we set it initially to the first node in the path. It's the target of the tween.
	tween = TweenMax.to(position, quantity, {bezier:path, ease:Power2.easeIn}), //this does all the work of figuring out the positions over time.
	tl = new TimelineMax({repeat:false, repeatDelay: 5, yoyo:false,onComplete:timelineDone}), //we'll use a TimelineMax to schedule things. You can then have total control of playback. pause(), resume(), reverse(), whatever.
	i, dot;
	
        
    //we can remove the first point on the path because the position is already there and we want to draw the Bezier from there through the other points
    path.shift();
    
    function timelineDone() {
  // console.log(dotclass);
   $('body').attr('data-length',dotclass);
  // return  dotclass;
}
    
    
    for (i = 0; i < quantity; i++) {
        
             animationWrapper.find('.dot').removeClass('border-class');
    //animationWrapper.find('.dot:last-child').addClass('border-class');
      //$('.dot').eq(i).addClass('border-class');
      if (i % 2 == 0) {
        dotSize=dotSize+0.20;
      }
      
      tween.time(i); //jumps to the appropriate time in the tween, causing position.x and position.y to be updated accordingly.
      dot = $("<div />", {class:"dot"+i}).addClass("dot").css({left:position.x+"px", top:position.y+"px"}).appendTo('#animation-wrapper-'+ transactionID); //create a new dot, add the .dot class, set the position, and add it to the body.
      tl.set(dot, {css:{className:"+=animate", width: dotSize + 'px', height: dotSize + 'px'}}, i * (duration / quantity)); //toggle the visibility on at the appropriate time.
     //  tl.to(dot, 1, {backgroundColor:"yellow"}, "-=0.5");
 }
 
    finishPopup(animationWrapper,destination,transaction);
    
    setTimeout(function() {
      //animationWrapper.destroyTransaction();
      
     // console.log('111')
      
    }, 1000);
    },100);
  }
  
  jQuery.fn.extend({
    destroyTransaction: function() {
      return this.remove();
    }
  });
  
  function showCountryLabel(animationWrapper,country) {
    animationWrapper.append('<div class="country-name animated bounceIn" style="left: ' + country.left + 'px; top: ' + country.top + 'px;">' + country.name + '</div>');
    
    setTimeout(function() {
      animationWrapper.find('.country-name').removeClass('bounceIn');
      animationWrapper.find('.country-name').addClass('bounceOut');
    }, 1000);
  }
  
  function finishPopup(animationWrapper,destination,transaction) {
	    
    setTimeout(function() {
    
      animationWrapper.append('<div class="finish-wrapper" style="left: ' + destination.left + 'px; top: ' + destination.top + 'px;"><div class="country-name animated bounceIn">' + destination.name + '</div><div class="phone animated bounceIn"></div><div class="amount animated bounceIn">' + parseCurrency(transaction) + '</div></div>');
    
      setTimeout(function() {
	
	animationWrapper.find('.country-name').removeClass('bounceIn');
	animationWrapper.find('.country-name').addClass('bounceOut');
	
	animationWrapper.find('.phone').removeClass('bounceIn');
	animationWrapper.find('.phone').addClass('bounceOut');
	
	animationWrapper.find('.amount').removeClass('bounceIn');
	animationWrapper.find('.amount').addClass('bounceOut');
           animationWrapper.remove();
      }, 1000);
   
    }, 2000);
    
  }
  
  function parseCurrency(transaction) {
    //code
    //console.log(transaction.sendCurrencyISO);
    var html;
    
    switch (transaction.sendCurrencyISO) {
      case "USD":
	html = '$' + transaction.sendAmount;
	break;
      case "EUR":
	html = '�' + transaction.sendAmount;
	break;
      default:
	html = '<span>' + transaction.sendCurrencyISO + '</span>' + transaction.sendAmount;
	break;
    }
    
    return html;
  }
//});
