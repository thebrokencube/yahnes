function fold_comments_one () {
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

    // make sure it is a children and that it is the same state
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
    if ($(fold_link).text() === "[-]") {
      $(fold_link).html("[+]");
      $(this).find(".comhead").addClass("folded");
    } else {
      $(fold_link).html("[-]"); 
      $(this).find(".comhead").removeClass("folded");
    }

    // hide any other extraneous sections in the comment
    $(comment).nextAll().toggle();
  });
}


// add in the button things
$("td.default span.comhead").prepend('<a class="hn-fold">[-]</a> ');
$(".hn-fold").click(fold_comments_one);




// TODO: fix later
// function fold_comments_full () {
//   // get width of this element
//   var original_width = parseInt( $("td:first img", $(this).closest("tr") ).attr("width") );
//   var original_vis = $(this).closest(".default").find(".comment").css("display") === "none";
//   console.log(original_width + " " + original_vis);

//   // find top-level tr and all siblings after it in the DOM
//   var clicked_tr = $(this).closest("table").closest("tr");
//   var clicked_siblings = $(" ~ tr", $(clicked_tr));
//   var num_siblings = 0;

//   // fold clicked comment and update fold link
//   var clicked_comment = $(clicked_tr).find("tr .comment");
//   $(clicked_comment).toggle();
//   var fold_link = $(clicked_tr).find(".hn-fold");
//   if ($(fold_link).text() === "[-]") {
//     $(fold_link).html("[+]");
//     $(clicked_tr).find(".comhead").addClass("folded");
//   } else {
//     $(fold_link).html("[-]");
//     $(clicked_tr).find(".comhead").removeClass("folded");
//   }

//   // toggle all children nodes
//   $(clicked_siblings).each(function() {
//     var comment_width = parseInt( $("td:first img", $(this).find("table tr") ).attr("width") );
//     var comment_vis = ($(this).find("tr").css("display") === "none") ||
//                       ($(this).find("tr .comment").css("display") === "none");

//     // make sure it is a child node and that it is the same state
//     if (comment_width > original_width) {
//       if (comment_vis === original_vis) {
//         $(this).toggle();
//         num_siblings += 1;

//         if $()
//       }
//     } else return false;
//   });

//   console.log("num siblings: " + num_siblings);
// }

