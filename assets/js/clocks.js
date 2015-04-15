var count= 0;
var count1= 0;
var count2= 0;
var angle = 360/60;

var props = 'transform WebkitTransform MozTransform OTransform msTransform'.split(' '),
        prop,abc
        el = document.createElement('div');
        
function Clock_pink(prop,count) {
    var angle = 360/60;
    $('#pink')[0].style[prop] = 'rotate('+angle * count+'deg)';
}
function Clock_blue(prop,count1) {
    var angle = 360/60;
    $('#blue')[0].style[prop] = 'rotate('+angle * count1+'deg)';
}
function Clock_grey(prop,count2) {
    var angle = 360/60;
    $('#grey')[0].style[prop] = 'rotate('+angle * count2+'deg)';
    
    //

}
$(function(){
    for(var i = 0, l = props.length; i < l; i++) {
//        setInterval(function() {
            if(typeof el.style[props[i]] !== "undefined") {
                prop = props[i];
                break;
            }
//        }, 1000);
    }
});



//pink clock
var	clsStopwatch = function() {
		// Private vars
		var	startAt	= 0;	// Time of last start / resume. (0 if not running)
		var	lapTime	= 0;	// Time on the clock when last stopped in milliseconds

		var	now	= function() {
            return (new Date()).getTime();
        };
 
		// Public methods
		// Start or resume
		this.start1 = function() {
            startAt	= startAt ? startAt : now();
        };

		// Stop or pause
		this.stop1 = function() {
            // If running, update elapsed time otherwise keep it
            lapTime	= startAt ? lapTime + now() - startAt : lapTime;
            startAt	= 0; // Paused
        };

		// Reset
		this.reset1 = function() {
            lapTime = startAt = 0;
        };

		// Duration
		this.time = function() {
            return lapTime + (startAt ? now() - startAt : 0);
        };
	};

var x = new clsStopwatch();
var $time;
var clocktimer;

function pad(num, size) {
	var s = "0000" + num;
	return s.substr(s.length - size);
}

function formatTime(time) {
	var h = m = s = ms = ms2 = 0;
	var newTime = '';

	h = Math.floor( time / (60 * 60 * 1000) );
	time = time % (60 * 60 * 1000);
	m = Math.floor( time / (60 * 1000) );
	time = time % (60 * 1000);
	s = Math.floor( time / 1000 );
	//ms = time % 1000;
	ms = pad(time % 1000,3);
	ms2 = ms.charAt(0);
	Clock_pink(prop,pad(s, 2))
	newTime = '<span class="changable">'+pad2(m, 2) + '</span>:<span class="changable">' + pad2(s, 2) + '</span>:<span class="changable">' + addZeroBack(ms2)+'</span>';
	//newTime = '<span class="changable">'+pad(m, 2) + '</span>:<span class="changable">' + pad(s, 2) + '</span>:<span class="changable">' + addZeroBack(pad(ms, 1))+'</span>';
	
	return newTime;
}

function show1() {
	$time = document.getElementById('pinkwatchs');;
	update1();
}

function update1() {
	$time.innerHTML = formatTime(x.time());
}

   function start1() {
clocktimer = setInterval("update1()", 100);
	x.start1();    
}

    
function stop1() {
	x.stop1();
	clearInterval(clocktimer);
}

function reset1() {
	stop1();
	x.reset1();
	update1();
}



//blue clock

var	clsStopwatch2 = function() {
		// Private vars
		var	startAt	= 0;	// Time of last start / resume. (0 if not running)
		var	lapTime	= 0;	// Time on the clock when last stopped in milliseconds

		var	now	= function() {
				return (new Date()).getTime(); 
			}; 
 
		// Public methods
		// Start or resume
		this.start2 = function() {
				startAt	= startAt ? startAt : now();
			};

		// Stop or pause
		this.stop2 = function() {
				// If running, update elapsed time otherwise keep it
				lapTime	= startAt ? lapTime + now() - startAt : lapTime;
				startAt	= 0; // Paused
			};

		// Reset
		this.reset2 = function() {
				lapTime = startAt = 0;
			};

		// Duration
		this.time2 = function() {
				return lapTime + (startAt ? now() - startAt : 0); 
			};
	};

var x2 = new clsStopwatch2();
var $time2;
var clocktimer2;

function pad2(num, size) {
	var s = "0000" + num;
	return s.substr(s.length - size);
}

function formatTime2(time2) {
	var h = m = s = ms = ms2 = 0;
	var newTime = '';

	h = Math.floor( time2 / (60 * 60 * 1000) );
	time2 = time2 % (60 * 60 * 1000);
	m = Math.floor( time2 / (60 * 1000) );
	time2 = time2 % (60 * 1000);
	s = Math.floor( time2 / 1000 );
	ms = pad(time2 % 1000,3);
	ms2 = ms.charAt(0);
//	Clock_pink(prop,pad(s, 2))
	Clock_blue(prop,pad(s, 2))
	newTime = '<span class="changable">'+pad2(m, 2) + '</span>:<span class="changable">' + pad2(s, 2) + '</span>:<span class="changable">' + addZeroBack(ms2)+'</span>';
	//console.log(pad2(m, 2)+":"+pad2(s, 2)+":"+addZeroBack(ms2));
	return newTime;
}

function show2() {
	$time2 = document.getElementById('bluewatchs');
	update2();
}

function update2() {
	$time2.innerHTML = formatTime2(x2.time2());
}

   function start2() {
clocktimer2 = setInterval("update2()", 100);
	x2.start2();    
}

    
function stop2() {
	x2.stop2();
	clearInterval(clocktimer2);
}

function reset2() {
	stop2();
	x2.reset2();
	update2();
}

//grey clock


var	clsStopwatch3 = function() {
		// Private vars
		var	startAt	= 0;	// Time of last start / resume. (0 if not running)
		var	lapTime	= 0;	// Time on the clock when last stopped in milliseconds

		var	now	= function() {
				return (new Date()).getTime(); 
			}; 
 
		// Public methods
		// Start or resume
		this.start3 = function() {
				startAt	= startAt ? startAt : now();
			};

		// Stop or pause
		this.stop3 = function() {
				// If running, update elapsed time otherwise keep it
				lapTime	= startAt ? lapTime + now() - startAt : lapTime;
				startAt	= 0; // Paused
			};

		// Reset
		this.reset3 = function() {
				lapTime = startAt = 0;
			};

		// Duration
		this.time3 = function() {
				return lapTime + (startAt ? now() - startAt : 0); 
			};
	};

var x3 = new clsStopwatch3();
var $time3;
var clocktimer3;

function pad3(num, size) {
	var s = "0000" + num;
	return s.substr(s.length - size);
}

function formatTime3(time3) {
	var h = m = s = ms = ms2 = 0;
	var newTime = '';

	h = Math.floor( time3 / (60 * 60 * 1000) );
	time3 = time3 % (60 * 60 * 1000);
	m = Math.floor( time3 / (60 * 1000) );
	time3 = time3 % (60 * 1000);
	s = Math.floor( time3 / 1000 );
	ms = pad(time3 % 1000,3);
	ms2 = ms.charAt(0);
//	Clock_pink(prop,pad(s, 2))
	Clock_grey(prop,pad(s, 2))
	newTime = '<span class="changable">'+pad2(m, 2) + '</span>:<span class="changable">' + pad2(s, 2) + '</span>:<span class="changable">' + addZeroBack(ms2)+'</span>';
	//newTime = '<span class="changable">'+pad3(m, 2) + '</span>:<span class="changable">' + pad3(s, 2) + '</span>:<span class="changable">' + addZeroBack(pad3(ms, 1))+'</span>';
	
	return newTime;
}

function show3() {
	$time3 = document.getElementById('totalwatchs');
	update3();
}

function update3() {
	$time3.innerHTML = formatTime3(x3.time3());
}

   function start3() {
clocktimer3 = setInterval("update3()", 100);
	x3.start3();    
}

    
function stop3() {
	x3.stop3();
	clearInterval(clocktimer3);
}

function reset3() {
	stop3();
	x3.reset3();
	update3();
}


