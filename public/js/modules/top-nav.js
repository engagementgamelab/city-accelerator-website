toggle = $('.js-top-nav-toggle');
menu = $('.js-top-nav-menu');
html = $('html');

toggle.click(function() {
  if($(this).attr('aria-expanded') == 'false') {
    $(this).attr('aria-expanded', 'true');
    menu.attr('aria-hidden', 'false');
    html.addClass('is-scroll-locked');
  } else {
    $(this).attr('aria-expanded', 'false');
    menu.attr('aria-hidden', 'true');
    html.removeClass('is-scroll-locked');
  }
});