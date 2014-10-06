var YAHNESModule = (function($, NodeUtils) {
  //Returns an int from the level-x where x is the int
  var parseLevel = function(classAttr){
    return parseInt(classAttr.split('-')[1]);
  };

  //Will expand/collapse based on the value of toggle, t = expand, f = collapse
  var toggleCollapse = function($parent, toggle){
    var curLevel, level, $nextRow, $br;

    level = parseLevel($parent.attr('class'));
    $nextRow = $parent.next();
    curLevel = parseLevel($nextRow.attr('class'));

    $parent.find('br').nextAll().toggle(toggle);
    $parent.find('.expand').toggle(!toggle);
    $parent.find('.collapse').toggle(toggle);

    //Looping through the TR's until we return to our starting level
    while(curLevel > level){
      $nextRow.find('.expand').toggle(!toggle);
      $nextRow.find('.collapse').toggle(toggle);

      $br = $nextRow.find('br');
      $br.nextAll().toggle(toggle);
      //Priming the loop
      $nextRow = $nextRow.next();
      curLevel = parseLevel($nextRow.attr('class'));
    }
  };

  return {
    /* initialize the collapse links and set up the correct click handlers depending on options */
    init: function() {
      var $comment, $container, $comheads, i, l, $current, currentLevel, $link;
      //Retrieving needed elements
      $comments = $('table table table');//This selects just the comments' tables
      $container = $comments.eq(0).parents('table').eq(0);
      $comHeads = $container.find('.comhead');
      $link = jQuery('<a href="#" class="expand-collapse">[<span class="expand">+</span><span class="collapse">-</span>]</a>');

      //Looping through each comment to add a class that defines level
      for(i = 0, l = $comments.length; i < l; i++){
        $current = $comments.eq(i);

        currentLevel = $current.find('img').width() / 40;//40px per level
        $current.parent().parent().addClass('comment level-'+currentLevel);

        //Adding an expand/collapse link
        $current.find('.comhead').prepend($link.clone());
      }
      //Definiing a click handler for any expand-collapse in the comments' table
      $container.on('click', '.expand-collapse', null, function(e){
        var $target, $parent,$expand;
        $target =$(e.target).closest('.expand-collapse');
        $parent = $target.parents('tr').eq(1);//This represents the TR that is a sibling to all comments
        $expand = $target.find('.expand');

        toggleCollapse($parent, $expand.is(':visible'));
        //disabling anchor
        e.preventDefault();
        return false;
      });

      //Hiding the '+' characters since everything is expanded by default
      $container.find('.expand').hide();
    }
  };
})(jQuery, NodeUtils);

// start up the extension
YAHNESModule.init();
