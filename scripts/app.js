$(document).ready(function() {
    
    $('.layer-panel-btn').click(function() {
        $('.layer-panel-container').toggleClass('is-active');
        $(this).toggleClass('is-active');
    });
    
    $('.info-panel-btn').click(function() {
        $(this).addClass('hidden');
        $('.info-panel-container').addClass('is-active');
    });
    
});