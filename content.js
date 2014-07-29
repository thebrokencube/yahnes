// add in the button things
$("td.default span.comhead").prepend('<a class="hn-fold">[-]</a> ');

$(".hn-fold").click(function() {
  // get width of this element
  var original_width = $("td:first img", $(this).closest("tr")).attr("width");
  var orig_vis = $(this).closest(".default").find(".comment").css("display") == "none";
  console.log("Comment width: " + original_width, " visibility: " + orig_vis);

  // find top-level tr and all siblings after it in the DOM
  var clicked_tr = $(this).closest("table").closest("tr");
  var clicked_siblings = $(" ~ tr", $(clicked_tr));

  var nodes_to_toggle = []
  var in_tree = true;

  // add original node
  nodes_to_toggle.push(clicked_tr);

  // find all children nodes of the clicked node
  $(clicked_siblings).each(function() {
    var c_width = $("td:first img", $(this).find("table tr")).attr("width");
    var c_vis = $(this).find("tr .comment").css("display") == "none";

    if (in_tree && (c_width > original_width)) {
      if (c_vis === orig_vis) {
        nodes_to_toggle.push($(this));
      }
      console.log("sibling: " + c_width);
    } else {
      in_tree = false;
      console.log("NEW TREE GETTING OUT: current:" + original_width + " sibling: " + c_width);
      return false;
    }
  });

  console.log("comments to toggle: " + nodes_to_toggle.length);

  $(nodes_to_toggle).each(function() {
    var comment = $(this).find("tr .comment");
    $(comment).toggle();
  });
});