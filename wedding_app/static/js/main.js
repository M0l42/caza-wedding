// $("#forth").click(function() {
//   console.log("here");
//   // let previous_page = $('.transform-active');
//   // previous_page.removeClass(".transform-active");
//   // previous_page.removeClass(".transform");
//
//   let transformed_page = $('.transform').not($('.last-active'));
//   // transformed_page.insertAfter($('.last-active'));
//   $('.last-active').insertBefore(transformed_page);
//
//   if (transformed_page.prop('id') != "page-04") {
//     // transformed_page.insertAfter($(".transform-previous"));
//
//     transformed_page.toggleClass('transform-active');
//     transformed_page.toggleClass("last-active");
//     console.log(transformed_page.prop('id'));
//
//     if (transformed_page.prop('id') == "page-01") {
//       // transformed_page.insertBefore($(".transform-previous"));
//       $('#page-02').toggleClass('transform');
//       console.log("there");
//     }
//     if (transformed_page.prop('id') == "page-02") {
//       $('#page-01').removeClass('transform-active');
//       $('#page-01').removeClass('transform');
//       $('#page-01').toggleClass('transform-previous');
//       $('#page-01').insertBefore($('#page-02'));
//       $('#page-03').toggleClass('transform');
//       $('#page-01').removeClass('last-active');
//       console.log("wesh");
//     }
//
//     if (transformed_page.prop('id') == "page-03") {
//       $('#page-02').removeClass('transform-active');
//       $('#page-02').removeClass('transform');
//       $('#page-02').toggleClass('transform-previous');
//       $('#page-01').insertBefore($('#page-03'));
//       $('#page-02').insertBefore($('#page-03'));
//       $('#page-04').toggleClass('transform');
//       $('#page-01').removeClass('last-active');
//       $('#page-02').removeClass('last-active');
//       $('#back').insertBefore($('#page-04'));
//       $('#front').insertBefore($('#page-04'));
//       console.log("wesh pute");
//     }
//   }
// });
//
// $("#back").click(function() {
//   // let transformed_page = $('.transform').eq(1);
//   let test = $('.last-active');
//
//   console.log(test);
//   test.toggleClass('transform-active');
//   test.toggleClass("last-active");
//
//   if (test.prop('id') === "page-01") {
//       // transformed_page.insertBefore($(".transform-previous"));
//       $('#page-02').insertBefore($('#page-01'));
//       $('#page-03').insertBefore($('#page-02'));
//       $('#page-02').removeClass('transform');
//       $('#page-02').removeClass('transform-active');
//       console.log("salope");
//     }
//     if (test.prop('id') === "page-02") {
//       $('#page-01').toggleClass('transform');
//       $('#page-01').toggleClass('transform-active');
//       $('#page-01').toggleClass('last-active');
//       $('#page-01').removeClass('transform-previous');
//       $('#page-03').insertBefore($('#page-02'));
//       // $('#page-02').toggleClass('transform');
//       // $('#page-01').insertAfter($('#page-02'));
//       $('#page-03').removeClass('transform');
//       $('#page-03').removeClass('transform-active');
//       console.log("pute")
//       // $('#page-03').toggleClass('show');
//     }
//     if (test.prop('id') === "page-03") {
//       $('#page-02').toggleClass('transform');
//       $('#page-02').toggleClass('transform-active');
//       $('#page-02').toggleClass('last-active');
//       $('#page-02').removeClass('transform-previous');
//       // $('#page-02').toggleClass('transform');
//       // $('#page-01').insertAfter($('#page-02'));
//       $('#page-04').removeClass('transform');
//       $('#page-04').removeClass('transform-active');
//       console.log("putain")
//       // $('#page-03').toggleClass('show');
//     }
// });

$(".click-swipe").swipe(function(direction) {
    // your handler code
    // event.preventDefault();
    // Trigger the button element with a click
  // console.log("putes");

  if(direction==="left"){
    let transformed_page = $('.transform').not($('.last-active'));
  // transformed_page.insertAfter($('.last-active'));
  $('.last-active').insertBefore(transformed_page);

  if (!transformed_page.hasClass("last-page")) {
    console.log("not last page");
    // transformed_page.insertAfter($(".transform-previous"));

    transformed_page.toggleClass('transform-active');
    transformed_page.toggleClass("last-active");
    console.log(transformed_page.prop('id'));

    if (transformed_page.prop('id') == "page-01") {
      // transformed_page.insertBefore($(".transform-previous"));
      $('#page-02').toggleClass('transform');
      console.log("page 1");
    }
    if (transformed_page.prop('id') == "page-02") {
      $('#page-01').removeClass('transform-active');
      $('#page-01').removeClass('transform');
      $('#page-01').toggleClass('transform-previous');
      $('#page-01').insertBefore($('#page-02'));
      $('#page-03').toggleClass('transform');
      $('#page-01').removeClass('last-active');
      console.log("page 2");
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

      if($('#page-04').hasClass("confirmation-page")){
        $(".click-swipe").insertBefore($('#page-04'));
      }
      console.log("page 3");
    }

    if (transformed_page.prop('id') == "page-04") {
      $('#page-03').removeClass('transform-active');
      $('#page-03').removeClass('transform');
      $('#page-03').toggleClass('transform-previous');
      $('#page-01').insertBefore($('#page-04'));
      $('#page-02').insertBefore($('#page-04'));
      $('#page-03').insertBefore($('#page-04'));
      $('#page-05').toggleClass('transform');
      $('#page-01').removeClass('last-active');
      $('#page-02').removeClass('last-active');
      $('#page-03').removeClass('last-active');
      console.log("page 4");
    }

    if (transformed_page.prop('id') == "page-05") {
      $('#page-04').removeClass('transform-active');
      $('#page-04').removeClass('transform');
      $('#page-04').toggleClass('transform-previous');
      $('#page-01').insertBefore($('#page-05'));
      $('#page-02').insertBefore($('#page-05'));
      $('#page-03').insertBefore($('#page-05'));
      $('#page-04').insertBefore($('#page-05'));
      $('#page-06').toggleClass('transform');
      $('#page-01').removeClass('last-active');
      $('#page-02').removeClass('last-active');
      $('#page-03').removeClass('last-active');
      $('#page-04').removeClass('last-active');
      console.log("page 5");
    }
    if (transformed_page.prop('id') == "page-06") {
      $('#page-05').removeClass('transform-active');
      $('#page-05').removeClass('transform');
      $('#page-05').toggleClass('transform-previous');
      $('#page-01').insertBefore($('#page-06'));
      $('#page-02').insertBefore($('#page-06'));
      $('#page-03').insertBefore($('#page-06'));
      $('#page-04').insertBefore($('#page-06'));
      $('#page-05').insertBefore($('#page-06'));
      $('#page-07').toggleClass('transform');
      $('#page-01').removeClass('last-active');
      $('#page-02').removeClass('last-active');
      $('#page-03').removeClass('last-active');
      $('#page-04').removeClass('last-active');
      $('#page-05').removeClass('last-active');
      console.log("page 6");
    }
  }
  }
  if(direction==="right"){
    let test = $('.last-active');

  console.log(test);
  test.toggleClass('transform-active');
  test.toggleClass("last-active");

  if (test.prop('id') === "page-01") {
      // transformed_page.insertBefore($(".transform-previous"));
      $('#page-02').insertBefore($('#page-01'));
      $('#page-03').insertBefore($('#page-02'));
      $('#page-04').insertBefore($('#page-03'));
      $('#page-05').insertBefore($('#page-04'));
      $('#page-06').insertBefore($('#page-05'));
      $('#page-07').insertBefore($('#page-06'));
      $('#page-02').removeClass('transform');
      $('#page-02').removeClass('transform-active');
      console.log("return page 1");
    }
    if (test.prop('id') === "page-02") {
      $('#page-01').toggleClass('transform');
      $('#page-01').toggleClass('transform-active');
      $('#page-01').toggleClass('last-active');
      $('#page-01').removeClass('transform-previous');
      $('#page-03').insertBefore($('#page-02'));
      $('#page-04').insertBefore($('#page-03'));
      $('#page-05').insertBefore($('#page-04'));
      $('#page-06').insertBefore($('#page-05'));
      $('#page-07').insertBefore($('#page-06'));
      // $('#page-02').toggleClass('transform');
      // $('#page-01').insertAfter($('#page-02'));
      $('#page-03').removeClass('transform');
      $('#page-03').removeClass('transform-active');
      console.log("return page 2")
      // $('#page-03').toggleClass('show');
    }
    if (test.prop('id') === "page-03") {
      $('#page-02').toggleClass('transform');
      $('#page-02').toggleClass('transform-active');
      $('#page-02').toggleClass('last-active');
      $('#page-02').removeClass('transform-previous');
      $('#page-04').insertBefore($('#page-03'));
      $('#page-05').insertBefore($('#page-04'));
      $('#page-06').insertBefore($('#page-05'));
      $('#page-07').insertBefore($('#page-06'));
      $('#page-04').removeClass('transform');
      $('#page-04').removeClass('transform-active');
      console.log("return page 3")
      // $('#page-03').toggleClass('show');
    }
    if (test.prop('id') === "page-04") {
      $('#page-03').toggleClass('transform');
      $('#page-03').toggleClass('transform-active');
      $('#page-03').toggleClass('last-active');
      $('#page-03').removeClass('transform-previous');
      $('#page-05').insertBefore($('#page-04'));
      $('#page-06').insertBefore($('#page-05'));
      $('#page-07').insertBefore($('#page-06'));
      // $('#page-02').toggleClass('transform');
      // $('#page-01').insertAfter($('#page-02'));
      $('#page-05').removeClass('transform');
      $('#page-05').removeClass('transform-active');
      console.log("return page 4")
      // $('#page-03').toggleClass('show');
    }
    if (test.prop('id') === "page-05") {
      $('#page-04').toggleClass('transform');
      $('#page-04').toggleClass('transform-active');
      $('#page-04').toggleClass('last-active');
      $('#page-04').removeClass('transform-previous');
      $('#page-06').insertBefore($('#page-05'));
      $('#page-07').insertBefore($('#page-06'));
      // $('#page-02').toggleClass('transform');
      // $('#page-01').insertAfter($('#page-02'));
      $('#page-06').removeClass('transform');
      $('#page-06').removeClass('transform-active');
      console.log("return page 5")
      // $('#page-03').toggleClass('show');
    }
    if (test.prop('id') === "page-06") {
      $('#page-05').toggleClass('transform');
      $('#page-05').toggleClass('transform-active');
      $('#page-05').toggleClass('last-active');
      $('#page-05').removeClass('transform-previous');
      $('#page-07').insertBefore($('#page-06'));
      // $('#page-02').toggleClass('transform');
      // $('#page-01').insertAfter($('#page-02'));
      $('#page-07').removeClass('transform');
      $('#page-07').removeClass('transform-active');
      console.log("return page 6")
      // $('#page-03').toggleClass('show');
    }
  }
});
