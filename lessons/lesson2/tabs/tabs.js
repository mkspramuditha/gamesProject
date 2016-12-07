function openCity(evt, tab_index) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tab_index).style.display = "block";
    evt.currentTarget.className += " active";
}


$(function() {
    resize_tab()
    
    $('.tablinks').first().addClass('active')
    $('.tabcontent').first().show()
    
})
$(window).on('resize', resize_tab)




function resize_tab() {
    var window_height = $(window).height()
    $('.tabcontent').height(window_height - 110)
  
        
}

