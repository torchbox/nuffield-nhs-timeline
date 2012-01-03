var bgspeed = -0.5;
var overlaycounter = 0;
var rate = 1;
var scroller;

$(function(){
	$('body').addClass("hasjs");
	
	//find index of 'selected' nav item
	selectedIndex = $('.nav li.selected').index();
	
	//set up current year parallax and year changing
	configPeriod('.origin');
	
	//load other years
	$('.nav li a').each(function(){
		if(!$(this).parent().hasClass("selected")){
			loadPeriod($(this));
		}
		
		var $this = $(this);
		
		//clicking nav items scrolls to that item
		$this.click(function(){
			//get index of link clicked
			index = $('.nav li a').index($this);
			return scrollToPeriod(index);
		});
		
		resizeWindow();
		
	});
	
	//set height of timeline to full browser height
	resizeWindow();
	
	$(window).bind('resize', function(){
		resizeWindow();
	});
	
	//add right/left arrows to nav
	$('.nav').append('<a class="next">&nbsp;</a>').prepend('<a class="prev">&nbsp;</a>');
	
	/* auto scrolling of timeline when hovering/clicking over next/prev */
	$('.nav .prev, .nav .next').hover(
		function(){
			var $this = $(this);
			
			rate = ($this.is('.prev')) ? -1:1;
			
			scroller = setInterval( scrollTimeline, 50 );
			$this.data('scroller', scroller);
		},
		function(){
			scrollerr = $(this).data('scroller');
			clearInterval(scroller);
		}
	).click(function(){
		clearInterval(scroller);
		value = ($(this).is('.prev')) ? -1:1;

		currentIndex = $('.nav li.selected').index();
		nextIndex = currentIndex+value;
		
		if(currentIndex < ($('.nav li').length) || currentIndex > 0){
			return scrollToPeriod(nextIndex);
		}	
	});
});

function resizeWindow(){
	var browserinnerheight = $(window).height();	
	$('.timeline').height(browserinnerheight);
}

function scrollTimeline(){
	var newposVal=(20 * rate)
    var newpos = newposVal +'px'
	newpos = newpos.replace(/([\-\+]?)([0-9]+)/g,'$1=$2')
	if(newposVal > 0){
		newpos="+" + newpos;
	}
	$.scrollTo(newpos);
}

function scrollToPeriod(index){
	$.scrollTo('.timeline > div:eq('+index+')', {
		duration:2000,
		onAfter: function(){
			$('.nav li').removeClass("selected");
			$('.nav li:eq('+index+')').addClass("selected");
		}
	});
	return false;
}

function loadPeriod(triggerElement){	
	if(triggerElement.attr("href").length){
		//store href of year
		var periodHref = triggerElement.attr("href");
		
		//find current timeline width so it can be increased to accomodate each new item
		var timelineWidth = $('.timeline').width();
		
		//create placeholder item which will get replaced as the content is loaded
		var newItem = $('<div class="loading">'+triggerElement.html()+' Loading...</div>')
		
		if($('.nav li a').index(triggerElement)  > selectedIndex){
			//append to timeline if item being loaded appears after the 'selected' item (the current page)
			newItem.appendTo('.timeline');
		}else{
			//prepend if the item loaded should appear before the current selected item
			newItem.insertBefore('.origin');
		}
		
		//recalculate width of timeline
		recalcWidth();
		
		//move back to origin so it doesn't look like anything has happened
		$.scrollTo('.origin');

		//load content from target page
		newItem.load(periodHref +' .timeline .content', function(){
			newItem.removeClass("loading");
			
			recalcWidth();
			
			//move back to origin so it doesn't look like anything has happened
			$.scrollTo('.origin');
			
			//set up parallax and year changing
			configPeriod(newItem);
		});
	}
	
	return false;
}

function configPeriod(element){

	//enable overlays for images/videos 
	$(element).find('.popup').each(function(){
		var $this = $(this);
		if($this.parent().find('.overlay').length){
			var specialclass = "overlay"+overlaycounter;
			//add invalid rel tag which jquerytools depends upon
			$this.attr("rel","."+specialclass);
			$this.parent().find('.overlay').addClass(specialclass);
			
			$this.overlay({
				mask: 'black',
				onBeforeLoad:function(){
					//append it to the body to prevent IE issues with z-index
					this.getOverlay().appendTo('body');
				}
			}).append('<span></span>');
			
			overlaycounter++;
		}
	});
	
	//monitor what's in view so we can change date
	$(element).bind('inview', function (event, visible) {
		if (visible == true) {
			$('.yearindicator').html($(element).find('.content').attr("title"));
		}
	});
		
	//apply parallax to this item
	$(element).find('.content').scrollParallax({
		'speed':bgspeed
	});
	
	return false;
}

function recalcWidth(){
	var totalWidth = 0;
	$('.timeline > div').each(function(){
		totalWidth += $(this).width();
	});
	$('.timeline').width(totalWidth);
}