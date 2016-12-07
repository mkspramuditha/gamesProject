var attempted = false;
var enterPressed = false;
var n_food = 0;
var nn_food =0;
var score = 0;
var dropped = false;
function enable_drag() {
    $(".food div").draggable({
        revert: 'invalid',
        drag: function (event,ui) {
            dropped=false;
            $("#massegebox").html("");
            $("#reason_input_nnf").prop('disabled',true);
            $("#reason_input_nf").prop('disabled',true);
            if (ui.offset.left > $("#food_catagories").offset().left && ui.offset.left < $("#food_catagories").offset().left + $("#food_catagories").width()
                && ui.offset.top > $("#food_catagories").offset().top && ui.offset.top < $("#food_catagories").offset().top + $("#food_catagories").height()) {
                attempted = true;
            }
        },
		stop:function(event,ui){
			if(score>=2 && (attempted==true||dropped==true)){
				score=score-2;
                RecordTest(score);
			}
			$("#scorecard").html("ලකුණු: "+score);
            if(dropped==false){
                $("#massegebox").html("උත්සාහය අසාර්ථකයි. නැවත උත්සහ කරන්න.");
                attempted=false;
            }
		}
    });
}

$(".food div" ).hover(function (e) {
    if (!$(this).draggable('option', 'disabled')){
        $(this).css("background-size","100%");
        $(this).css("z-index","500");
    }
});
$(".food div").mouseleave(function (e) {
    if (!$(this).draggable('option', 'disabled')){
        $(this).css("background-size","90%");
        $(this).css("z-index","");
    }
});


function handleDropEvent(event,ui) {
    $("#massegebox").html("Successful");
   /* var dragitem = ui.draggale;*/
    //dragitem.draggable('disable');

};

function dis_draggable() {
   /* for (x in $(".food div")){
        x.draggable("disable");
    }*/
   $(".food div").draggable("disable");
}

enable_drag();

$(".nn_foods div").droppable({
    accept: "#අයිස්ක්රීම්, #ක්‍රීම්, #ඥනකතා, #ටොෆී, #ඩෝනට්, #පානවර්ග, #පෙතිඅල, #මුරුක්කන්, #වඩෙ, #හොට්ඩොග්, #කේක්රෝල්, #කේක්",
    drop: function (event,ui) {
        dropped=true;
        attempted=false;
        $("#massegebox").html("ඔබගේ වර්ගීකරණයට හේතු පහත කොටුවේ සඳහන් කරන්න.");
        $("#reason_input_nnf").prop('disabled',false);
        $("#reason_input_nnf").focus();
        var dragitem = ui.draggable;
        dragitem.draggable( 'disable' );
        ui.droppable.droppable( 'disable' );
		dragitem.appendTo($(this));
		dragitem.css("left","0px");
		dragitem.css("top","0px");
		dragitem.css("position","absolute");
        score=score+4;
        RecordTest(score);
        nn_food++;
        // console.log("Score: "+ score);
        $("#scorecard").html("ලකුණු: "+ score);
        //dis_draggable();
        $('#reason_input_nnf').on('keypress', function (e) {
            if(e.which === 13){
                $(this).prop('disabled',true);
                if($(this).val()!="") {
                    $("#reason_nnf").append(nn_food + ". " + $(this).val() + "<br>");
                    $(this).val("");
                    $('#massegebox').html("");
                    enterPressed = true;
					score=score+3;
                    RecordTest(score);
                    // console.log("Score: "+ score);
                    $("#scorecard").html("ලකුණු: "+score);
                }
            }
            else{
                enterPressed = false;
				//score=score+2;
                //$("#scorecard").html("Score: "+ score);
            }

        });
        /* var dragitem = ui.draggale;*/
        //dragitem.draggable('disable');
    }
});

$(".n_foods div").droppable({
    accept: "#අඹ, #අලිගැටපේර, #කජු, #කඩල, #කිරි, #ගස්ලබු, #චීස්, #පළතුරුසලාදය, #පේර, #මුංඇට, #මුදවපුකිරි, #රටකජු",
    drop: function (event,ui) {

        dropped=true;
        $("#massegebox").html("ඔබගේ වර්ගීකරණයට හේතු පහත කොටුවේ සඳහන් කරන්න.");
        $("#reason_input_nf").prop('disabled',false);
        $("#reason_input_nf").focus();
        var dragitem = ui.draggable;
        dragitem.draggable( 'disable' );
		dragitem.appendTo($(this));
		dragitem.css("left","0px");
		dragitem.css("top","0px");
		dragitem.css("position","absolute");
        score=score+4;
        RecordTest(score);
        n_food++;
        console.log("Score: "+ score);
        $("#scorecard").html("ලකුණු: "+ score);
        $('#reason_input_nf').on('keypress', function (e) {
            if(e.which === 13 && !enterPressed){

                $(this).prop('disabled',true);
                if($(this).val()!="") {
                    $("#reason_nf").append(n_food + ". " + $(this).val() + "<br>");
                    $(this).val("");
                    $('#massegebox').html("");
                    enterPressed = true;

                    score=score+3;
                    RecordTest(score);
                    console.log("Score: "+ score);
                    $("#scorecard").html("ලකුණු: "+ score);
                }
            }
            else{
                enterPressed = false;
            }
            if(enterPressed){

            }
        });

    }
});
