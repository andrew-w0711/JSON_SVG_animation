var delay = (function() {
	var timer = 0;
	return function(callback, ms) {
		clearTimeout(timer);
		timer = setTimeout(callback, ms);
	};
})();

var sound = 1;
var getCoordinateOfSender1 = '',
    operat = '',
    operators = '',
    opsJson = '';
var scrolltime = 40;
var scroller = 40;
var dotcom = 0;
var transactionID = 0;
var cData = '';
var pData = '';
var clearme = 0;
var clearblue = 0;
var cleartotal = 0;
var winH = $(window).height();
var winW = $(window).width();
var bluewatch = 0;
var clearwatch = 0;
var totalwatch = 0;
var pinkwatch = 0;
var soundmixdown        = new Audio("assets/sounds/aac/sfx_ILD.v02_mixdown.aac");
var soundmixdownDouble  = new Audio("assets/sounds/aac/DING! double_mixdown11.aac");
var soundradom1         = new Audio("assets/sounds/aac/sfx_1.aac");
var soundradom2         = new Audio("assets/sounds/aac/sfx_2.aac");

var newAudio1 = {duration: 6000, file: 'sfx_ILD.v02_mixdown'},
    newAudio2 = {duration: 6000, file: 'DING! double_mixdown11'},
    newAudio3 = {duration: 2000, file: 'sfx_1'},
    newAudio4 = {duration: 3000, file: 'sfx_2'};

var scrolltime2 = 25;
var phoneIcon = "phone";
var isDesk = 1;
var isDesk2 = 0;
isDesk2 = (winW < 1025) ? 0 : 1;

var mapW = '1920';
var mapH = '1080';
var ratiomap = mapW / mapH;
var conH = winH;
var conW = conH * ratiomap;
var ratioWidth = mapH / mapW;
if (winW < winH || conW > winW) {
	conW = winW;
	conH = winW * ratioWidth;
}
conW = parseInt(conW);

var tsm1 = 0,
    tsm2 = 0,
    tsm3 = 0;

var previous_timestamp = 0;
var current_timestamp = 0;

$(window).bind('resize', function(e) {
    if (window.RT) {
        clearTimeout(window.RT);
    }
    window.RT = setTimeout(function() {
        this.location.reload(false);
  	    /*if (parseInt(window.orientation) == 90) {
            this.location.reload(false);
	    } else {
            this.location.reload(false);
	    }*/
        this.location.reload(false);
    }, 1000);
});


var idleTime = 0;
$(document).ready(function() {
	checkCookie();
	//Increment the idle time counter every minute.
	var idleInterval = setInterval(timerIncrement, 60000);
	// 1 minute
	//Zero the idle timer on mouse movement.
	$(this).mousemove(function(e) {
		idleTime = 0;
	});
	$(this).keypress(function(e) {
		idleTime = 0;
	});
    if (isDesk) {
        tweeterfeed();
    }

	//check idle of brouser ends
	var formW = $('.form-section').width();
	$('.pointers').css('opacity', 1).hide();
	settingSection(formW);
	var pinkwatch = 0;
	var tim = 0;
	var tim1 = 0;
	var tims = 0;
	bluewatch = 0;
	var initwatch = 0;
	if (isDesk) {
		//start watch
		show1();
        show2();
        show3();

		start1();
        start2();
        start3();
	}
	// containerH(winH);
	loadCountryInfo(conW, conH);
//	alignMiddle(conH, winH,conW);
	$('.container').height(conH);
	$('.svgdatacontainer').width(conW);
	$('.world-map').css({
		height : conH
	});
	$('.footer').css('opacity', 1);
	if (isDesk) {
		$('.transaction-current').find('.date-box').html(customdate);
		setInterval(function(i) {
			$('.transaction-current').find('.time-box').html(customtime);
		}, 1000);
	}
});
//

function timerIncrement() {
	idleTime = idleTime + 1;
}

// function for transaction live animation
function ani() {
	$('.tlt').textillate('start');
	$('.tlt').on('inAnimationEnd.tlt', function() {
		$('.tlt1').textillate('start');
	});
}

//setting container height in respect of map image
function containerH(winH) {
	var conH = winH;
	$('.container').height(conH);
}

//loading transaction related json data
function loadCountryInfo(conW, conH) {

	$.ajax({
		type : "GET",
		url : "read.php",
		success : function(data) {
			if ( typeof (data) == 'string') {
				data = $.parseJSON(data);
			}
			cData = data;
			getPData(cData, conW, conH);
			totalsincemid(data.totalsSinceMidnight, data.dailyAverages);

			// setInterval(function() {
				// totalsincemid(data.totalsSinceMidnight, data.dailyAverages);
			// }, 60000 * 15)


        },
        faild : function(data){

        }
	});
}

//getting respective xml
function getPData(cData, conW, conH) {
	$.ajax({
		type : "GET",
		url : "assets/xml/config.xml",
		dataType : "text",
		success : function(xml) {
			pData = xml;
//			setTimeout(function() {
				getCoordinateOfSender1 = ContinfoInxml(pData, conW, conH);

				operat = $.parseXML(pData);
				operators = operatorsXml(operat);
				opsJson = cData.operatorStats;
				if (isDesk) {
					performOperatorsStats(operators, getCoordinateOfSender1, opsJson);
				}

				startCode(cData, getCoordinateOfSender1);

//			}, 1000);

            /*setTimeout(function(){
                if (isDesk) {
                    performOperatorsStats(operators, getCoordinateOfSender1, opsJson);
                }
            }, 20000);*/
		}
	})
}



var newarr = {};
var opp = {};
function ContinfoInxml(XML, conW, conH) {
    var coordi = '',
        countryiso = '',
        countryname = '',
        coordi1 = '',
        thanks = '',
        flag = '';
    var flag1 = 0;
	var xmlDoc = $.parseXML(XML);
	var items = $(xmlDoc).find('countries').find('item');
	items.each(function() {
		coordi = $(this).attr('coordinates');
		countryiso = $(this).attr('countryiso');
		countryname = $(this).attr('countryname');
		flag = $(this).attr('flag');
		thanks = $(this).attr('thanks');
		coordi1 = coordi.split(',');
		var x = coordi1[coordi1.length - 2];
		var y = coordi1[coordi1.length - 1];
		var x1 = resCox(x, conW);
		var y1 = resCoy(y, conH);
		newarr[countryiso] = {
			'name'  : countryname,
			'left'  : x1,
			'top'   : y1,
			'flag'  : flag,
			'thanks': thanks
		};
		flag1 = 1;
	});

	if (flag1) {
		return newarr;
	}
    return false;
}

// fetching operators
function operatorsXml(XMLData) {
    var abbr = '',
        name = '',
        countryiso = '',
        items = '';
	items = $(XMLData).find('operators').find('item');
	var flag1 = 0;
	items.each(function() {
		abbr = $(this).attr('abbr');
		name = $(this).attr('name');
		countryiso = $(this).attr('countryiso');
		opp[abbr] = {
			'name' : name,
			'countryiso' : countryiso
		};
		flag1 = 1;
	});

	if (flag1) {
		return opp;
	}
    return false;
}

// performOperatorsStats
function performOperatorsStats(operators, getCoordinate, opsJson) {
    var desticode = '',
        total = '',
        online = '',
        transslider;

	$('.transaction-section-data').html('');
	for (var j = 0; j < opsJson.length; j++) {
		desticode = opsJson[j].destinationCode;
		total = opsJson[j].totalTransactions;
		online = opsJson[j].onlineTransactions;

		var operator = operators[desticode];
		if (operator) {
			var opName = operator.name;
			var opCountryiso = operator.countryiso;

			try {
				var flagcode = getCoordinate[opCountryiso].flag;
				flagcode = flagcode.split(',');
				var flagX = flagcode[flagcode.length - 2];
				var flagY = flagcode[flagcode.length - 1];
				var transactionOperator = '<div class="transaction-list">';
				transactionOperator += '<strong>' + online + '</strong>';
				transactionOperator += ' <sub>' + total + '</sub>';
				transactionOperator += ' <span>' + opName + '';
				transactionOperator += '<i class="country-flag" style=" background-position: -' + flagX + 'px -' + flagY + 'px;">&nbsp;</i>';
				transactionOperator += ' </span></div>';
				$('.transaction-section-data').append(transactionOperator);
			} catch(e) {

			}

		}

	}
	if (transslider) {
		transslider.destroySlider();
	}
	transslider = $('.transaction-section-data').bxSlider({
		ticker : true,
		speed : 3000000 - (20000*scrolltime2)
	});
}

// calculate formula for co-ordinate( x)
var mainW = 1920,
    mainH = 1080;
function resCox(passW, conW) {
	var resW = (passW * conW) / mainW;
    return parseInt(resW);
}

// calculate formula for co-ordinate( y)
function resCoy(passH, conH) {
	var resW = (passH * conH) / mainH;
    return parseInt(resW);
}


// current date setting
var customdate = function customdate() {
	var month = new Array();
	month[0] = "January";
	month[1] = "February";
	month[2] = "March";
	month[3] = "April";
	month[4] = "May";
	month[5] = "June";
	month[6] = "July";
	month[7] = "August";
	month[8] = "September";
	month[9] = "October";
	month[10] = "November";
	month[11] = "December";
	var d = new Date();
	var monthPrint = month[d.getMonth()];
	var datePrint = d.getDate();
	var yearPrint = d.getFullYear();
	return +datePrint + '&nbsp;' + monthPrint + '&nbsp;' + yearPrint;
}
var customtime = function customtime() {
	var d = new Date();
	var h = addZero(d.getHours());
	var m = addZero(d.getMinutes());
	var s = addZero(d.getSeconds());
	return h + ":" + m + ":" + s;
}


//   adding tweeter feed data...
var bxslider;
function tweeterfeed(xmldata) {
	//twitter item
	$('#message-section').html('');
	$('#message-section:first-child').tweecool({
		username : 'dingme'
	});

	var slidemes = 0;
	var clearslider = setInterval(function() {
		slidemes = $('.slideme1').find('.transaction-list').length;

		if (slidemes) {
			clearInterval(clearslider);
//			if (bxslider) {
//				bxslider.destroySlider();
//			}
			bxslider = $('.slideme1').bxSlider({
				ticker : true,
				speed : 570000 - (3000*scrolltime2)
			});
		}
	}, 1000);
}


var m = 0;
var start, end;
var ytrewq = 0;
function startCode(cData, pData) {
	var data = cData;
	$('.svgdatacontainer').css('opacity', 1);
	if ( typeof (data) == 'string') {
		data = JSON.parse(data);
	}
	var getCoordinateOfSender1 = pData;
	start = 0;
	end = 10;
	var k = 0;
	var l = 1;
	runLoop(k, l, start, end, data, getCoordinateOfSender1);
}

var k = 0;

function runLoop(k, flag, start, end, data, getCoordinateOfSender1) {
	 var newdts = data.transactions[k].transactionDateEndUtc;
	 var newdts1 = data.transactions[k+1].transactionDateEndUtc;

	var replaceChars={ "T":" " , "-":"/" };
	timeFrame3 = newdts.replace(/T|-/g,function(match) {return replaceChars[match];}).split(".")
	timeFrame4 = newdts1.replace(/T|-/g,function(match) {return replaceChars[match];}).split(".")
	
	tewerw = parseInt(Math.round(new Date(timeFrame3[0]).getTime())) + parseInt(timeFrame3[1]);
	tewerw1 = parseInt(Math.round(new Date(timeFrame4[0]).getTime())) + parseInt(timeFrame4[1]);
	
	current_timestamp = tewerw;
	
	var timeFrame3 = tewerw1 - tewerw;
    timeFrame3 = (timeFrame3 < -2000) ? 1000 : Math.abs(timeFrame3);

	if(previous_timestamp != 0 && previous_timestamp == current_timestamp) {
		loadCountryInfo(conW, conH);
		return false;
	} else {
        if(k==0) {
            previous_timestamp = current_timestamp;
        }
	    if ((data.transactions[k].distributorName == 'ezetop.com' || data.transactions[k].distributorName == 'ding.com') && data.transactions[k].productType != 'ILDTopup') {
            stopwatchpink();

            if (isDesk) {
                reset1();
                start1();
            }
	    } else if (data.transactions[k].productType == 'ILDTopup') {
	
            stopwatchblue(bluewatch, clearwatch);
            if (isDesk) {
                reset2();
                start2();

            }
        }
	    totalclock();
        if (isDesk) {
            reset3();
            start3();
        }

        var fromCountryISO = data.transactions[k].fromCountryISO;
        var toCountryISO = data.transactions[k].toCountryISO;
        var sender = getCoordinateOfSender1[fromCountryISO];
        var receiver = getCoordinateOfSender1[toCountryISO];
	
        if (flag) {
            if (k < data.transactions.length) {
                if (sender) {
                    performAnimation(sender, receiver, data.transactions[k], k);
                }
            }
        }
        if (k == data.transactions.length-5) {
            k = 0;
            transactionID = 0;
            pData = null, cData = null;
            loadCountryInfo(conW, conH);
        } else {
            k++;
            if (isDesk2) {
                delay(function() {
                    runLoop(k, flag, start, end, data, getCoordinateOfSender1)
                }, timeFrame3);
            } else {
                delay(function() {
                    runLoop(k, flag, start, end, data, getCoordinateOfSender1)
                }, 2000);
            }
        }

	//memory release
	fromCountryISO = null;
	toCountryISO = null;
	sender = null;
	receiver = null;

	}

}


//clock setting
var pinkwatch = 0;
function totalclock() {
	tsm3 = tsm3 + 1;
	$('.total-since-midnight').find('.data-third').html(addCommas(tsm3));
}

function stopwatchpink() {
	tsm1 = tsm1 + 1;
	tsm3 = tsm3 + 1;
	$('.total-since-midnight').find('.data-first').html(addCommas(tsm1));
	$('.total-since-midnight').find('.data-third').html(addCommas(tsm3));
}

function stopwatchblue(pinkwatch, clearwatch) {
    var tsm2 = tsm2 + 1;
    var tsm3 = tsm3 + 1;
	$('.total-since-midnight').find('.data-second').html(addCommas(tsm2));
	$('.total-since-midnight').find('.data-third').html(addCommas(tsm3));
}

//total since mid

function totalsincemid(tsm, da) {

	tsm = tsm[0];
	da = da[0];
	var tsm1 = tsm.onlineTransactions;
    var tsm2 = tsm.iLDTransactions;
    var tsm3 = tsm.totalTransactions;

	$('#pinkwatch-bottom').html(calcNewYear(tsm1));
	$('#bluewatch-bottom').html(calcNewYear(tsm2));
	$('#totalwatch-bottom').html(calcNewYear(tsm3));

	$('.total-since-midnight').find('.data-first').html(addCommas(tsm1));
	$('.total-since-midnight').find('.data-second').html(addCommas(tsm2));
	$('.total-since-midnight').find('.data-third').html(addCommas(tsm3));
	$('.average-per-day').find('.data-first').html(addCommas(da.averageOnlineDailyTransactions));
	$('.average-per-day').find('.data-second').html(addCommas(da.averageILDDailyTransactions));
	$('.average-per-day').find('.data-third').html(addCommas(da.averageDailyTransactions));

}

var calcNewYear = function(totalpr) {
	var dt = new Date();
	var time2 = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
	var totalseconds = (dt.getHours() * 60 * 60) + (dt.getMinutes() * 60) + (dt.getSeconds());

	var totalpr2 = Math.round((totalseconds / totalpr));
	var milliseconds2 = totalpr2 % 1000;
	var seconds2 = Math.floor((totalpr2) % 60);
	var minutes2 = Math.floor((totalpr2 / (60)) % 60);
	var timp = milliseconds2 % 100;
	if (timp != milliseconds2) {
		var milli = milliseconds2 % 10;
		milliseconds2 = milliseconds2 - milli;
		milliseconds2 = milliseconds2 / 10;

	}

    return '<span class="changable">' + addZero(minutes2) + '</span>:'+
           '<span class="changable">' + addZero(seconds2) + '</span>:'+
           '<span class="changable">' + addZero(milliseconds2) + '</span>';
};

function secondsToTime(secs) {
	var hours = Math.floor(secs / (60 * 60));
	var divisor_for_minutes = secs % (60 * 60);
	var minutes = Math.floor(divisor_for_minutes / 60);
	var divisor_for_seconds = divisor_for_minutes % 60;
	var seconds = Math.ceil(divisor_for_seconds);
	var obj = addZero(hours) + ':' + addZero(minutes) + ':' + addZero(seconds);
	return obj;
}

function alignMiddle(conH, winH,conW) {
	var space = (winH - conH);
	if (space > 0) {
		space = parseInt(space / 2);
        var wit = conW/4;
        console.log(wit);

		$('.container').css({marginTop: space});
		$('header').css({
            position: 'absolute',
            top: -space-20+'px',
            //left:50+'%',
            marginLeft: wit+'px'
		});
		$('.wrapper').css({
            overflow: 'hidden'
        });
	}
}

function addCommas(nStr) {
	nStr += '';
	var x = nStr.split('.');
	var x1 = x[0];
	var x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

function settingSection(formW) {
	$('.single-slider').jRange({
		from : 0,
		to : 100,
		step : 1,
		scale : [0,25,50,75,100],
		format : '%s',
		width : 300,
		showLabels : true,
		onstatechange : function(ranger) {
			scroller = ranger;
		}
	});

	$('#setting,#mobile-menu').on('click touch', function() {
		var half = winW - formW;
        $('.pointers')
            .css({
                left: half/2
            })
            .show();
		checkCookie();
	});

	$('#cancel-setting,#cancel-setting1').on('click', function() {
		$('.pointers').hide();
	});

	$('#save-setting,#save-setting1').on('click', function() {

		$(this).parents('.form-section').find('input[type=checkbox]').each(function() {

			var actionId = '';
			if ($(this)[0].checked) {
				actionId = $(this).attr('id');
				if (actionId == 'sound') {
					sound = 1;
				}

				if (actionId == 'com-trans') {
					dotcom = 1;
				}
				if (actionId == 'mobile-icon') {
					phoneIcon = "phone";
				}
				if (actionId == 'total-per-operator' || actionId == 'twitter-feed') {
					$('div[data-id=' + actionId + ']').show();
				}
				$('div[data-id=' + actionId + '],aside[data-id=' + actionId + ']').css('opacity', 1);

				setCookie(actionId, 'show');

			} else {
				actionId = $(this).attr('id');
				if (actionId == 'sound') {
					sound = 0;
				}
				if (actionId == 'com-trans') {
					dotcom = 0;
				}
				if (actionId == 'mobile-icon') {
					phoneIcon = "";
				}
				if (actionId == 'total-per-operator' || actionId == 'twitter-feed') {
					$('div[data-id=' + actionId + ']').hide();
				}
				$('div[data-id=' + actionId + '],aside[data-id=' + actionId + ']').css('opacity', 0);

				setCookie(actionId, 'hide');

			}
		});
		setCookie('sliderspeed', scroller);
		scrolltime2 = scroller;
			
		if (transslider) {
			transslider.destroySlider();
		}
		transslider = $('.transaction-section-data').bxSlider({
			ticker : true,
			speed : 3000000 - (20000*scrolltime2)
		});
		
		if (bxslider) {
			bxslider.destroySlider();
		}
		bxslider = $('.slideme1').bxSlider({
			ticker : true,
			speed : 570000 - (3000*scrolltime2)
		});
		$('.pointers').hide();
		
	});

}

function playSound(sound){
    var audioBlock = $('#audio-block');
    var audioPlayerId = 'player'+parseInt(Math.random()*1000);
    var audioPlayer = '<audio loop="true" id="'+audioPlayerId+'"></audio>';
    var audioFiles = '<source src="assets/sounds/topups/'+sound.file+'.mp3" type="audio/mpeg">'+
                     '<source src="assets/sounds/aac/'+sound.file+'.aac" type="audio/aac">'+
                     '<source src="assets/sounds/ogg/'+sound.file+'.ogg" type="audio/ogg">';
    audioBlock.append(audioPlayer);
    var playerRun = $('#'+audioPlayerId);
    playerRun.append(audioFiles);

    $('#'+audioPlayerId)[0].play();

    setInterval(function() {
        playerRun.remove();
    }, sound.duration + 1000);

//    sound.cloneNode().play();
}