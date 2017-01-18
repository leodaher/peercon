$(document).ready(function () {
  var sections = $('.form-section');


  function navigateTo(index) {

    // Mark the current section with the class 'current'
    sections.removeClass('current').eq(index).addClass('current');

    sections.each(function(ind) {
      if(ind != curIndex()) {
        $(this).hide();
      } else {
        $(this).show();
      }
    });
    $('.form-navigation [type=submit]').hide();

    // Show only the navigation buttons that make sense for the current section:
    $('.form-navigation .previous').toggle(index > 0);
    var atTheEnd = index >= sections.length - 1;
    $('.form-navigation .next').toggle(!atTheEnd);
    $('.form-navigation [type=submit]').toggle(atTheEnd);
  }

  function curIndex() {
    // Return the current index by looking at which section has the class 'current'
    return sections.index(sections.filter('.current'));
  }

  // Previous button is easy, just go back
  $('.form-navigation .previous').click(function() {
    navigateTo(curIndex() - 1);
  });

  // Next button goes forward iff current block validates
  $('.form-navigation .next').click(function() {
    navigateTo(curIndex() + 1);
  });

  // Prepare sections by setting the `data-parsley-group` attribute to 'block-0', 'block-1', etc.

  navigateTo(0); // Start at the beginning
});
