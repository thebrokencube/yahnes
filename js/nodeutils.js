var NodeUtils = (function($) {
  function Node(tr) {
    this.tr = tr;
    this.width = parseInt( $("td:first img", tr).attr("width") );
    this.vis = tr.find(".comment").css("display") !== "none";
    this.link = $(tr.find(".yahnes-collapse-link"));
    this.comhead = $(tr.find(".comhead"));
    this.comment = $(tr.find(".comment"));
    this.collapsed = $(tr.find(".comhead")).hasClass("yahnes-collapsed");
  }

  Node.prototype.update = function() {
    this.vis = this.tr.find(".comment").css("display") !== "none";
    this.collapsed = $(this.tr.find(".comhead")).hasClass("yahnes-collapsed");
  };

  var getNode = function(tr) {
    return new Node(tr);
  };

  return {
    /* return a POJO with all the information we need about the node */
    getClickedNode: function(link) {
      return getNode( $(link).closest("table").closest("tr") );
    },

    getPossibleNodes: function(clickedNode) {
      var possibleNodes = $(" ~ tr", $(clickedNode.tr)).toArray().map(
        function(tr) { return getNode( $(tr) ); }
      );
      possibleNodes.unshift(clickedNode);
      return possibleNodes;
    },

    /* toggle node visibility. used for single collapse */
    toggle: function(node) {
      node.comment.toggle();
      node.comment.nextAll().toggle();

      if (node.collapsed) {
        node.link.html("[-]");
        node.comhead.removeClass("yahnes-collapsed");
      } else {
        node.link.html("[+]");
        node.comhead.addClass("yahnes-collapsed");
      }
    },

    /* set node visibility to shown. used for multi collapse */
    show: function(node) {
      node.tr.show();
      node.comment.show();
      node.comment.nextAll().show();

      node.comhead.removeClass("yahnes-collapsed");
      node.link.html("[-]");

      // remove child count
      $(".yahnes-text", node.comhead).remove();
    },

    /* set node visibility to hidden. used for multi collapse */
    hide: function(node) {
      node.tr.hide();
      node.comment.hide();
      node.comment.nextAll().hide();

      node.comhead.addClass("yahnes-collapsed");
      node.link.html("[+]");
    }
  };
})(jQuery);

