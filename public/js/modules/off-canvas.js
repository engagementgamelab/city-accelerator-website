// OFF-CANVAS COMPONENT

html = $('html');
element = $('.js-off-canvas');
toggle = $('.js-off-canvas-toggle');

toggle.click(function() {
  if((element).attr('aria-hidden') == 'true') {
    element.attr('aria-hidden', 'false');
    $(html).addClass('is-scroll-locked');
    toggle.html(toggle.attr('data-expanded'));
  } else {
    element.attr('aria-hidden', 'true');
    $(html).removeClass('is-scroll-locked');
    toggle.html(toggle.attr('data-collapsed'));
  }
});

$(document).mouseup(function(e) {
  if(!element.is(e.target) && element.has(e.target).length === 0) {
    element.attr('aria-hidden', 'true');
    $(html).removeClass('is-scroll-locked');
    toggle.html(toggle.attr('data-collapsed'));
  }
});
