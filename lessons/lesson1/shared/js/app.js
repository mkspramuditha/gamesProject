$(function() {
    resize_all()
})
$(window).on('resize', resize_all)




function resize_all() {
    desktop_mod()
    if ($(window).width() < 768) {
        $('.container-div').css('height', 'auto')
        $('.content-row').css('height', 'auto')
        $('.col-left > div').css('height', 'auto')

    } else {

        desktop_mod();
    }


}

function desktop_mod() {
    var window_height = $(window).height()
    $('.container-div').css('min-height',(window_height - 50)+'px')
        //------------------
    var tot_height = $('.container-div').height()
    var header_height = $('.header-row').height()
    //$('.content-row').height(tot_height - header_height - 25)
   // $('.col-left > div').height(tot_height - header_height - 25)
    $('.iframe-row').height(tot_height - header_height - 25 )
}