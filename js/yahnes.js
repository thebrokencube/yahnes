var YAHNESModule = (function($, NodeUtils) {
  /* single collapse event handler */
  var singleCollapse = function() {
    var clickedNode = NodeUtils.getClickedNode( $(this) );
    var possibleNodes = NodeUtils.getPossibleNodes( clickedNode );

    $(possibleNodes).each(function(nodeIdx, node) {
      // make sure clicked or child node, otherwise break out
      if ((node.width > clickedNode.width) || (nodeIdx === 0)) {
        // only toggle nodes with the same visibility
        if (node.vis === clickedNode.vis) { NodeUtils.toggle(node); }
      } else return false
    });
  };

  /* multi collapse event handler */
  var multiCollapse = function() {
    var clickedNode = NodeUtils.getClickedNode( $(this) );
    var possibleNodes = NodeUtils.getPossibleNodes( clickedNode );
    var numChildren = 0;

    $(possibleNodes).each(function(nodeIdx, node) {
      if (nodeIdx === 0) {
        NodeUtils.toggle(node);
        clickedNode.update();
      } else {
        // make sure clicked or child node, otherwise break out
        if (node.width > clickedNode.width) {
          if (!clickedNode.collapsed)
            NodeUtils.show(node);
          else
            NodeUtils.hide(node);
          numChildren++;
        } else return false;
      }
    });

    if(clickedNode.collapsed) {
      clickedNode.comhead.append(' <span class="yahnes-text">(' + numChildren + ' children)</span>');
    } else {
      $(".yahnes-text", clickedNode.comhead).remove();
    }
  };


  return {
    init: function() {
      $("td.default span.comhead").prepend('<a class="yahnes-collapse-link">[-]</a> ');

      // set the correct click handler depending on the settings
      chrome.storage.sync.get({
        'collapse': 'single' // default to single
      }, function(items) {
        if (items.collapse === 'single')
          $(".yahnes-collapse-link").click(singleCollapse);
        else
          $(".yahnes-collapse-link").click(multiCollapse);
      });
    }
  };
})(jQuery, NodeUtils);

YAHNESModule.init();
