  body = $('body');
  container = "";
  main = "";
  views = "";
  active_view = "";
  active_step = "";
  active_sub_step = "";
  prev_view = "";
  next_view = "";

  function centerItFixedWidth(target, outer){
    var out = $('.js-tool-steps');
    var tar = $('.js-tool-active-step');
    var x = out.width();
    var y = tar.outerWidth(true);
    var z = tar.index();
    out.scrollLeft(Math.max(0, (y * z) - (x - y)/2));
    tar.focus();
  }

  function updateView(active) {
    //body.addClass((window.active_view).attr('data-theme'));
    //main.css('height', main.outerHeight() + active_view.outerHeight());
  }

  function getLastStep() {
    var highest = $('.js-tool-view').map(function() {
      return parseFloat($(this).data('step'));
    }).get().sort().pop();

    return highest;
  }

  function getLastSubStep(step) {
    var highest = $('.js-tool-view[data-step="' + step + '"]').map(function() {
      return parseFloat($(this).data('sub-step'));
    }).get().sort().pop();

    return highest;
  }

  function getPrevStep(step, sub_step) {
    var new_sub_step = 0;
    var new_step = 0;

    if(!sub_step - 1 < 1) {
      new_step = step;
      new_sub_step = sub_step - 1;
    } else {
      if(!step - 1 < 1) {
        new_step = step - 1;
        new_sub_step = getLastSubStep(step);
      } else {
        new_step = 1;
        new_sub_step = 1;
        console.log('Last');
      }
    }
    var view = $('.js-tool-view[data-step="' + new_step + '"][data-sub-step="' + new_sub_step + '"]' );
    return view;
  }

  function getNextStep(step, sub_step) {
    var new_sub_step = 0;
    var new_step = 0;

    if(!sub_step + 1 > getLastSubStep(step)) {
      new_step = step;
      new_sub_step = sub_step + 1;
    } else {
      if(!step + 1 > getLastStep()) {
        new_step = step + 1;
        new_sub_step = 1;
      } else {
        new_step = getLastStep();
        new_sub_step = getLastSubStep(new_step);
        console.log('Last');
      }
    }

    var view = $('.js-tool-view[data-step="' + new_step + '"][data-sub-step="' + new_sub_step + '"]' );
    return view;
  }

  function goPrevStep() {
    active_view = prev_view;
    prev_view = getPrevStep(active_step, active_sub_step);
    next_view = getNextStep(active_step, active_sub_step);
    updateView(); 
  }

  function goNextStep() {
    prev_view = active_view;
    active_view = next_view;
    next_view = getNextStep(active_step, active_sub_step);
    console.log(next_view);
    updateView(); 
  }

  window.onload = function() {

    container = $('.js-tool');
    main = $('.js-tool-main');
    views = $('.js-tool-view');
    active_view = $('.js-tool-view.is-active');
    active_step = active_view.data('step');
    active_sub_step = active_view.data('sub-step');
    prev_view = getPrevStep(active_view);
    next_view = getNextStep(active_view);

    container.addClass('is-loaded');

    $('.js-tool-next').click(function() {
      goNextStep();
    });

    $('.js-tool-back').click(function() {
      goPrevStep();
    });
  }