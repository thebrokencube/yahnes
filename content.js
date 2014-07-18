// $("span.comhead").each(function() {
//   $.css("color", "red");
// });
$("td.default span.comhead").prepend('<a class="hn-fold">[-]</a> ');

$(".hn-fold").click(function() {
  var x = $(this).parents(".default");
  var y = $(".comment", x);
  y.hide();
});