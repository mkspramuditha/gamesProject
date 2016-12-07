/**
 * Created by shan on 9/14/2016.
 */

$(document).ready(function() {
    adjustTd();
});

$(window).resize(function () {
    adjustTd();
});


function adjustTd() {
    var cw = $('td').width();
    $('td').height(cw);
}
$(function(){
    $('input')
        .bind('keyup', function(e) {
            var $this = $(this);
            var $tr = $this.closest("tr");
            var id = this.id;
            // console.log($tr);

            if(e.keyCode == 38){
                console.log('shan');
                // document.getElementById('5').focus();
                // $tr.prev().find('input[id^='+id+']').focus();
                // document.getElementById("6").focus();


            }
            else if(e.keyCode == 40)
            {
                console.log('shan1');
                // $tr.next().find("input[id^='"+id+"']").focus();
            }
        });
});

var puzzle = {width:10, height:10};
answers = [
    //horizontal
    {word:['ස','ර','ක්','කු'],places:[1,2,3,4],type:'h',hint:'තුනපහ හැඳින්වීමට භාවිතා කළහැකි තවත් නමකි.'},
    {word:['ක','ජු '],places:[6,7],type:'h',hint:'රස වුවද නොවුවද ආසාත්මික විය හැකි රසවත් ආහාරයකි.'},
    {word:['ඉ','ර'],places:[9,10],type:'h',hint:'අපේ සමතුළ විටමින් D නිෂ්පාදනය වීමට අත්‍යාවශ්‍ය වේ.'},
    {word:['බි','ඟු'],places:[18,19],type:'h',hint:'මී පැණි බෙහෙතට උවමනාවේ.'},
    {word:['සූ','දු','රු'],places:[23,24,25],type:'h',hint:'ආහාර රසවත් කිරීමට යොදා ගන්නා දුරු වර්ග අතරින් බහුලව භාවිතයට ගැනේ.'},
    {word:['ක','දු','රු'],places:[27,28,29],type:'h',hint:'මේවා ආහාරයට ගැනීම ඉතා භයානකය.'},
    {word:['කු','ණු'],places:[37,38],type:'h',hint:'අපිරිසිදු අර්ථය ගෙනදේ.'},
    {word:['අ','ළු','ත්'],places:[42,43,44],type:'h',hint:'විටමින් බහුලව පවතින්නේ මෙවන් එළවඵ හා පළතුරුවලය.'},
    {word:['මා','ළු'],places:[46,47],type:'h',hint:'දරුවන්ගේ පෝෂණයට ප්‍රධාන දායකත්වයක් සපයයි.'},
    {word:['බි','ඳු','නු'],places:[51,52,53],type:'h',hint:'මෙවන් බිත්තර ආහාරයට ගනීම ආාහාර විෂවීමට හේතු විය හැකිය.'},
    {word:['කො','ස්'],places:[59,60],type:'h',hint:'ශක්තිය බහුල , පාරම්පරික , දේශීය ආහාරයකි.'},
    {word:['පෝ','ලි','ක්'],places:[64,65,66],type:'h',hint:'තදකොළ පැහැති පළා වර්ගවල බහුලව අඩංගුවන , ගර්භණී මව්වරුන්ට ඉතා වැදගත් වන අම්ලයකි.'},
    {word:['ඉ','ස්','සා'],places:[68,69,70],type:'h',hint:'ඇතැමුන් ආසාත්මික වියහැකි, කොලෙස්ටරෝල් අඩංගු වන "උෂ්ණ" යැයි ලියවෙන ආහාරයකි.'},
    {word:['ත','ර'],places:[71,72],type:'h',hint:'තෙල්, පිෂ්ඨය වැනි ශක්ති ජනක ආහාර පමණට වඩා ආහාරයට ගත්විට මෙම තත්ත්වය ඇති විය හැකිය.'},
    {word:['නැ','ණ'],places:[83,84],type:'h',hint:'මෙය දියුණුකර ගැනීමට පෝෂ්‍යදායී ආහාර අනුභව කලයුතුය.'},
    {word:['බැ','ක්','ටී','රි','යා'],places:[86,87,88,89,90],type:'h',hint:'පියවි ඇසට නොපෙනෙන, ප්‍රයෝජනවත්  මෙන්ම ලෙඩරෝග ඇතිකිරීමටද හේතුවන ක්ෂුද්‍ර ජීවියෙකි.'},
    {word:['ය','ල'],places:[91,92],type:'h',hint:'ශ්‍රී ලංකාවේ භෝග වගාකරන ප්‍රධාන කන්න දෙකෙන් එකකි.'},
    {word:['අ','ත'],places:[95,96],type:'h',hint:'ආහාර ගැනීමට හා බෙදීමට පෙර මෙන්ම වැසිකිලි භාවිතයෙන් පසු සේදිය යුතු දෙයකි.'},
    //vertical
    {word:['ර','ස'],places:[2,12],type:'v',hint:'ඇතැමුන් ආහාරයේ මෙයට මුල්තැන දේ.'},
    {word:['කු','රු','ඳු'],places:[4,14,24],type:'v',hint:'ශ්‍රී ලංකාවට ආවේනික, ඉන්සියුලින් ක්‍රියාකාරිත්වය වැඩිකළ හැකි බවට විශ්වාස කරන කුළුබඩුවකි.'},
    {word:['ක','හ'],places:[6,16],type:'v',hint:'කිරිහොද්දට නැතුවම බැරි, මොලයේ සෛල යද් සමේ නිරෝගි බවට උපකාරිවන විෂබීජ නාශක ගුණාංග ඇති කුළුබඩුවකි.'},
    {word:['ඉ','ඟු','රු'],places:[9,19,29],type:'v',hint:'මේවා දී මිරිස් ගත්තා වැනි යැයි කියමනක් ජනවහරේ ඇත.'},
    {word:['බි','දු','ණු'],places:[18,28,38],type:'v',hint:'ප්‍රමාණවත් ලෙස කැල්සියම් ආහාරයේ අඩංගු නොවූ විට අස්ථි මෙම තත්ත්වයට පහසුවෙන් භාජනය වේ.'},
    {word:['කි','රි'],places:[21,31],type:'v',hint:'පහසුවෙන් සොයාගත හැකි, ඉතා ලාභදයී විටමින් ඒ (A) ප්‍රභවයකි.'},
    {word:['සු','දු','ළු','ණු'],places:[23,33,43,53],type:'v',hint:'අධිරුධිර පීඩනය හා රුධිරයේ කොලෙස්ටරෝල් පාලනය ආදී අම්ල ගුණ රැසක් සහිත කුළුබඩුවකි.'},
    {word:['රු','ව'],places:[25,35],type:'v',hint:'මෙය රැකගැනීමට ඇතැමුන් නොකරන දෙයක් නැත.'},
    {word:['ක','කු','ළු','වා'],places:[27,37,47,57],type:'v',hint:'ප්‍රෝටීන් බහුල සත්වමය ආහාරයකි.'},
    {word:['ගෙ','මැ','ස්','සා'],places:[40,50,60,70],type:'v',hint:'රෝග පතුරවන කෘමි විශේෂයකි'},
    {word:['අ','ඳු'],places:[42,52],type:'v',hint:'ඇතැම් සතුන්ට ඉතා අප්‍රියජනක කොළ වර්ගයකි.'},
    {word:['බි','ත්','ත','ර','ය'],places:[51,61,71,81,91],type:'v',hint:'ඉතා පෝෂ්‍යදායී ආහාරයක් වුවත් වැඩිහිටියන් නිරතුරුව ආහාරයට නොගතයුතු, අපවිත්‍ර වූ විට ආහාර විෂවීම ඇති කළ හැකි ද්‍රව්‍යයකි.'},
    {word:['පෝ','ෂ','ණ'],places:[64,74,84],type:'v',hint:'ආහාර තෝරාගැනීමේදී අප මෙම ගුණය කෙරෙහි නිතරම සැලකිලිමත් වියයුතුය.'},
    {word:['ඉ','ස්','ටී','ම්'],places:[68,78,88,98],type:'v',hint:'හුමාලයෙන් තැම්බූ සහල් මේ නමින් ද හඳුන්වනු ලබයි.'},
    {word:['බැ','ත'],places:[86,96],type:'v',hint:'බතට පෙර කුඹුරෙන් මෙය ලැබේ.'},
    {word:['යා','ල්'],places:[90,100],type:'v',hint:'වී වැපිරීමට පෙර මෙසේ කරනු ලැබේ.'},

];
var input = [];
var tdId;
for(var i=0;i<=puzzle.width*puzzle.height;i++)
{
    input[i]={isSet:0,letter:'',direction:[],values:[]};
}
// var input = Array.apply(null, Array(puzzle.width*puzzle.height+1)).map(Array.prototype.valueOf,{isSet:0,letter:'',direction:[],values:[]});
// console.log(input);
function createPuzzle() {



    for(var i = 0;i<answers.length;i++)
    {
        for (var j=0;j<answers[i].places.length ;j++)
        {
            input[answers[i].places[j]].isSet=1;
            input[answers[i].places[j]].letter=answers[i].word[j];
            input[answers[i].places[j]].direction.push(answers[i].type);
            input[answers[i].places[j]].values.push(i);
        }
    }
    // console.log(input);

    var puzzleDiv = document.getElementById('puzzle');
    var horizontalDiv = document.getElementById('horizontal');
    var verticalDiv = document.getElementById('vertical');
    var tableElement = document.createElement('table');
    tableElement.className='puzzle';
    var tableContent = '';
    for (var i=1;i<=puzzle.height;i++)
    {
        // console.log(i);
        tableContent+='<tr>';
        for(var j=1;j<=puzzle.width;j++)
        {
            // console.log(input[((i-1)*puzzle.width+j)]);
            if(input[((i-1)*puzzle.width+j)].isSet==1)
            {
                tableContent+='<td ';
                if(input[((i-1)*puzzle.width+j)].direction[0]=='h')
                {
                    tableContent+='data-horizontal = "'+input[((i-1)*puzzle.width+j)].values[0]+'"';
                }
                else if(input[((i-1)*puzzle.width+j)].direction[0]=='v'){
                    tableContent+='data-vertical = "'+input[((i-1)*puzzle.width+j)].values[0]+'"';
                }

                if(input[((i-1)*puzzle.width+j)].direction[1]=='h')
                {
                    tableContent+='data-horizontal = "'+input[((i-1)*puzzle.width+j)].values[1]+'"';
                }
                else if(input[((i-1)*puzzle.width+j)].direction[1]=='v'){
                    tableContent+='data-vertical = "'+input[((i-1)*puzzle.width+j)].values[1]+'"';
                }

                tableContent+='id='+((i-1)*puzzle.width+j)+' onclick="selectWord(this)" clr="white"><input type="text" maxlength="3" ></td>';
            }
            else {
                tableContent+='<td id='+((i-1)*puzzle.width+j)+'></td>';
            }

        }
        tableContent+='</tr>';
    }

    var horizontalList = document.createElement('ul');
    var verticalList = document.createElement('ul');
    var horizontal = '';
    var vertical = '';
    for(var i=0;i<answers.length;i++)
    {
        if(answers[i].type=='h')
        {
            horizontal+='<li id="li'+i+'">'+answers[i].places[0]+' : '+answers[i].hint+'</li>';
        }
        else if(answers[i].type=='v')
        {
            vertical+='<li id="li'+i+'">'+answers[i].places[0]+' : '+answers[i].hint+'</li>'
        }
    }
    tableElement.innerHTML=tableContent;

    horizontalList.innerHTML=horizontal;
    verticalList.innerHTML = vertical;
    horizontalDiv.appendChild(horizontalList);
    verticalDiv.appendChild(verticalList);
    puzzleDiv.appendChild(tableElement);


}

function checkPuzzle()
{
   for(var i =0; i<answers.length;i++)
    {
        var enteredWord = [];
        for(var j=0;j<answers[i].places.length;j++)
        {
            enteredWord[j] = $('#'+answers[i].places[j]+' input').val();
        }
        if(checkArray(enteredWord,answers[i].word))
        {
            setClassSuccess(answers[i].places);
        }

        else
        {
            setClassError(answers[i].places)
        }
    }
}

function checkArray(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;
    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;

}
function setClassSuccess(array) {
    for(var i=0;i<array.length;i++)
    {
        $("#"+array[i]).attr("class", "correct");
    }

}

function setClassError(array) {
    for(var i=0;i<array.length;i++)
    {
        if($("#"+array[i]).hasClass('correct')){
        }
        else {
            $("#"+array[i]).attr("class", "err");
        }

    }
}

function selectWord(td) {

    $('td.sel').removeClass('sel');
    $('li.selectHint').removeClass('selectHint');
    var horizontal = td.getAttribute("data-horizontal");
    var vertical = td.getAttribute("data-vertical");
   // alert(horizontal+' '+vertical);
   //  if(vertical == undefined )
   //  {
   //      console.log('undefined');
   //  }
    if(horizontal != undefined)
    {
        $("#li"+horizontal).attr("class", "selectHint");
        for(var i=0;i<answers[horizontal].places.length;i++)
        {
            $("#"+answers[horizontal].places[i]).attr("class", "sel");
        }
    }

    if(vertical != undefined)
    {
        $("#li"+vertical).attr("class","selectHint");
        for(var i=0;i<answers[vertical].places.length;i++)
        {
            $("#"+answers[vertical].places[i]).attr("class", "sel");
        }
    }
    tdId = inputModal(td);
    // console.log(tdId);
    return td;
}


function inputModal(td) {
    $('#transliterateTextarea').val(td.children[0].value);
    $('#transliterateTextarea').focus();
    return td.id;

}


$('#transliterateTextarea').bind('input propertychange', function() {
    console.log(this.value);
    console.log(tdId);
    $('#'+tdId+' input').val(this.value.rtrim());

});
// function closeModal(td) {
//     // $('#'+td+' input').value = $('#transliterateTextarea').val();
//     // console.log(td);
//     // console.log($('#'+td+' input').val());
//     $('#'+td+' input').val($('#transliterateTextarea').val());
//     // console.log($('#'+td )value);
//     $('#textInput').modal('hide');
//
// }

String.prototype.rtrim = function () {
    return this.replace(/((\s*\S+)*)\s*/, "$1");
}

