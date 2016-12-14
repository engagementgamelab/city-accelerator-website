// OFF-CANVAS COMPONENT

html = $('html');
element = $('.js-off-canvas');
trigger = $('.js-off-canvas-trigger');

trigger.click(function() {
  if((element).attr('aria-hidden') == 'true') {
    element.attr('aria-hidden', 'false');
    $(html).addClass('is-scroll-locked');
  } else {
    element.attr('aria-hidden', 'true');
    $(html).removeClass('is-scroll-locked');
  }
});

$(document).mouseup(function(e) {
  if(!element.is(e.target) && element.has(e.target).length === 0) {
    element.attr('aria-hidden', 'true');
    $(html).removeClass('is-scroll-locked');
  }
});