$("#forth").click(function() {
  console.log("here");
  // let previous_page = $('.transform-active');
  // previous_page.removeClass(".transform-active");
  // previous_page.removeClass(".transform");

  let transformed_page = $('.transform').not($('.last-active'));
  // transformed_page.insertAfter($('.last-active'));
  $('.last-active').insertBefore(transformed_page);

  if (transformed_page.prop('id') != "page-04") {
    // transformed_page.insertAfter($(".transform-previous"));

    transformed_page.toggleClass('transform-active');
    transformed_page.toggleClass("last-active");
    console.log(transformed_page.prop('id'));

    if (transformed_page.prop('id') == "page-01") {
      // transformed_page.insertBefore($(".transform-previous"));
      $('#page-02').toggleClass('transform');
      console.log("there");
    }
    if (transformed_page.prop('id') == "page-02") {
      $('#page-01').removeClass('transform-active');
      $('#page-01').removeClass('transform');
      $('#page-01').toggleClass('transform-previous');
      $('#page-01').insertBefore($('#page-02'));
      $('#page-03').toggleClass('transform');
      $('#page-01').removeClass('last-active');
      console.log("wesh");
    }

    if (transformed_page.prop('id') == "page-03") {
      $('#page-02').removeClass('transform-active');
      $('#page-02').removeClass('transform');
      $('#page-02').toggleClass('transform-previous');
      $('#page-01').insertBefore($('#page-03'));
      $('#page-02').insertBefore($('#page-03'));
      $('#page-04').toggleClass('transform');
      $('#page-01').removeClass('last-active');
      $('#page-02').removeClass('last-active');
      $('#back').insertBefore($('#page-04'));
      $('#front').insertBefore($('#page-04'));
      console.log("wesh pute");
    }
  }
});

$("#back").click(function() {
  // let transformed_page = $('.transform').eq(1);
  let test = $('.last-active');

  console.log(test);
  test.toggleClass('transform-active');
  test.toggleClass("last-active");

  if (test.prop('id') === "page-01") {
      // transformed_page.insertBefore($(".transform-previous"));
      $('#page-02').insertBefore($('#page-01'));
      $('#page-03').insertBefore($('#page-02'));
      $('#page-02').removeClass('transform');
      $('#page-02').removeClass('transform-active');
      console.log("salope");
    }
    if (test.prop('id') === "page-02") {
      $('#page-01').toggleClass('transform');
      $('#page-01').toggleClass('transform-active');
      $('#page-01').toggleClass('last-active');
      $('#page-01').removeClass('transform-previous');
      $('#page-03').insertBefore($('#page-02'));
      // $('#page-02').toggleClass('transform');
      // $('#page-01').insertAfter($('#page-02'));
      $('#page-03').removeClass('transform');
      $('#page-03').removeClass('transform-active');
      console.log("pute")
      // $('#page-03').toggleClass('show');
    }
    if (test.prop('id') === "page-03") {
      $('#page-02').toggleClass('transform');
      $('#page-02').toggleClass('transform-active');
      $('#page-02').toggleClass('last-active');
      $('#page-02').removeClass('transform-previous');
      // $('#page-02').toggleClass('transform');
      // $('#page-01').insertAfter($('#page-02'));
      $('#page-04').removeClass('transform');
      $('#page-04').removeClass('transform-active');
      console.log("putain")
      // $('#page-03').toggleClass('show');
    }
});