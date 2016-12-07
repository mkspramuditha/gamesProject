
$(".food div").draggable({

    drag: function( event, ui ) {
        if (ui.offset.left > $("#food_catagories").offset().left && ui.offset.left < $("#food_catagories").offset().left + $("#food_catagories").width()
            && ui.offset.top > $("#food_catagories").offset().top && ui.offset.top < $("#food_catagories").offset().top + $("#food_catagories").height()) {
            attempted = true;
        }
    },
    revert: true
    });

function handleDropEvent(event, ui) {
    var dragitem = ui.draggable;
    dragitem.draggable('disable');

};

$(".nn_foods div").droppable({
    accept: ".food-2-2, .food-3-1, .food-3-3, .food-3-5",
    drop: handleDropEvent
});

$(".n_foods div").droppable({
    accept: ".food-1-1, .food-2-1, .food-2-3, .food-3-2, .food-3-4, .food-4-1",
    drop: handleDropEvent
});
