// function ClickedLink (node) {
//   this.node = $(node);
//   this.width = parseInt($("td:first img", this.node.closest("tr")).attr("width"));
//   this.visibility = this.node.closest(".default").find(".comment").css("display") === "none";
// }

// function collapse () {
//   var clicked = new ClickedLink(this);
//   var clicked_tr = clicked.node.closest("table").closest("tr");
// }

function single_collapse () {
  // clicked comment info
  var clicked_link = $(this);
  var clicked_width = parseInt($("td:first img", clicked_link.closest("tr")).attr("width"));
  var clicked_visibility = clicked_link.closest(".default").find(".comment").css("display") === "none";

  // get clicked element and all other possible elements that may need changing
  var clicked_tr = clicked_link.closest("table").closest("tr");
  var possible_nodes = $(" ~ tr", $(clicked_tr)).toArray();
  possible_nodes.unshift(clicked_tr);

  $(possible_nodes).each(function(node_idx) {
    // current node info
    var node = $(this);
    var node_width = parseInt($("td:first img", node.find("table tr")).attr("width"));
    var node_visibility = node.find("tr .comment").css("display") === "none";

    // make sure node is either a child node or the original node, otherwise break out
    if ((node_width > clicked_width) || (node_idx == 0)) {
      // only toggle nodes with the same visibility
      if (node_visibility === clicked_visibility) { toggle_node(node); }
    } else return false;
  });
}

function toggle_node (node) {
  // toggle the node and all extraneous sections in the comment
  var comment = $(node.find("tr .comment"));
  comment.toggle();
  comment.nextAll().toggle();

  // update the fold link
  var fold_link = $(node.find(".yahnes-collapse-link"));
  var comhead = $(node.find(".comhead"));

  if (comhead.hasClass("yahnes-collapsed")) {
    fold_link.html("[-]");
    comhead.removeClass("yahnes-collapsed");
  } else {
    fold_link.html("[+]");
    comhead.addClass("yahnes-collapsed");
  }
}

function full_toggle_node (node) {
  $(node).toggle();

  var comhead = $(node.find(".comhead"));

  if (comhead.hasClass("yahnes-collapsed")) {
    comhead.removeClass("yahnes-collapsed");
  } else {
    comhead.addClass("yahnes-collapsed");
  }

}

function multi_collapse () {
  // clicked comment info
  var clicked_link = $(this);
  var clicked_width = parseInt($("td:first img", clicked_link.closest("tr")).attr("width"));
  var clicked_visibility = clicked_link.closest(".default").find(".comment").css("display") === "none";

  // get clicked element and all other possible elements that may need changing
  var clicked_tr = $(clicked_link.closest("table").closest("tr"));
  var possible_nodes = $(" ~ tr", clicked_tr).toArray();

  // toggle 
  $(possible_nodes).each(function() {
    // current node info
    var node = $(this);
    var node_width = parseInt($("td:first img", node.find("table tr")).attr("width"));
    var node_visiblity = node.css("display") === "none";
    var num_children = 0;

    // make sure node is a child node, otherwise break out
    if (node_width > clicked_width) {
      if (node_visiblity === clicked_visibility) {
        full_toggle_node(node);
        num_children++;
      }
    } else return false;
  });

  toggle_node(clicked_tr);
  // var comhead = $(clicked_tr.find(".comhead"));
  // if(comhead.hasClass("yahnes-collapsed")) {
  //   comhead.append(' <span class="yahnes-text">(' + parseInt(num_children) + ' children)</em>');
  // } else {

  // }
}


$("td.default span.comhead").prepend('<a class="yahnes-collapse-link">[-]</a> ');
// $(".yahnes-collapse-link").click(single_collapse);
$(".yahnes-collapse-link").click(multi_collapse);