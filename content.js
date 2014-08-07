// add in the button things
$("td.default span.comhead").prepend('<a class="hn-fold">[-]</a> ');

$(".hn-fold").click(function() {
  // get width of this element
  var original_width = parseInt($("td:first img", $(this).closest("tr")).attr("width"));
  var orig_vis = $(this).closest(".default").find(".comment").css("display") === "none";

  // find top-level tr and all siblings after it in the DOM
  var clicked_tr = $(this).closest("table").closest("tr");
  var clicked_siblings = $(" ~ tr", $(clicked_tr));
  var nodes_to_toggle = []

  // add original node
  nodes_to_toggle.push(clicked_tr);

  // find all children nodes of the clicked node
  $(clicked_siblings).each(function() {
    var c_width = parseInt($("td:first img", $(this).find("table tr")).attr("width"));
    var c_vis = $(this).find("tr .comment").css("display") === "none";

    if (c_width > original_width) {
      if (c_vis === orig_vis) nodes_to_toggle.push($(this));
    } else return false;
  });

  // toggle all selected nodes
  $(nodes_to_toggle).each(function() {
    var comment = $(this).find("tr .comment");
    $(comment).toggle();

    // update the fold link
    var fold_link = $(this).find(".hn-fold");
    if ($(fold_link).text() === "[-]")
      $(fold_link).html("[+]");
    else
      $(fold_link).html("[-]"); 

    // hide any other extraneous sections in the comment
    $(comment).nextAll().toggle();
  });
});