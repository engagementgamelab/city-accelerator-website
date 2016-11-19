  // Initial variables
  body = $('body');
  container = "";
  main = "";
  views = "";
  steps = "";
  active_theme = "";
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

  function updateMainHeight() {
    main.css('height', $('.js-tool-view.is-active').outerHeight());
  }

  function updateView() {
    var data = active_view.split('.');
    var step = data[0];
    var sub_step = data[1];

    updateMainHeight();

    if (body.hasClass(active_theme)) {
      body.removeClass(active_theme);
    }

    active_theme = $('.js-tool-step').eq(step).attr('data-theme');
    body.addClass(active_theme);

    updateProgress();

    transitionOut($('.js-tool-view.is-active'));
    transitionIn($('.js-tool-step').eq(step).find('.js-tool-view').eq(sub_step));
  }

  function goPrevStep() {
    var data = active_view.split('.');
    var step = data[0];
    var sub_step = data[1];

    if($('.js-tool-step').eq(step).find('.js-tool-view').eq(+sub_step - +1).length && (+sub_step - +1 !== -1)) {
      sub_step = +sub_step - +1;
      console.log('First');
    } else if($('.js-tool-step').eq(+step - +1).length && (+step - +1 !== -1)) {
      step = +step - +1;
      sub_step = $('.js-tool-step').eq(step).find('.js-tool-view').last().index();
      console.log('Second');
    } else {
      return false;
    }

    active_view = step + '.' + sub_step;
    updateView();
  }

  function goNextStep() {
    var data = active_view.split('.');
    var step = data[0];
    var sub_step = data[1];

    if($('.js-tool-step').eq(step).find('.js-tool-view').eq(+sub_step + +1).length) {
      sub_step = +sub_step + +1;
      console.log('First ' + sub_step);
    } else if($('.js-tool-step').eq(+step + +1).length) {
      step = +step + +1;
      sub_step = 0;
      console.log('Second ' + step);
    } else {
      console.log('Third ' + step + '.' + sub_step);
      return false;
    }

    active_view = step + '.' + sub_step;
    updateView();
  }


  function addCardBreadcrumbs() {
    $(views).each(function() {
      var step = $(this).closest('.js-tool-step').index();
      var sub_step = $(this).index();
      var max_sub_steps = $(this).closest('.js-tool-step').find('.js-tool-view').last().index();

      var title = $(this).closest('.js-tool-step').attr('data-step-name');
      var text = title + " — " + sub_step + " of " + max_sub_steps;

      if($(this).find('.js-breadcrumb').length) {
        $(this).find('.js-breadcrumb').html(text);
      }
    });
  }

  function createGrid() {

    $(views).each(function() {
      var step = $(this).closest('.js-tool-step').index();
      var sub_step = $(this).index();

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

    $('.js-tool-step').each(function() {
      var step = $(this).index();
      var title = $(this).attr('data-step-name');
      var new_block = "";

      if($(this).attr('data-grid-include') !== 'false') {
        var new_block = template.clone().removeClass('js-tool-grid-template').attr('data-linked-step', step);
        new_block.find('.js-tool-grid-block-title').html(title);

        var theme = $(this).attr('data-theme');
        new_block.addClass(theme);

        $(this).find('.js-tool-view').each(function() {
          var new_item = "";

          if($(this).attr('data-grid-include') !== 'false') {
            new_item = item_template.clone().removeClass('js-tool-grid-template');
            var sub_step_mini = $(this).find('.js-tool-view-mini .js-tool-card');
            sub_step_mini.appendTo(new_item);
            new_item.appendTo(new_block.find('.js-tool-grid-item-container'));
          }

        });

        new_block.appendTo('.js-tool-grid');
      }

    });

    $('.js-tool-grid-template').remove();

  }


  function createNav() {

    var item_template = $('.js-tool-nav-item.js-tool-nav-template');

    $('.js-tool-step').each(function() {
      if($(this).attr('data-nav-include') !== "false") {
        var name = $(this).attr('data-step-name');
        var new_item = item_template.clone().removeClass('js-tool-nav-template').attr('data-linked-step', $(this).index());

        new_item.find('.js-tool-nav-title').html(name);
        new_item.appendTo('.js-tool-nav-list');
      }
    });

    $('.js-tool-nav-template').remove();
  }

  function updateProgress() {
    var data = active_view.split('.');
    var step = data[0];
    var sub_step = data[1];
    var max_sub_steps = $('.js-tool-step').eq(step).find('.js-tool-view').last().index();
    var nav_item = $('.js-tool-nav-item[data-linked-step="' + step + '"]');

    // If there's an actual nav item linked to this step
    if(nav_item.length) {
      $('.js-tool-nav-item').not(nav_item).removeClass('is-active');
      nav_item.addClass('is-active');
      var first_offset = $('.js-tool-nav-item').eq(0).find('.js-tool-nav-point').offset().left;
      var active_offset_left = nav_item.find('.js-tool-nav-point').offset().left;
      var new_width = 0;
      console.log(+step+ +1);
      if($('.js-tool-nav-item[data-linked-step="' + (+step + 1) + '"]').length) {
        console.log('There is next');
        var next_offset = $('.js-tool-nav-item[data-linked-step="' + +step +1 + '"]').find('.js-tool-nav-point').offset().left
        new_width = (active_offset_left - first_offset) + (((next_offset - active_offset)/max_sub_steps) * sub_step);
      } else {
        console.log('There is no next');
        new_width = (active_offset_left - first_offset);
      }

      $('.js-tool-progress').velocity({ width: new_width });

    } else {
      $('.js-tool-nav-item').not(nav_item).removeClass('is-active');      
    }
  }

  function updateGrid() {
    var printable_length = print_array.length;
    $('.js-tool-grid .js-tool-card').addClass('is-disabled');

    for (i = 0; i < printable_length; i++) {
      var data = print_array[i].split('.');
      var step = data[0];
      var sub_step = data[1];
      $('.js-tool-grid .js-tool-card[data-linked-step="' + step + '"][data-linked-sub-step="' + sub_step + '"]').removeClass('is-disabled');
    }
  }

// Mother function. Initializes everything else
  window.onload = function() {

    // ideally, we should do this withn Handlebars
    if(!body.hasClass('s-tool')) {
      body.addClass('s-tool js-tool');
    }

    container = $('.js-tool');
    main = $('.js-tool-main');
    steps = $('.js-tool-step');
    views = $('.js-tool-view');

    // Set the active view
    active_view = "0.0";

    // Create the initial grid of cards
    createGrid();

    // Create navigation
    createNav();

    // Add breadcrumbs (Step x of x) to cards

    addCardBreadcrumbs();

    // Initial state for velocity
    transitionOut(views.not(active_view));

    // Update our view to reflect the initial state
    updateView();

    // Remove the loading screen
    container.addClass('is-loaded');
  }

    /*

    assignStepPercentages();

    addCardBreadcrumbs();

    createGrid();

    transitionOut(views.not(active_view));
    updateView();

    // Keyboard Binding
    $("body").keydown(function(e) {
      if(e.keyCode == 37) { // left
        goPrevStep();
      }
    });
    */


    $('.js-tool-next').click(function() {
      goNextStep();
    });

    $('.js-tool-back').click(function() {
      goPrevStep();
    });

    $('.js-tool-no').click(function() {
      addToPrintable(active_view);
      updateGrid();
      goNextStep();
    });

    $('.js-tool-yes').click(function() {
      removeFromPrintable(active_view);
      updateGrid();
      goNextStep();
    });

    $('.js-tool-more').click(function() {
      var parent_view = $(this).closest('[data-linked-step]');
      var parent_sub_step = $(this).closest('[data-linked-sub-step]');
      var modal = $('.js-tool-modal[data-linked-step="' + parent_step + '"][data-linked-sub-step="' + parent_sub_step + '"]');
      modal.addClass('is-active').addClass('js-tool-printable');
      $('html').addClass('is-modal-active');
    })

    $('.js-tool-modal-close').click(function() {
      $('html').removeClass('is-modal-active');
      $('.js-tool-modal').removeClass('is-active').removeClass('js-tool-printable');
    });

    $('.js-tool-print').click(function() {
      window.print();
    });

    $(window).on('resize', function() {
      updateMainHeight();
      updateProgress();
    });