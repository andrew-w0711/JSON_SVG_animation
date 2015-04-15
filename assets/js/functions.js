//setting cookies
function setCookie(actionId, one) {
    var d = new Date();
    d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = actionId + "=" + one + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ')
            c = c.substring(1);
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function addZero(i) {
    return (i < 10) ? "0" + i : i;
}

function addZeroBack(i) {
    return (i < 10) ? i + "0" : i;
}

function checkCookie() {
    var twitter = getCookie('twitter-feed');
    var tpp = getCookie('total-per-operator');
    var checksound = getCookie('sound');
    var dotcomt2 = getCookie('com-trans');
    var pinkclock = getCookie('pink-clock');
    var blueclock = getCookie('blue-clock');
    var totalclock = getCookie('total-clock');
    var totalsmid = getCookie('total-since-mid');
    var aveperday = getCookie('ave-per-day');
    var sliderSpeed = getCookie('sliderspeed');
    var phoneIcon2 = getCookie('mobile-icon');

    if (twitter == 'hide') {
        $('#desk-pop,#mobile-pop').find('#twitter-feed').attr('checked', false).prop('checked', false);
        $('div[data-id=twitter-feed]').hide();
    }
    if (tpp == 'hide') {
        $('#desk-pop,#mobile-pop').find('#total-per-operator').attr('checked', false).prop('checked', false);
        $('div[data-id=total-per-operator]').hide();
    }
    if (pinkclock == 'hide') {
        $('#desk-pop,#mobile-pop').find('#pink-clock').attr('checked', false).prop('checked', false);
        $('div[data-id=pink-clock]').css('opacity', 0);
    }
    if (blueclock == 'hide') {
        $('#desk-pop,#mobile-pop').find('#blue-clock').attr('checked', false).prop('checked', false);
        $('div[data-id=blue-clock]').css('opacity', 0);
    }
    if (totalclock == 'hide') {
        $('#desk-pop,#mobile-pop').find('#total-clock').attr('checked', false).prop('checked', false);
        $('div[data-id=total-clock]').css('opacity', 0);
    }
    if (totalsmid == 'hide') {
        $('#desk-pop,#mobile-pop').find('#total-since-mid').attr('checked', false).prop('checked', false);
        $('aside[data-id=total-since-mid]').css('opacity', 0);
    }
    if (aveperday == 'hide') {
        $('#desk-pop,#mobile-pop').find('#ave-per-day').attr('checked', false).prop('checked', false);
        $('aside[data-id=ave-per-day]').css('opacity', 0);
    }
    if (checksound == 'hide') {
        $('#desk-pop, #mobile-pop').find('#sound').attr('checked', false).prop('checked', false);
        sound = 0;
    }
    if (dotcomt2 == 'show') {
        $('#desk-pop,#mobile-pop').find('#com-trans').attr('checked', true).prop('checked', true);
        dotcom = 1;
    }
    if (sliderSpeed != 25) {
        scrolltime2 = sliderSpeed;
        $('input.single-slider')
    }
    if (phoneIcon2 == 'hide') {
        $('#desk-pop,#mobile-pop').find('#mobile-icon').attr('checked', false).prop('checked', false);
        phoneIcon = '';
    }
}

