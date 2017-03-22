
var fade = 0, countDir = 1, cycles =0;


function initPage(){

	console.log('page loaded');

	$('.first-audio').prop("volume", 1);
	$('.second-audio').prop("volume", 1);

	var handle = $( "#custom-handle" );
    $( "#slider" ).slider({
    	min: -10,
    	max: 10,
	    create: function() {
	    	handle.text( $( this ).slider( "value" ) );
	    	setFade($( this ).slider( "value" ));
	    },
	    slide: function( event, ui ) {
	    	handle.text( ui.value );
	    	setFade(ui.value);
	    }
    });

    $('.play-pause').click(function() {
    	if($(this).hasClass('pause')) {
    		$('audio').each(function() {
				this.pause();
			});
    		$(this).removeClass('pause');
    		$(this).addClass('play');
    		$('button').text('Play');
    	} else {
    		$('audio').each(function() {
				this.play();
			});
    		$(this).addClass('pause');
    		$(this).removeClass('play');
    		$('button').text('Pause');
    	}
    })

    //Sync up L & R
    setInterval(function() {
    	if($('#audio-first-left').currentTime !== $('#audio-first-right').currentTime) $('#audio-first-left').currentTime = $('#audio-first-right').currentTime;
    }, 100);

    //
    if ($('.player_audio').paused == false) {
    	$('button').text('Play');
    } else {
    	$('button').text('Pause');
    }

};

function setFade(fadeVal) {
	console.log(fadeVal);
	//Straight cross fade
	// var leftVol = (fade + 10)/20;
	// console.log('left volume -- ' + leftVol);
	// $('.left-audio').prop("volume", leftVol);
	// var rightVol = 1 - leftVol;
	// console.log('right volume -- ' + rightVol);
	// $('.right-audio').prop("volume", 1);

	// L-R Channel based
	//Left-left at full by half then add the right
	var firstLeftVol = (fadeVal * -1 + 10)/10 * 2;
	if(firstLeftVol>1) firstLeftVol =1;
	var firstRightVol = (fadeVal * -1 + 10)/20;

	console.log('first left volume -- ' + firstLeftVol);
	console.log('first right volume -- ' + firstRightVol);

	var secondLeftVol = (fadeVal + 10)/10 * 2;
	if(secondLeftVol>1) secondLeftVol =1;
	var secondRightVol = (fadeVal + 10)/20;

	console.log('second left volume -- ' + secondLeftVol);
	console.log('second right volume -- ' + secondRightVol);

	$('#audio-first-left').prop("volume", firstLeftVol);
	$('#audio-first-right').prop("volume", firstRightVol);
	$('#audio-second-left').prop("volume", secondLeftVol);
	$('#audio-second-right').prop("volume", secondRightVol);
}
