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

function show_node (node) {
  var comment = $(node.find("tr .comment"));
  var comhead = $(node.find(".comhead"));
  var fold_link = $(node.find(".yahnes-collapse-link"));

  $(node).show();
  comment.show();
  comment.nextAll().show();
  comhead.removeClass("yahnes-collapsed");
  fold_link.html("[-]");
  $(".yahnes-text", comhead).remove();
}

function hide_node (node) {
  var comment = $(node.find("tr .comment"));
  var comhead = $(node.find(".comhead"));
  var fold_link = $(node.find(".yahnes-collapse-link"));

  comment.hide();
  comment.nextAll().hide();
  comhead.addClass("yahnes-collapsed");
  $(node).hide();
  fold_link.html("[+]");
}

function multi_collapse () {
  // clicked comment info
  var clicked_link = $(this);
  var clicked_width = parseInt($("td:first img", clicked_link.closest("tr")).attr("width"));

  // get clicked element and all other possible elements that may need changing
  var clicked_tr = $(clicked_link.closest("table").closest("tr"));
  var possible_nodes = $(" ~ tr", clicked_tr).toArray();

  var clicked_comhead = clicked_tr.find(".comhead");
  var num_children = 0;

  // toggle clicked node
  toggle_node(clicked_tr);


  // show or collapse all child nodes, depending on clicked node's new state 
  $(possible_nodes).each(function() {
    // current node info
    var node = $(this);
    var node_width = parseInt($("td:first img", node.find("table tr")).attr("width"));

    var clicked_is_collapsed = $(clicked_tr.find(".comhead")).hasClass("yahnes-collapsed");
    var node_already_collapsed = $(node.find(".comhead")).hasClass("yahnes-collapsed");

    if (node_width > clicked_width) {
      if (!clicked_is_collapsed) show_node(node);
      else                       hide_node(node);

      num_children++;
    } else return false;
  });

  if(clicked_comhead.hasClass("yahnes-collapsed")) {
    clicked_comhead.append(' <span class="yahnes-text">(' + num_children + ' children)</span>');
  } else {
    $(".yahnes-text", clicked_comhead).remove();
  }
}

function init_extension() {
  $("td.default span.comhead").prepend('<a class="yahnes-collapse-link">[-]</a> ');

  chrome.storage.sync.get({
    'collapse': 'single'
  }, function(items) {
    if (items.collapse === 'single')
      $(".yahnes-collapse-link").click(single_collapse);
    else
      $(".yahnes-collapse-link").click(multi_collapse);
  });
}

init_extension();
