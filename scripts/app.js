$(document).ready(function() {
    
    $('.layer-panel-btn').click(function() {
        $('.layer-panel-container').toggleClass('is-active');
        $(this).toggleClass('is-active');
    });
    
    $('.info-panel-btn').click(function() {
        $(this).addClass('hidden');
        $('.info-panel-container').addClass('is-active');
    });
    
    $('.close-btn').click(function() {
        $('.info-panel-container').removeClass('is-active');
        $('.info-panel-btn').removeClass('hidden');
    });
    
    $(".layer-li").click(function() {
        $('.is-active').removeClass('is-active');
        $(this).addClass('is-active');
    });
    
    $('.user-confirm').click(function() {
        $(this).parent().addClass('hidden');
    });
});