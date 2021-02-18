//Sample dates
var dates = ["02/15/2021","4/01/2020", "8/01/2019"];
//For the purpose of stringifying MM/DD/YYYY date format
var monthSpan = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

//Format MM/DD/YYYY into string
function dateSpan(date) {
  var month = date.split('/')[0];
  month = monthSpan[month - 1];
  var day = date.split('/')[1];
  if (day.charAt(0) == '0') {
    day = day.charAt(1);
  }
  var year = date.split('/')[2];
  // return month + " " + day + ", " + year;
  return year;
}

//Main function. Draw your circles.
function makeCircles() {
  if (dates.length < 2) {
    $("#line").hide();
    // $("#span").show().text(dateSpan(dates[0]));
    //This is what you really want.
  } else if (dates.length >= 2) {
    //Set day, month and year variables for the math
    var first = dates[0];
    var last = dates[dates.length - 1];

    var firstMonth = parseInt(first.split('/')[0]);
    var firstDay = parseInt(first.split('/')[1]);

    var lastMonth = parseInt(last.split('/')[0]);
    var lastDay = parseInt(last.split('/')[1]);

    //Integer representation of the last day. The first day is represnted as 0
    var lastInt = ((lastMonth - firstMonth) * 30) + (lastDay - firstDay);

    //Draw first date circle
    $("#line").append('<div class="circle" id="circle0" style="left: ' + 0 + '%;"><div class="popupSpan">' + dateSpan(dates[0]) + '</div></div>');
    
    // $("#mainCont").append('<span id="span0" class="center">' + dateSpan(dates[0]) + '</span>');

    //Loop through middle dates
    for (i = 1; i < dates.length - 1; i++) {
      var thisMonth = parseInt(dates[i].split('/')[0]);
      var thisDay = parseInt(dates[i].split('/')[1]);

      //Integer representation of the date
      var thisInt = ((thisMonth - firstMonth) * 30) + (thisDay - firstDay);

      //Integer relative to the first and last dates
      var relativeInt = thisInt / lastInt;

      //Draw the date circle
      $("#line").append('<div class="circle" id="circle' + i + '" style="left: ' + relativeInt * 100 + '%;"><div class="popupSpan">' + dateSpan(dates[i]) + '</div></div>');
      // $("#mainCont").append('<span id="span' + i + '" class="right">' + dateSpan(dates[i]) + '</span>');
    }

    //Draw the last date circle
    $("#line").append('<div class="circle" id="circle' + i + '" style="left: ' + 99 + '%;"><div class="popupSpan">' + dateSpan(dates[dates.length - 1]) + '</div></div>'); 
    
    // $("#mainCont").append('<span id="span' + i + '" class="right">' + dateSpan(dates[i]) + '</span>');
  }

  $(".circle:first").addClass("active");
}

$(document).ready(function(){
	makeCircles();
	$(".circle").mouseenter(function() {
		$(this).addClass("hover");
	  });
	  
	  $(".circle").mouseleave(function() {
		$(this).removeClass("hover");
	  });
	  
	  $(".circle").click(function() {
		var spanNum = $(this).attr("id");
		selectDate(spanNum);
	  });
});

function selectDate(selector) {
  $selector = "#" + selector;
  $spanSelector = $selector.replace("circle", "span");
  var current = $selector.replace("circle", "");
  
  $(".active").removeClass("active");
  $($selector).addClass("active");
  
  if ($($spanSelector).hasClass("right")) {
    $(".center").removeClass("center").addClass("left")
    $($spanSelector).addClass("center");
    $($spanSelector).removeClass("right")
  } else if ($($spanSelector).hasClass("left")) {
    $(".center").removeClass("center").addClass("right");
    $($spanSelector).addClass("center");
    $($spanSelector).removeClass("left");
  }; 
};

$(document).ready(function(){
  $('.responsive').slick({
    dots: false,
    prevArrow: $('.prev'),
    nextArrow: $('.next'),
    infinite: true,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
          autoplaySpeed: 1750
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          autoplaySpeed: 1500
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplaySpeed: 750
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });
  $('.works-table img').click(function(){
    var data_target = $(this).attr('data-target');
    $('#' + data_target).show('fadeUp');
  });
  $('.next-modal, .prev-modal').click(function(){
    var data_target = $(this).attr('data-target');
    $('.modal').hide('fadeDown');
    $('#' + data_target).show('fadeUp');
  });
  $('.btn-close').click(function(){
    $('.modal').hide('fadeDown');
  });
});