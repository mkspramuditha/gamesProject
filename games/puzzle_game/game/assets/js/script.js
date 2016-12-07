var score=0,attempted=false;

//zoom animation
$(".food div" ).hover(function (e) {
	if (!$(this).draggable('option', 'disabled')){
		$(this).css("background-size","100%");
		$(this).css("z-index","500");
	}
});
$(".food div").mouseleave(function (e) {
	if (!$(this).draggable('option', 'disabled')){ //or uiDroppable
		$(this).css("background-size","80%");
	    $(this).css("z-index","");
	}
});
////////////////////////


$( ".food div" ).draggable({
    revert: 'invalid',
    drag: function( event, ui ) {
        if(ui.offset.left > $("#pyramid_content").offset().left && ui.offset.left < $("#pyramid_content").offset().left+ $("#pyramid_content").width()
            && ui.offset.top > $("#pyramid_content").offset().top && ui.offset.top < $("#pyramid_content").offset().top+ $("#pyramid_content").height()){
            attempted=true;
        }
    },
    stop:function (event,ui) {
        if(attempted && score>=5){
            score-=5;
            RecordTest(score);
            document.getElementById('scoreboard').innerText="Score = "+score;
            attempted=false;
        }
    },
	hover:function(){
		alert("sf");
	}
});
$( ".level-1" ).droppable({
    accept: ".food-1-1, .food-1-2",
    toleranceType: 'fit',
    drop: handleDropEvent
});
$( ".level-2-1" ).droppable({
    accept: ".food-2-1, .food-2-2",
    toleranceType: 'fit',
    drop: handleDropEvent
});
$( ".level-2-2" ).droppable({
    accept: ".food-3-1, .food-3-2, .food-3-3, .food-3-4",
    toleranceType: 'fit',
    drop: handleDropEvent
});
$( ".level-3-1" ).droppable({
    accept: ".food-4-1, .food-4-2, .food-4-3",
    toleranceType: 'fit',
    drop: handleDropEvent
});
$( ".level-3-2" ).droppable({
    accept: ".food-5-1, .food-5-2, .food-5-3, .food-5-4, .food-5-5",
    toleranceType: 'fit',
    drop: handleDropEvent
});
$( ".level-4" ).droppable({
    accept: ".food-6-1, .food-6-2, .food-6-3, .food-6-4, .food-6-5, .food-6-6, .food-6-7",
    toleranceType: 'fit',
    drop: handleDropEvent
});

function handleDropEvent(event, ui) {
    //animation
    /*$(this).append(ui.draggable);
    $(ui.draggable).css({top: 0});
    $(ui.draggable).removeClass('col-md-4');
    $(ui.draggable).addClass('col-md-3');
    /*$(ui.draggable).animate({
        top: 0,
        left: 0
    }, 'slow');*/
    score+=15;
    RecordTest(score);
    var dragitem = ui.draggable;
    dragitem.draggable('disable');
	dragitem.css("left","");
	dragitem.css("top","");
	dragitem.css("width","50px");
	dragitem.css("height","50px");
	dragitem.css("positive","relative");
	$(this).append(dragitem);
    document.getElementById('scoreboard').innerText="Score = "+score;

};