// ACKNOWLEDGE
// UI Component meant to let the user know that the action they
// just invoked has been completed.
//
// Basic Usage:
// $('button').click(function() {
//  acknowledge('Your action has been performed');
// });

function acknowledge(message) {
  if(!$('.js-acknowledge').length) {
    var body = $('body');
    var html = $(document.createElement('div')).addClass("c-acknowledge js-acknowledge").attr('aria-hidden', 'true').html(message);
    $.when(html.appendTo(body)).done(function() {
      $('.js-acknowledge').attr('aria-hidden', 'false');
      setTimeout(function(){
        $('.js-acknowledge').attr('aria-hidden', 'true').remove();
      }, 2000);
    });
  }
}