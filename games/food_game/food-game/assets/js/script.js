var score=0,attempted=false;

$( ".food div" ).draggable(/*{
   revert: 'invalid',
             drag: function( event, ui ) {
        if(ui.offset.left > $("#food_catagories").offset().left && ui.offset.left < $("#food_catagories").offset().left+ $("#food_catagories").width()
            && ui.offset.top > $("#food_catagories").offset().top && ui.offset.top < $("#food_catagories").offset().top+ $("#food_catagories").height()){
            attempted=true;
        }
        alert("dfgf");
    }/*,
    stop:function (event,ui) {
        if(attempted && score>=5){
            score-=5;
            document.getElementById('scoreboard').innerText="Score = "+score;
            attempted=false;
        }
    }
}*/);
$( ".nnf" ).droppable({
    accept: ".food_2_2, .food_3_1, .food_3_3, .food_3_5",
    toleranceType: 'fit',
    hoverClass:'hovered',
    drop: handleDropEvent
});
$( ".level-2" ).droppable({
    accept: ".food-2-1, .food-2-2, .food-2-3",
    toleranceType: 'fit',
    hoverClass:'hovered',
    drop: handleDropEvent
});
$( ".level-3" ).droppable({
    accept: ".food-3-1, .food-3-2, .food-3-3, .food-3-4, .food-3-5",
    toleranceType: 'fit',
    hoverClass:'hovered',
    drop: handleDropEvent
});
$( ".level-4" ).droppable({
    accept: ".food-4-1, .food-4-2, .food-4-3, .food-4-4",
    toleranceType: 'fit',
    hoverClass:'hovered',
    drop: handleDropEvent
});
$( ".level-5" ).droppable({
    accept: ".food-5-1, .food-5-2, .food-5-3, .food-5-4, .food-5-5, .food-5-6, .food-5-7, .food-5-8, .food-5-9",
    toleranceType: 'fit',
    hoverClass:'hovered',
    drop: handleDropEvent
});
$( ".level-6" ).droppable({
    accept: ".food-6-1, .food-6-2, .food-6-3, .food-6-4, .food-6-5, .food-6-6, .food-6-7",
    toleranceType: 'fit',
    hoverClass:'hovered',
    drop: handleDropEvent
});

function handleDropEvent(event, ui) {
    score+=15;
    var dragitem = ui.draggable;
    dragitem.draggable('disable');
    document.getElementById('scoreboard').innerText="Score = "+score;
};

function add()
{
    document.getElementById("").innerHTML="<input type='text' value=''>"
}