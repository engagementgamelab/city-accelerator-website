  // TOOLKIT JS

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
    print_array = print_array.sort(function(a, b){return a > b});
  }

  function removeFromPrintable(object) {
    if($.inArray(object, print_array) > -1) {
      print_array.splice($.inArray(object, print_array), 1);
    }
    print_array = print_array.sort(function(a, b){return a > b});
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
    // Update main height, and give spacing for the box shadow not to be cropped out
    // Not cheap to animate. Experimental
    //main.velocity({ height: 64 + $('.js-tool-view.is-active').outerHeight()});
    main.css('height', 64 + + $('.js-tool-view.is-active').outerHeight());
  }

  function updateView() {
    var data = active_view.split('.');
    var last_step = $('.js-tool-nav-item').last().attr('data-linked-step');
    var step = data[0];
    var sub_step = data[1];

    // Hide the back button if it's the first view
    if(step == 0 && sub_step == 0) {
      $('.js-tool-back').removeClass('is-active');
    } else {
      $('.js-tool-back').addClass('is-active');
    }

    // Enable / Disable print MVP button, Footer, and Step Navigation on last step
    if(step == last_step) {
      $('footer').removeClass('hidden-el');
      $('.js-tool-nav').addClass('hidden-el');
      $('.js-tool-back').addClass('hidden-el');
      $('.s-tool__sidebar').removeClass('hidden-el');
      $('.js-tool-print-mvp').addClass('is-active');
    } else {
      $('.js-tool-back').removeClass('hidden-el');
      $('.js-tool-nav').removeClass('hidden-el');
      $('footer').addClass('hidden-el');
      $('.s-tool__sidebar').addClass('hidden-el');
      $('.js-tool-print-mvp').removeClass('is-active');
    }

    // Update theme according to step
    if (body.hasClass(active_theme)) {
      body.removeClass(active_theme);
    }

    active_theme = $('.js-tool-step').eq(step).attr('data-theme');
    body.addClass(active_theme);

    // Update the progress bar
    updateProgress();

    // Remove old view, get the new one in
    transitionOut($('.js-tool-view.is-active'));
    transitionIn($('.js-tool-step').eq(step).find('.js-tool-view').eq(sub_step));

    // Make container reflect card height
    updateMainHeight();
  }

  function goPrevStep() {
    var data = active_view.split('.');
    var step = data[0];
    var sub_step = data[1];

    if($('.js-tool-step').eq(step).find('.js-tool-view').eq(+sub_step - +1).length && (+sub_step - +1 !== -1)) {
      sub_step = +sub_step - +1;
    } else if($('.js-tool-step').eq(+step - +1).length && (+step - +1 !== -1)) {
      step = +step - +1;
      sub_step = $('.js-tool-step').eq(step).find('.js-tool-view').last().index();
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
    } else if($('.js-tool-step').eq(+step + +1).length) {
      step = +step + +1;
      sub_step = 0;
    } else {
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

      var theme = $(this).closest('.js-tool-step').attr('data-theme');
      var mini = $(this).find('.js-tool-view-mini .js-tool-card');
      var modal = $(this).find('.js-tool-view-contents .js-tool-modal');

      mini.attr('data-linked-step', step);
      mini.attr('data-linked-sub-step', sub_step);

      modal.attr('data-linked-step', step);
      modal.attr('data-linked-sub-step', sub_step);
      modal.addClass(theme);

      // Send modals to the end of body
      modal.appendTo('body');
    });

    var template = $('.js-tool-grid-block');
    var item_template = $('.js-tool-grid-item');

    $('.js-tool-step').each(function() {
      var step = $(this).index();
      var title = $(this).attr('data-step-name');
      var text = $(this).attr('data-step-text');
      var new_block = "";

      if($(this).attr('data-grid-include') !== 'false') {
        var new_block = template.clone().removeClass('js-tool-grid-template').attr('data-linked-step', step);
        new_block.find('.js-tool-grid-block-title').html(title);
        new_block.find('.js-tool-grid-block-text').html(text);

        var theme = $(this).attr('data-theme');
        new_block.addClass(theme);

        $(this).find('.js-tool-view').each(function() {
          var new_item = "";

          if($(this).attr('data-grid-include') !== 'false') {
            new_item = item_template.clone().removeClass('js-tool-grid-template');
            var sub_step_mini = $(this).find('.js-tool-view-mini .js-tool-card');
            sub_step_mini.css('cursor', 'pointer').appendTo(new_item);
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
    var max_sub_steps = $('.js-tool-step').eq(step).find('.js-tool-view').last().index() + 1;
    var nav_item = $('.js-tool-nav-item[data-linked-step="' + step + '"]');

    // If there's an actual nav item linked to this step
    if(nav_item.length) {
      $('.js-tool-nav-item').not(nav_item).removeClass('is-active');
      nav_item.addClass('is-active');
      var first_offset = $('.js-tool-nav-item').eq(0).find('.js-tool-nav-point').offset().left;
      var active_offset_left = nav_item.find('.js-tool-nav-point').offset().left;
      var new_width = 0;
      if($('.js-tool-nav-item[data-linked-step="' + (+step + 1) + '"]').length) {
        var next_offset = $('.js-tool-nav-item[data-linked-step="' + (+step + 1) + '"]').find('.js-tool-nav-point').offset().left
        new_width = (active_offset_left - first_offset) + (((next_offset - active_offset_left)/max_sub_steps) * sub_step);
      } else {
        new_width = (active_offset_left - first_offset);
      }

      $('.js-tool-progress').velocity({ width: new_width });

      // Mark past steps

      $('.js-tool-nav-item').each(function() {
        if($(this).attr('data-linked-step') >= step) {
          $(this).removeClass('is-past');
        } else {
          $(this).addClass('is-past');
        }
      });

    } else {
      $('.js-tool-nav-item').not(nav_item).removeClass('is-active');
    }
  }

  // Update score
  // 1. Make it so that it never comes round to 100s, which would show an empty chart
  function updateScore() {
    var max = $('.js-tool-question-card').length;
    var no = $(print_array).size();
    var yes = max - no;
    var percentage = (yes * 100 / max) - 0.001; // [1]
    var title = "";
    var description = "";
    $('.js-tool-score').css("animation-delay", "-" + percentage + "s");

    if(no >= 10) {
      title = "Knowledgeable Novice";
      description = "Perhaps you understand the value of engagement but don’t know where to start or how to put all of the pieces of together. Review the suggested activities to create a thoughtful public engagement plan.";
    } else if (no >= 5) {
      title = "Prepared Practitioner";
      description = "You’re not starting from scratch, however, you also may not have considered several key engagement planning components. Taking into account the suggested activities could help you prepare a more robust public engagement plan to share with multiple stakeholders.";
    } else {
      title = "Certified Public Engager";
      description = "Congratulations! You’re on your way to a transparent, inclusive, and creative public engagement process. The suggested activities will help assure that you’re taking extra measures for a meaningful engagement process.";
    }

    $('.js-tool-score-title').html(title);
    $('.js-tool-score-description').html(description);
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

  function updateSidebar() {
    var sidebar_html = "";
    if($('.js-tool-grid-item').length) {
      console.log($('.js-tool-grid-item').length + "is the length");
      $('.js-tool-grid-block').each(function() {
        var block_title = $(this).find('.js-tool-grid-block-title').html();
        var items = $(this).find('.js-tool-grid-item .js-tool-card:not(.is-disabled)');

        if(items.length) {
          $('.js-tool-sidebar-empty').attr('aria-hidden', 'true');
          sidebar_html = sidebar_html + '<h4 class="c-off-canvas__sub-title"><p class="c-off-canvas__link">' + block_title + '</p></h4>';
          $(items).each(function() {
            var item_title = $(this).find('.js-tool-card-title').html();
            sidebar_html = sidebar_html + '<p class="c-off-canvas__link">' + item_title + '</p>';
          });
        }
      });

      $('.js-tool-sidebar-content').empty().html(sidebar_html);
    } else {
      $('.js-tool-sidebar-empty').attr('aria-hidden', 'false');
    }
  }

  //This function will check if the current page has the query param of 'step' & call the modal
  //or a param of grid and show the MVP grid directly

  function checkParam() {

    var requestedStep = getParameterByName('step');

    if(requestedStep !== "") {

      // If user is asking for the MVP Grid
      if(requestedStep == "grid") {

        active_view = $('.js-tool-step:last-child').index() + '.0';
        $('.js-tool-back').remove();
        $('.js-tool-steps-container').remove();
        updateView();
        updateSidebar();
        $('.js-tool-print-mvp').addClass('is-active');

      // If user is asking for an activity modal
      } else {

        // Make Grid an active view anyway
        active_view = $('.js-tool-step:last-child').index() + '.0';
        $('.js-tool-back').remove();
        $('.js-tool-steps-container').remove();
        updateView();
        updateSidebar();
        $('.js-tool-print-mvp').addClass('is-active');

        // Then proceed to fire up the modal
        var data = requestedStep.split('.');
        var step = data[0];
        var sub_step = data[1];
        modal = $('.js-tool-modal[data-linked-step="' + step + '"][data-linked-sub-step="' + sub_step + '"]');

        if(modal.length) {

          // Check if the document is loaded before loading the modal
          var readyStateCheckInterval = setInterval(function() {
            if (document.readyState === "complete") {
              clearInterval(readyStateCheckInterval);
              $('.js-tool-printable').removeClass('js-tool-printable');
              modal.addClass('is-active').addClass('js-tool-printable');
              $('html').addClass('is-modal-active');
            }
          }, 10);
        } else {
          $('html').removeClass('is-modal-active');
          $('.js-tool-modal').removeClass('is-active').removeClass('js-tool-printable');
        }
      }

    } else {
      window.history.pushState('City Accelerator Toolkit', 'City Accelerator Toolkit', location.pathname);
      $('html').removeClass('is-modal-active');
      $('.js-tool-modal').removeClass('is-active').removeClass('js-tool-printable');
    }


  }


  //get URL query params
  function getParameterByName(name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\#&]" + name + "=([^&#]*)"),
          results = regex.exec(location.hash);
      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  function copyUrl() {
    var temp = $("<input>");
    $("body").append(temp);
    temp.val(location.href).select();
    document.execCommand("copy");
    temp.remove();
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

    $.when(updateView(), checkParam()).done(function() {
      // Remove the loading screen
      container.addClass('is-loaded');
    });

    $('.js-tool-next').click(function() {
      goNextStep();

    });

    $('.js-tool-back').click(function() {
      goPrevStep();
    });

    $('.js-tool-no').click(function() {
      addToPrintable(active_view);
      updateScore();
      updateGrid();
      updateSidebar();
      goNextStep();
    });

    $('.js-tool-yes').click(function() {
      removeFromPrintable(active_view);
      updateScore();
      updateGrid();
      updateSidebar();
      goNextStep();
    });

    $('.js-tool-more').click(function(event) {
      event.stopPropagation();
      parent_step = $(this).closest('.js-tool-card').attr('data-linked-step');
      parent_sub_step = $(this).closest('.js-tool-card').attr('data-linked-sub-step');
      // console.log(parent_step);
      // console.log(parent_sub_step);
      modal = $('.js-tool-modal[data-linked-step="' + parent_step + '"][data-linked-sub-step="' + parent_sub_step + '"]');
      $('.js-tool-printable').removeClass('js-tool-printable');
      modal.addClass('is-active').addClass('js-tool-printable');
      $('html').addClass('is-modal-active');
      window.history.pushState('City Accelerator Toolkit', 'City Accelerator Toolkit', location.pathname + "#step=" + parent_step + '.' + parent_sub_step);
    });

    $('.js-tool-modal-close').click(function() {
      window.history.pushState('City Accelerator Toolkit', 'City Accelerator Toolkit', location.pathname);
      $('html').removeClass('is-modal-active');
      $('.js-tool-modal').removeClass('is-active').removeClass('js-tool-printable');
    });

    window.onhashchange = function() {
      checkParam();
    }

    $('.js-tool-share').click(function() {
      $.when(copyUrl()).done(function() {
        acknowledge('A link to this activity has been copied to your clipboard');
      });
    });

    $('.js-tool-print').click(function() {
      window.print();
    });

    $('.js-tool-print-mvp').click(function() {

      // Remove the printable class from other elements like modals
      $('.js-tool-printable').removeClass('js-tool-printable');

      // Add the printable class to the MVP area & empty it
      $('.js-tool-mvp').addClass('js-tool-printable').empty();

      // Grab the selected items and move them into the printable area
      $('.js-tool-grid .js-tool-card:not(.is-disabled)').each(function() {
        step = $(this).attr('data-linked-step');
        sub_step = $(this).attr('data-linked-sub-step');
        var new_block = $('.js-tool-modal[data-linked-step="' + step + '"][data-linked-sub-step="' + sub_step + '"]').clone();
        new_block.removeClass().addClass('js-tool-mvp-block s-tool__mvp__block').appendTo('.js-tool-mvp');
      });

      window.print();
    })

    $('.js-tool-grid .js-tool-card').click(function(event) {
      event.stopPropagation();
      var step = $(this).attr('data-linked-step');
      var sub_step = $(this).attr('data-linked-sub-step');
      var view = step + "." + sub_step;

      if($(this).hasClass('is-disabled')) {
        $(this).removeClass('is-disabled');
        addToPrintable(view);
      } else {
        $(this).addClass('is-disabled');
        removeFromPrintable(view);
      }

      updateSidebar();
    });

    $(window).on('resize', function() {
      updateMainHeight();
      updateProgress();
    });

    if (window.location.hash === '#step=grid') {
      $('footer').removeClass('hidden-el');

      $('.s-tool__sidebar').removeClass('hidden-el');

    }

  }
