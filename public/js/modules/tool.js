  // Initial variables
  body = $('body');
  container = "";
  main = "";
  views = "";
  active_view = "";
  active_step = "";
  active_sub_step = "";
  active_theme = "";
  prev_view = "";
  next_view = "";
  first_view = true;
  print_array = [];
  transition_in_props = {
    opacity: '1',
    translateX: '0',
  };
  transition_out_props = {
    opacity: '0',
    translateX: '-200%',
  };






  function updateProgress() {
    var amount = $(views).last().index() + 1;
    var current = active_view.index() + 1;
    var percentage = (current * 100 / amount) + '%';
    //var percentage = (current * 100 / amount) / 100;
    //var new_width = $('.js-tool-steps-list').outerWidth() * percentage;
    $('.js-tool-progress').velocity({ width: percentage });
  }

  function addToPrintable(object) {
    if($.inArray(object, print_array) == -1) {
      print_array.push(object);
    }
    print_array = print_array.sort((a, b) => a - b);
  }

  function removeFromPrintable(object) {
    if($.inArray(object, print_array) > -1) {
      print_array.splice($.inArray(object, print_array), 1);
    }
    print_array = print_array.sort((a, b) => a - b);
  }

  function transitionIn(object) {
    object.addClass('is-active');
    object.velocity(transition_in_props);
  }

  function transitionOut(object) {
    object.removeClass('is-active');
    object.velocity(transition_out_props);
  }

  function updateView() {

    active_step = active_view.data('step');
    active_sub_step = active_view.data('sub-step');

    var old_step = $('.js-tool-view.is-active').data('step');
    var old_sub_step = $('.js-tool-view.is-active').data('sub-step');

    if(old_step == active_step && old_sub_step == active_sub_step && first_view == false) {
      return false;
    }

    // Update Theme
    if (body.hasClass(active_theme)) {
      body.removeClass(active_theme);
    }
    active_theme = active_view.data('theme');
    body.addClass(active_theme);

    // Change View
    transitionOut($('.js-tool-view.is-active'));
    transitionIn(active_view);

    updateProgress();

    first_view = false;
    //body.addClass((window.active_view).attr('data-theme'));
    //main.css('height', main.outerHeight() + active_view.outerHeight());
  }

  function enablePrev() {
    $('.js-tool-back').removeClass('is-disabled');
  }

  function disablePrev() {
    $('.js-tool-back').addClass('is-disabled');
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

    console.log(step - 1);

    if(sub_step - 1 >= 1) {
      new_step = step;
      new_sub_step = sub_step - 1;
    } else {
      if(step - 1 >= 1) {
        new_step = step - 1;
        new_sub_step = getLastSubStep(new_step);
      } else {
        new_step = 1;
        new_sub_step = 1;
      }
    }
    var view = $('.js-tool-view[data-step="' + new_step + '"][data-sub-step="' + new_sub_step + '"]' );
    return view;
  }

  function getNextStep(step, sub_step) {
    var new_sub_step = 0;
    var new_step = 0;

    if(sub_step + 1 <= getLastSubStep(step)) {
      new_step = step;
      new_sub_step = sub_step + 1;
    } else {
      if(step + 1 <= getLastStep()) {
        new_step = step + 1;
        new_sub_step = 1;
      } else {
        new_step = getLastStep();
        new_sub_step = getLastSubStep(new_step);
      }
    }

    var view = $('.js-tool-view[data-step="' + new_step + '"][data-sub-step="' + new_sub_step + '"]' );
    return view;
  }

  function goPrevStep() {
    active_view = $(getPrevStep(active_step, active_sub_step));
    updateView();
  }

  function goNextStep() {
    active_view = $(getNextStep(active_step, active_sub_step));
    updateView();
  }

  function addCardBreadcrumbs() {
    $(views).each(function() {
      var step = $(this).data('step');
      var sub_step = $(this).data('sub-step');
      var max_sub_steps = getLastSubStep(step);
      var title = $('.js-tool-steps').find('[data-step="'+step+'"]').children('.js-tool-step-title').html();
      var text = title + " — " + sub_step + " of " + max_sub_steps;
      $(this).find('.js-breadcrumb').html(text);
    });
  }


// This function iterates through every step and sub step,
// and creates a grid with mini-cards linked to their corresponding
// modals.

  function createGrid() {
    $(views).each(function() {
      var step = $(this).data('step');
      var sub_step = $(this).data('sub-step');
      var mini = $(this).find('.js-tool-view-mini .js-tool-card');
      var modal = $(this).find('.js-tool-view-contents .js-tool-modal');

      mini.attr('data-linked-step', step);
      mini.attr('data-linked-sub-step', sub_step);

      modal.attr('data-linked-step', step);
      modal.attr('data-linked-sub-step', sub_step);

      // Send modals to the end of body
      modal.appendTo('body');
    });

    var template = $('.js-tool-grid-block');
    var item_template = $('.js-tool-grid-item');

    // Iterate through every step except the last
    for (i = 1; i < getLastStep(); i++) {
      var step = i;
      var title = $('.js-tool-steps').find('[data-step="'+step+'"]').children('.js-tool-step-title').html();
      // Set block title
      var new_block = template.clone().removeClass('js-template');
      new_block.find('.js-tool-grid-block-title').html(title);

      // Set theme based on first sub step
      var theme = $('.js-tool-view[data-step="'+step+'"]').first().data('theme');
      new_block.addClass(theme);

      // Iterate through every sub-step
      for(x = 0; x < getLastSubStep(step); x++) {
        var new_item = item_template.clone().removeClass('js-template');
        var sub_step = x + 1;
        var sub_step_mini = $('.js-tool-view-mini .js-tool-card[data-linked-step="' + step + '"][data-linked-sub-step="' + sub_step + '"]');
        sub_step_mini.appendTo(new_item);
        new_item.appendTo(new_block.find('.js-tool-grid-item-container'));
      }
      new_block.appendTo('.js-tool-grid');
    }

    $('.js-template').remove();
  }





// Mother function. Initializes everything else
  window.onload = function() {

    // ideally, we should do this withn Handlebars
    if(!body.hasClass('s-tool')) {
      body.addClass('s-tool js-tool');
    }

    container = $('.js-tool');
    main = $('.js-tool-main');
    views = $('.js-tool-view');
    active_view = $('.js-tool-view.is-active');
    active_step = active_view.data('step');
    active_sub_step = active_view.data('sub-step');
    active_theme = active_view.data('theme');

    addCardBreadcrumbs();

    createGrid();

    container.addClass('is-loaded');

    transitionOut(views.not(active_view));
    updateView();

    // Keyboard Binding
    $("body").keydown(function(e) {
      if(e.keyCode == 37) { // left
        goPrevStep();
      }
    });

    $('.js-tool-next').click(function() {
      goNextStep();
    });

    $('.js-tool-back').click(function() {
      goPrevStep();
    });

    $('.js-tool-no').click(function() {
      var number = active_step + '.' + active_sub_step;
      addToPrintable(number);
      goNextStep();
    });

    $('.js-tool-yes').click(function() {
      var number = active_step + '.' + active_sub_step;
      removeFromPrintable(number);
      goNextStep();
    });

    $('.js-tool-more').click(function() {
      var parent_view = $(this).closest('[data-linked-step]');
      var parent_step = parent_view.data('linked-step');
      var parent_sub_step = parent_view.data('linked-sub-step');
      var modal = $('.js-tool-modal[data-linked-step="' + parent_step + '"][data-linked-sub-step="' + parent_sub_step + '"]');
      modal.addClass('is-active');
      $('html').addClass('is-modal-active');
    })

    $('.js-modal-close').click(function() {
      $('html').removeClass('is-modal-active');
      $('.js-tool-modal').removeClass('is-active');
    });
  }